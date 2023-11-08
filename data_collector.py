import csv
import json
import os
from tqdm import tqdm

metadata_file = 'metadata.tsv'
transcripts_jsonl = 'transcripts.jsonl'
output_file = 'dataset.jsonl'

metadata = {}
with open(metadata_file) as fd:
    rd = csv.reader(fd, delimiter="\t", quotechar='"')
    ####################
    # show_uri: 0
    # show_name: 1
    # show_description: 2
    # publisher: 3
    # language: 4
    # rss_link: 5
    # episode_uri: 6
    # episode_name: 7
    # episode_description: 8
    # duration: 9
    # show_filename_prefix: 10
    # episode_filename_prefix: 11
    ###########################
    next(fd)
    for line in tqdm(rd, desc='loading metadata'):
        metadata[line[11]] = (line[0], line[1], line[2], line[3], line[4], line[5], line[6], line[7], line[8], float(line[9]), line[10])

output = open(output_file,'w')

with open(transcripts_jsonl) as dataset:
    for jsline in tqdm(dataset, desc='generating dataset jonsl'):
        doc = json.loads(jsline)
        episode_filename_prefix, _ = os.path.splitext(doc['episode_filename_prefix'])
        episode_metadata = metadata[episode_filename_prefix]
        output_dict = {'show_uri': episode_metadata[0],
                    'show_name': episode_metadata[1],
                    'show_description': episode_metadata[2],
                    'publisher': episode_metadata[3],
                    'language': episode_metadata[4],
                    'rss_link': episode_metadata[5],
                    'episode_uri': episode_metadata[6],
                    'episode_name': episode_metadata[7],
                    'episode_description': episode_metadata[8],
                    'duration': episode_metadata[9],
                    'show_filename_prefix': episode_metadata[10],
                    'episode_filename_prefix': episode_filename_prefix,
                    'transcript': doc['transcripts']
                    }
        json.dump(output_dict, output)
        output.write('\n')


