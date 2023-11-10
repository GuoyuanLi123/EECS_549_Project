import pyterrier as pt
import os

pt.init()

def iter_file(filename):
  import json
  with open(filename, 'rt') as file:
    for l in file:
      # assumes that each line contains 'docno', 'text' attributes
      # yields a dictionary for each json line
      yield json.loads(l)

if os.path.exists("index"):
    index = pt.IndexFactory.of("./index")
else:
    indexref4 = pt.IterDictIndexer("./index", meta={"docno":20}).index(iter_file("/Users/guangchuding/Desktop/549 proj/spotify-podcasts-2020/podcasts-transcripts/combined_transcripts.jsonl"),fields=("transcripts",))
    index = pt.IndexFactory.of(indexref4)

print(index.getCollectionStatistics().toString())

bm25 = pt.BatchRetrieve(index, wmodel="BM25")

result = bm25.search("discrimination")

print(type(result))

