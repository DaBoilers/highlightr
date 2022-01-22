import pickle
import spacy
import pytextrank

class ArticleParser(object):
    def __init__(self, model="en_core_web_sm"):
        self.nlp = spacy.load(model)
        self.nlp.add_pipe("textrank")

    def set_model(self, model):
        self.nlp = spacy.load(model)
        self.nlp.add_pipe("textrank")

    def get_ranked_sentences(self, text, phrase_limit=10, sentence_limit=5):
        doc = self.nlp(text)
        tr = doc._.textrank
        summary = tr.summary(
            limit_phrases=phrase_limit,
            limit_sentences=sentence_limit)

        sentences = []
        for span in summary:
            sentences.append(span.text)
        return sentences