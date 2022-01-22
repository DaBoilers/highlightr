from flask import Flask, request
from articleparser import ArticleParser
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
p = ArticleParser()

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app.
    app.run(host='127.0.0.1', port=8080, debug=True)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/ranked', methods=['POST'])
def ranked():
    json = request.get_json(force=True, silent=True)
    if json is not None and 'content' in json:
        return {
            "sentences": p.get_ranked_sentences(json['content'])
        }
    else:
        return {
            "error": "No content provided"
        }