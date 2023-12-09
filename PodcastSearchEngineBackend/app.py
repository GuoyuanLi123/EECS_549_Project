from fastapi import FastAPI
import math
from search_engine import SearchEngine


# importing internal modules
from models import QueryModel, APIResponse, PaginationModel


# searchEngine = SearchEngine("")
# searchEngine.build_index()

app = FastAPI()
# cache deletion function used to delete cache entries after a set timeout.




# API paths begin here





@app.get('/search/{query}/{episodeName}/{showName}/{publisher}')
async def doSearch(query: str, episodeName: str, showName:str, publisher:str):

    # response = searchEngine.query(query, episodeName, showName, publisher)

    return [{"docno":1, "publisher":"sample_publisher"}, {"docno":2, "publisher":"sample_publisher"}]






# python does not have a way to gracefully handle timeout handlers. This is an attempt to ensure graceful shutdown
# does not work a few times
# TODO find a more graceful solution or fix the bug



