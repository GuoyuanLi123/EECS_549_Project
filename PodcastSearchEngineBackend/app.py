from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from search_engine import SearchEngine



searchEngine = SearchEngine("./dataset.jsonl")
searchEngine.build_index()

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/search/{query}/{episodeName}/{showName}/{publisher}')
async def doSearch(query: str, episodeName: str, showName:str, publisher:str):
    if episodeName == "null":
        episodeName = ""
    if showName == "null":
        showName = ""
    if publisher == "null":
        publisher = ""

    response = searchEngine.query(query, episodeName, showName, publisher)

    return response






