import pyterrier as pt
import pandas as pd
import json
import os


class SearchEngine:
    def __init__(self, dataset_path: str ):
        if not pt.started():
            pt.init()
        self.dataset_path = dataset_path
        self.indexref = None
        self.index = None

    def iter_file(self):
        with open(self.dataset_path, 'rt') as file:
            for l in file:
                # assumes that each line contains 'docno', 'text' attributes
                # yields a dictionary for each json line
                yield json.loads(l)

    def build_index(self):
        if os.path.exists("index"):
            self.index = pt.IndexFactory.of("./index")
            self.indexref = pt.IndexRef.of("./index/data.properties")
        else:
            self.indexref = pt.IterDictIndexer("./index", meta={"docno": 20}).index(
                self.iter_file(),
                fields=("transcript",))
            self.index = pt.IndexFactory.of(self.indexref)

    def filter(self, result):
        pass

    def query(self, query:str):
        pass
