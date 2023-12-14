# EECS 549 Project
Spotify podcast transcript IR system
## Introduction
Podcast is a popular format of audio media. It covers many topics such as novels, reviews and comments. It is quite common in people's life. For audiences who want to find some content in podcasts, there is no good way to search for specific content and its context. Our system tries to provide an easier way to solve this problem. Users can search content by just entering some keywords. In our system, users can search for podcasts by entering keywords in the transcripts. Users can also use advanced search to specify the show name, episode name and publisher of the podcasts. After entering all the fields users want, users can then click the search button and the website will redirect to the search result page. The search result page will show all the results related to the query and also their metadata. There is another search area at the top of the result list, making it easy for users to make another search. Users can also click the logo on the top-left to return to the homepage. 

## Watch a demo
[![Watch the video](https://img.youtube.com/vi/iQiGptpjHuU/hqdefault.jpg)](https://www.youtube.com/watch?v=iQiGptpjHuU)


## Folder Structure
```bash
EECS_549_Project/
    PodcastSearchEngineBackend/
        index/   # Not included in this repo for legal concerns. Please download the folder from Canvas
        app.py
        search_engine.py
    podcastsearchengine/
    convert_to_jsonl.py
    data_collector.py
    move_file.py
    random_baseline.py
    test_evaluation.py
    test_index.py
```

## How to start back end
The back end relies on Fastapi, uvicorn and pyterrier to run. To install these package, cd into ```PodcastSearchEngineBackend``` folder and run the following command
```
pip install python-terrier
pip install fastapi
pip install "uvicorn[standard]"
uvicorn app:app --reload
```

Note: Pyterrier relies on Java to run, which requires your system to have Java installed. For more information, visit:https://pyterrier.readthedocs.io/en/latest/installation.html

## How to start front end
The front end is built using Node.js, React and React Router Dom. To start the front end, you need to download Node.js first in this website: https://nodejs.org/en/download/ Then, cd into ```podcastsearchengine``` folder and run the following command
```
npm install
npm install react-router-dom localforage match-sorter sort-by
npm start
```

