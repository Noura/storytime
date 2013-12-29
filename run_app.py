from storytime import app
import storytime.config as config

from flask.ext.script import Manager


manager = Manager(app)

@manager.command
def production():
    app.config.from_object(config.productionConfig)
    app.run()

@manager.command
def debug():
    app.config.from_object(config.debugConfig)
    app.run()

if __name__=='__main__':
    manager.run()
