from storytime import db

class Library(db.model):
    __tablename__ = 'library'
    storyID = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(200))
    author = db.Column(db.String(60))
    pages = db.Column(db.Integer)
    text = db.Column(db.PickleType)
