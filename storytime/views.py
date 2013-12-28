from flask import url_for, request, redirect, render_template, jsonify, abort
from flask.json import dumps
from storytime import app
from storytime.content import get_content


@app.route('/<story>/<page>')
def storypage(story, page):
	return render_template('storypage.html',
					content = get_content(story, page)
					)

@app.route('/rest/<story>/<page>')
def storycontent(story, page):
	return dumps(get_content(story, page))

@app.route('/rest/lipsum')
def storylipsum():
	return dumps(get_content(-1, 0, lipsum=True))
