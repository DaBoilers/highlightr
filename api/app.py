from flask import Flask, request
from articleparser import ArticleParser

app = Flask(__name__)
p = ArticleParser()

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/ranked', methods=['POST'])
def ranked():
    if 'content' in request.form:
        return {
            "sentences": p.get_ranked_sentences(request.form['content'])
        }
    else:
        return {
            "error": "No content provided"
        }