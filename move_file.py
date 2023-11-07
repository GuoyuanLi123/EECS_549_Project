import pathlib
import shutil

ALL_TRANSCRIPTS_PATH = "/Users/guangchuding/Desktop/549 proj/spotify-podcasts-2020/podcasts-transcripts/all_transcripts/"  # Path where you stored all the json transcripts file
TRANSCRIPTS_FOLDER_PATH = "/Users/guangchuding/Desktop/549 proj/spotify-podcasts-2020/podcasts-transcripts"  # Path where your seven folder stored

path = pathlib.Path(TRANSCRIPTS_FOLDER_PATH)

source_list = list(path.rglob("*.json"))

for source in source_list:
    file_name = str(source).split("/")[-1]
    shutil.move(str(source), ALL_TRANSCRIPTS_PATH+file_name)


