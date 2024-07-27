from vedanta.backend.apps.pdfops import upload_file
from fastapi import FastAPI, UploadFile, File

app = FastAPI()


@app.get("/")
def read_root():
    """
    Returns a dictionary containing the title and version of the Project Delta API.

    :return: A dictionary with the keys "title" and "version".
    :rtype: dict
    """
    return {
        "title": "Project Vedanta",
        "version": "0.1.0"
    }


@app.get("/health")                                          # Health Check
@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    """
    Upload a PDF file and process it.
    and deletes any existing pdf and ppt files.

    Parameters:
    - file: The UploadFile object representing the PDF file.

    Returns:
    - The response containing the processed data.
    """
    return await upload_file(file)
