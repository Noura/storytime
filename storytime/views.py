from flask import url_for, request, redirect, render_template, jsonify, abort, make_response
from flask.json import dumps
from storytime import app
from storytime.content import get_content

@app.route('/')
def home():
    return make_response(open('angular_templates/index.html').read())

@app.route('/user_home')
def user_home():
    return make_response(open('angular_templates/user_home.html').read())

@app.route('/<int:story>/<int:page>')
def storypage(story, page):
	return render_template('storypage.html',
					content = get_content(story, page)
					)

@app.route('/<int:story>')
def serve_js_reader(story):
      return make_response(open('angular_templates/reading_story.html').read())

@app.route('/rest/<story>/<page>')
def storycontent(story, page):
	return dumps(get_content(story, page))

@app.route('/rest/lipsum/<page>')
def storylipsum(page):
	return dumps(get_content(1337, page))

@app.route('/rest/users/login', methods=['POST'])
def login():
    #TODO actually do stuff? maybe return list of their stories?
    data = request.get_json()
    userName = data['userName']
    res = {}
    res['userName'] = userName
    res['status'] = 'We will pretend we did something.'
    return jsonify(res)

@app.route('/rest/users/new', methods=['POST'])
def newUser():
    #TODO actually do stuff, like make new user in DB
    data = request.get_json()
    userName = data['userName']
    res = {}
    res['userName'] = userName
    res['status'] = 'We will pretend we did something.'
    return jsonify(res)
