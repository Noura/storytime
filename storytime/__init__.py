from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy


#Set up our App
app = Flask(__name__)

#Set up the SQLAlchemy DB
db = SQLAlchemy(app)

#Import app views
import storytime.views
