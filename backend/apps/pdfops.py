import logging
import pdfplumber
from fastapi import HTTPException
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from vedanta.backend.knowledge_database.helper import set_knowledge_base


def process_file_context(file_text):
    """
    Process the file context by splitting the file text into chunks and creating embeddings.

    Args:
        file_text (str): The text content of the file.

    Raises:
        Exception: If an error occurs during the processing of the file context.

    Returns:
        None
    """
    try:
        # split into chunks
        text_splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )
        chunks = text_splitter.split_text(file_text)

        # create embeddings
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        knowledge_base = FAISS.from_texts(chunks, embeddings)
        set_knowledge_base(knowledge_base)
    except Exception as e:
        logging.error(f"An error occurred during process_file_context(): {str(e)}")
        raise Exception(f"An error occurred during process_file_context(): {str(e)}")


async def upload_file(file):
    """
    Uploads a file and processes its contents.

    Args:
        file (File): The file to be uploaded.

    Raises:
        HTTPException: If the file is not in the "application/pdf" format.

    Returns:
        dict: A dictionary containing the extracted text from the PDF file and a success message.

    Raises:
        HTTPException: If an error occurs during the upload process.
    """
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a PDF file.")

    try:
        with pdfplumber.open(file.file) as pdf:
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text
                else:
                    logging.warning("A page could not be processed and was skipped.")

            process_file_context(text)
            return {"text": text, "generated_text": "The PDF file was successfully uploaded."}
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
