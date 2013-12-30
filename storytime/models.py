from storytime import db

class Story(db.Model):
    __tablename__ = 'library'
    story_id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(200))
    author = db.Column(db.String(60))
    pages = db.Column(db.Integer)

    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.pages = 0

    def __repr__(self):
        return '<Story %(title)s, by %(author)s>' % \
                {title: self.title, author: self.author}

    def add_page(self):
        self.pages += 1

    def remove_page(self):
        self.pages -= 1

    def set_length(self, pages):
        self.pages = pages

class Page(db.Model):
    __tablename__ = 'pages'
    page_id = db.Column(db.Integer, primary_key=True)
    page_number = db.Column(db.Integer)
    text = db.Column(db.PickleType)
    img_ref = db.Column(db.String(200))

    story_id = db.Column(db.Integer,
                        db.ForeignKey('story.story_id'))
    story = db.relationship('Story',
                        backref=db.backref('posts', lazy='dynamic'))

    def __init__(self, page_number, text, img_ref):
        self.page_number = page_number
        self.text = text
        self.image_ref = image_ref
        self.story = story

    def __repr__(self):
        return '<%(story)s - Page %(page)d>' % \
                {story: self.story.title, page: self.page}
