import pandas as pd
import pyterrier as pt
import json
import os


class SearchEngine:
    def __init__(self, dataset_path: str ):
        self.dataset_path = dataset_path
        self.indexref = None
        self.index = None
        self.ranker = None

    def iter_file(self):
        with open(self.dataset_path, 'rt') as file:
            for l in file:
                # assumes that each line contains 'docno', 'text' attributes
                # yields a dictionary for each json line
                yield json.loads(l)

    def build_index(self):
        if not pt.started():
            pt.init()

        if os.path.exists("index"):
            self.index = pt.IndexFactory.of("./index")
            self.indexref = pt.IndexRef.of("./index/data.properties")
        else:
            self.indexref = pt.IterDictIndexer("./index", meta={"docno": 20, "publisher":128, "episode_url":1024, "episode_name":1024, "show_name":1024, "transcript":256}).index(
                self.iter_file(),
                fields=("transcript",))
            self.index = pt.IndexFactory.of(self.indexref)

        self.ranker = pt.BatchRetrieve(self.index, wmodel="BM25", metadata=["episode_url", "episode_name", "show_name", "publisher", "transcript"])

    
    def query(self, query: str, episodeName='', showName='', publisher=''):
        result = self.ranker.search(query).drop(columns=['qid', 'docid', 'rank', 'score', 'query'])
        if episodeName:
            result = result[result['episode_name'] == episodeName]
        
        if showName:
            result = result[result['show_name'] == showName]

        if publisher:
            result = result[result['publisher'] == publisher]

        return result.to_dict('records')

        


