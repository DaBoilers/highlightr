from flask import Flask, request
import spacy
import pytextrank

app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")
nlp.add_pipe("textrank")

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/get_ranked_sentences')
def get_ranked_sentences():
    input = request.form['content']
    doc = nlp(input)
    return {
        "sentences": doc._.phrases
    }