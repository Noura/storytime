from storytime import db
from storytime.models import Story, Page

def add_story(title, author, storypages):
    #Set up our story object
    story = Story(title, author)
    db.session.add(story)
    #Then create and add pages
    story.set_length(len(storypages))
    for page in  map(Page, storypages):
        db.session.add(page)
    db.session.commit()
