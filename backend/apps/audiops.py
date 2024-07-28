import os
from google.cloud import texttospeech
import logging


def text_to_audio(text_block, slide_number):
    """
    Convert text to audio using the Google Cloud Text-to-Speech API.

    Args:
        text_block (str): The text to convert to audio.
        slide_number (int): The slide number associated with the audio file.

    Returns:
        None

    Raises:
        FileNotFoundError: If the credentials file is not found.
        google.api_core.exceptions.GoogleAPICallError: If there is an error with the Google Cloud API call.

    Notes:
        - The function sets the environment variable 'GOOGLE_APPLICATION_CREDENTIALS' to
          the path of the credentials file.
        - The function uses the TextToSpeechClient from the Google Cloud Text-to-Speech
         API to synthesize speech.
        - The function saves the audio content to a file named '{slide_number}.mp3'.
    """
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "vedanta/backend/            keys/credentials.json"

    tts_client = texttospeech.TextToSpeechClient()

    synthesis_input = texttospeech.SynthesisInput({"text": text_block})

    voice = texttospeech.VoiceSelectionParams(
        {
            "language_code": "en-US",
            "name": "en-US-Standard-H"
            # "name": "en-US-Journey-0"
        }
    )

    # noinspection PyTypeChecker
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        effects_profile_id=['small-bluetooth-speaker-class-device'],
        speaking_rate=1,
        pitch=1
    )

    response = tts_client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config
    )

    with open(f"vedanta/backend/generated_audio/{slide_number}.mp3", "wb") as out:
        out.write(response.audio_content)
        print(f"Audio written to file {slide_number}.mp3")


def generate_audio_files(explanations_json):
    """
    Generate audio files for each slide in the presentation.

    Returns:
        None

    Raises:
        FileNotFoundError: If the credentials file is not found.
        google.api_core.exceptions.GoogleAPICallError: If there is an error with the Google Cloud API call.
    """
    try:
        i = int(1)
        for key in explanations_json:
            text_to_audio(explanations_json[key], i)
            i = i + 1
    except Exception as e:
        try:
            i = int(1)
            for key in explanations_json:
                text_to_audio(explanations_json[key], i)
                i = i + 1
        except Exception as e:
            logging.error(f"An error occurred during generate_audio_files(): {str(e)}")
            raise Exception(f"An error occurred during generate_audio_files(): {str(e)}")
