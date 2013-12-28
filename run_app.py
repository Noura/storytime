from storytime import app
import storytime.config

from flask.ext.script import Manager


manager = Manager(app)

@manager.command
def debug():
	app.run(debug=True)

if __name__=='__main__':
	app.run()
