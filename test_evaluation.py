import pyterrier as pt
from pyterrier.measures import *
import os
import pandas as pd
import csv
import numpy as np

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
    indexref4 = pt.IterDictIndexer("./index", meta={"docno":20}).index(iter_file("/Users/guangchuding/Desktop/549 proj/spotify-podcasts-2020/dataset.jsonl"),fields=("transcript",))
    index = pt.IndexFactory.of(indexref4)


bm25 = pt.BatchRetrieve(index, wmodel="BM25", num_results=50)


topics = pd.read_csv("annotation.csv", usecols=["qid", "query"], nrows=350, dtype={"qid":object, "query":object})

qrels = pd.read_csv("annotation.csv", usecols=["qid", "docno", "label"], nrows=350, dtype={"qid":object, "docno":object, "label": np.int64})

result = pt.Experiment(
    [bm25],
    topics,
    qrels,
    eval_metrics=[AP(rel=3), nDCG@10]
)

print(result)




