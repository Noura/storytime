from flask import Flask


#Set up our App
app = Flask(__name__)

#Import app views
import storytime.views
