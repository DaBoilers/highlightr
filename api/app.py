from flask import Flask, request
import pickle
import spacy
import pytextrank

app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")
nlp.add_pipe("textrank")

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/ranked', methods=['POST'])
def ranked():
    if 'content' in request.form:
        doc = nlp(request.form['content'])
        tr = doc._.textrank
        sentences = []
        for span in tr.summary(limit_phrases=15, limit_sentences=2):
            sentences.append(span.text)
        return {
            "sentences": sentences
        }
    else:
        return {
            "error": "No content provided"
        }