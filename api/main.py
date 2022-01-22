from flask import Flask, request
from articleparser import ArticleParser
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
p = ArticleParser()

@app.route("/")
def index():
    return jsonify({ 'status' : 'running'})

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


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

