from flask import Flask, request
from articleparser import ArticleParser
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
p = ArticleParser()

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/ranked', methods=['POST'])
def ranked():
    if 'content' in request.form:
        print("got request")
        return {
            "sentences": p.get_ranked_sentences(request.form['content'])
        }
    else:
        return {
            "error": "No content provided"
        }