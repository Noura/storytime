from random import randint

def genSecretKey(length):
	return ''.join([chr(randint(0,255)) for i in range(25)])

class config(object):
	DEBUG = False
	TESTING = False
	DB_ROOT = ''
	SECRET_KEY = genSecretKey(25)

class debugConfig(config):
	DEBUG = True
	TESTING = True
	#Use sqlite for testing purposes
    SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/storytime.db'
