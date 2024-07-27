import json
import os
import shutil
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
# from pptxtopdf import convert
import convertapi
from vedanta.backend.apps.audiops import generate_audio_files
from vedanta.backend.apps.pdfops import upload_file
from vedanta.backend.apps.ppt_generator import generate_presentation
from vedanta.backend.apps.promptops import generate_explanations
from vedanta.backend.apps.videops import pdf_to_video

app = FastAPI()

origins = [
    "127.0.0.1:8000",
    "http://localhost:3000",
]

# noinspection PyTypeChecker
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    """
    Returns a dictionary containing the title and version of the Project vedanta API.

    :return: A dictionary with the keys "title" and "version".
    :rtype: dict
    """
    return {
        "title": "Project Vedanta",
        "version": "1.0",
    }


@app.on_event("startup")
async def startup_event():
    """
    Standard Cleanup Operation
    :return: None
    """
    try:
        os.system('del file.pptx')
        os.system('del file.pdf')
        os.system('del file.mp4')
        temp_path = 'vedanta/backend/temp_images'
        audio_dir = 'vedanta/backend/generated_audio'
        shutil.rmtree(temp_path)
        shutil.rmtree(audio_dir)
        if not os.path.exists(temp_path):
            os.makedirs(temp_path)
        if not os.path.exists(audio_dir):
            os.makedirs(audio_dir)

    except Exception as e:
        print(e)
        pass


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


@app.post("/get_presentation/")
async def get_presentation():
    """
    Get a PPTX file based on the PDF context.

    Returns:
    - The PPTX File link.
    """
    print("api ab wait karega")
    await generate_presentation()
    print("api ko file mil gaya")
    convertapi.api_secret = os.environ.get('CONVERTAPI_KEY')
    convertapi.convert('pdf', {
        'File': 'file.pptx'
    }, from_format='pptx').save_files('file.pdf')
    # convert('file.pptx', '.')
    return {"pptx-url": f"http://localhost:8000/get/file.pptx",
            "pdf-url": f"http://localhost:8000/get/file.pdf"}


@app.post("/generate_video/")
async def get_video():
    generate_audio_files(json.loads(generate_explanations()))
    pdf_path = "file.pdf"
    audio_dir = "vedanta/backend/generated_audio"
    output_path = "file.mp4"
    pdf_to_video(pdf_path, audio_dir, output_path, fps=1)

    return {"video-url": f"http://localhost:8000/get/file.mp4"}


@app.get("/get/{file}")
async def get_file(file):
    """
    Retrieves a file based on the provided file name.

    Parameters:
        - file (str): The name of the file to retrieve.

    Returns:
        - FileResponse: The file response object containing the requested file.

    Raises:
        - None
    """
    if file == 'file.pdf':
        return FileResponse("file.pdf", media_type="application/pdf")

    if file == 'file.pptx':
        return FileResponse("file.pptx", media_type="application/vnd.openxmlformats-"
                                                    "officedocument.presentationml.file")
    if file == 'file.mp4':
        return FileResponse("file.mp4", media_type="video/mp4")
