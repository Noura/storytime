from storytime import db
from storytime.models import Story, Page


def init_db():
    db.create_all()
