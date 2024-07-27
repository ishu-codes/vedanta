import os
import moviepy.editor as mpe
import pypdfium2 as pdfium


def pdf_to_video(pdf_path, audio_dir, output_path, fps=1):
    """Converts a PDF file to an MP4 video with audio for each page.

        Args:
            pdf_path (str): Path to the PDF file.
            audio_dir (str): Path to the directory containing audio files
                             (one MP3 file per page, named "page1.mp3", "page2.mp3", etc.).
            output_path (str, optional): Path to the output MP4 video file.
                                         Defaults to "output.mp4".
            fps (int, optional): Frames per second for the video.
                                 Adjust based on audio length and desired pacing.
                                 Defaults to 1.
        """

    # Load a document
    pdf = pdfium.PdfDocument(pdf_path)

    temp_path = "vedanta/backend/temp_images"
    if not os.path.exists(temp_path):
        os.makedirs(temp_path)
    # Loop over pages and render
    for i in range(len(pdf)):
        page = pdf[i]
        image = page.render(scale=4).to_pil()
        image.save(f"{temp_path}/{i+1}.jpg")

    # Create video clips for each page with audio
    clips = []
    for i in range(len(pdf)):
        image_path = f"{temp_path}/{i + 1}.jpg"
        audio_path = f"{audio_dir}/{i + 1}.mp3"

        # Load image and audio
        image_clip = mpe.ImageClip(image_path, duration=mpe.AudioFileClip(audio_path).duration)
        audio_clip = mpe.AudioFileClip(audio_path)

        # Combine image and audio
        final_clip = image_clip.set_audio(audio_clip)
        clips.append(final_clip)

    # Concatenate clips into a single video
    final_video = mpe.concatenate_videoclips(clips, method="compose")
    final_video.write_videofile(output_path, fps=fps)
