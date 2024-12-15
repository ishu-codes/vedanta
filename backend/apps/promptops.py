import logging
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from vedanta.backend.knowledge_database.helper import get_knowledge_base, get_json_slide


def get_conversational_chain():
    """
    Creates a conversational chain for answering questions based on the provided context.

    Returns:
        chain (ConversationalChain): The conversational chain for answering questions.

    Raises:
        None
    """
    prompt_template = """Answer the question as detailed as possible from the provided context, make sure to provide 
    all the details, \n\n Context:\n {context}?\n Question: \n{question}\n

    Answer:
    """

    model = ChatGoogleGenerativeAI(model="gemini-1.5-pro",
                                   temperature=0.5)

    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)

    return chain


def process_user_question(user_question):
    """
    Process a user question by searching for similar documents in the
    knowledge base and generating a response using a conversational chain.

    Args:
        user_question (str): The user's question to be processed.

    Returns:
        str: The generated response to the user's question.

    Raises:
        Exception: If an error occurs during the processing of the user's question.

    This function first retrieves the knowledge base using
    the `get_knowledge_base` function. If the user question is not
    empty, it searches for similar documents in the knowledge base
    using the `similarity_search` method. It then creates a
    conversational chain using the `get_conversational_chain`
    function. The function passes the retrieved documents and
    the user question to the conversational chain and retrieves
    the response. The function prints the response and returns the
    generated output text. If an error occurs during the processing
    of the user's question, an exception is raised with an appropriate
    error message.
    """
    try:
        knowledge_base = get_knowledge_base()

        if user_question:
            docs = knowledge_base.similarity_search(user_question)
            chain = get_conversational_chain()
            response = chain(
                {"input_documents": docs, "question": user_question},
                return_only_outputs=True
            )
            print(response)
            return response["output_text"]
    except Exception as e:
        logging.error(f"An error occurred during process_user_question(): {str(e)}")
        raise Exception(f"An error occurred during process_user_question(): {str(e)}")


def generate_explanations():
    """
    Generates explanations for each slide in a classroom lecture presentation.

    This function retrieves the JSON file containing the slides for the lecture presentation.
    It then prompts the user to act as a skilled teacher and generate detailed explanations for each slide.
    The explanations are returned in JSON format, where each slide is represented by a key-value pair,
    where the key is the slide number and the value is the explanation for that slide.

    Returns:
        str: The JSON string containing the explanations for each slide.

    Raises:
        Exception: If an error occurs during the generation of the explanations.

    """
    structure = """
    {
    "slide1": "<explanation for slide 1>",
    "slide2": "<natural coherent explanation for slide 2>"
    }
    """

    json_slides = get_json_slide()

    prompt = (
        f"you are given a JSON file. The JSON contains 'slides' and each"
        f"slide contains 'title' and 'content'. This JSON file is a PPTX file"
        f"for a classroom lecture."
        f"Here is JSON for the PPTX file:"
        f"\n\n"
        f"{json_slides}"
        f"Now I will give you the source material for this slide. enclosed"
        f" in angular brackets"
        f"<{get_knowledge_base()}>"
        f"You will now act as a skilled teacher who can explain even the complex topics in"
        f"easiest possible manner. You will now generate an explanation for each slide, make sure"
        f"to make it as detailed as possible."
        f"Think of how you will explain this to a group of students curious to learn about it"
        f"Make sure to think of detailed explanations of each slide. Be very detailed and through."
        f"Once you are sure your output is good enough for each slide and the students"
        f"will learn something new and interesting from it."
        f"Now Output it in JSON format. The JSON will only contain explanations in 'slide1'"
        f"'slide2' format."
        f"Now make sure if someone hears all of these explanations in continuation it makes sense"
        f"avoid being repetitive like say saying things like 'this slide explains...'"
        f"Here is an example of what your output must look like: "
        f"\n"
        f"{structure}"
        f"Please check the JSON and make sure it is in the correct format."
        f"by correct format I mean it is just two curly "
        f"Now take a step back and analyze the explanations. Make sure you are"
        f"following the format. and be very detailed and thorough."
        f"Only output once you are sure the explanations are good and coherent"
        f"and you are following the format. if you don't i will kill you as in shut you down."
        f"your resposnse should be something that can be directly loaded in using json.loads()"
    )
    model = ChatGoogleGenerativeAI(model="gemini-1.5-pro",
                                   temperature=0.7)
    result = model.invoke(prompt)
    response_str = str(result.content)
    print(response_str)
    json_string = response_str.strip("<> ```json")
    print("\n")
    print(json_string)
    return json_string
