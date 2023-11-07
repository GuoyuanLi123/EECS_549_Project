import json
import os

JSON_FIELS_PATH = "/Users/guangchuding/Desktop/549 proj/spotify-podcasts-2020/podcasts-transcripts/all_transcripts"

file_list = os.listdir(JSON_FIELS_PATH)

output = open("/Users/guangchuding/Desktop/549 proj/spotify-podcasts-2020/podcasts-transcripts/combined_transcripts.jsonl","w")

for file in file_list:
    transcripts = ""
    loaded_json = json.load(open(JSON_FIELS_PATH + "/" + file))
    alternatives = loaded_json["results"]
    for item in alternatives:
        if len(item["alternatives"]) != 0:
            for transcript in item["alternatives"]:
                if "transcript" in transcript:
                    transcripts += transcript["transcript"]
    output_dict = {"episode_file_prefix": file, "transcripts": transcripts}
    json.dump(output_dict, output)
    output.write("\n")


