from flask import url_for, request, redirect, render_template, jsonify, abort, make_response
from flask.json import dumps
from storytime import app
from storytime.content import get_content


@app.route('/<int:story>/<int:page>')
def storypage(story, page):
	return render_template('storypage.html',
					content = get_content(story, page)
					)

@app.route('/<int:story>')
def serve_js_reader(story):
      return make_response(open('angular_templates/index.html').read())

@app.route('/rest/<story>/<page>')
def storycontent(story, page):
	return dumps(get_content(story, page))

@app.route('/rest/lipsum/<page>')
def storylipsum():
	return dumps(get_content(1337, page))
