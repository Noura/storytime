from storytime import app, db
import storytime.config as config

from flask.ext.script import Manager


manager = Manager(app)

@manager.command
def init_db(config=None):
    configure()
    db.create_all()

@manager.command
def run(config=None):
    configure()
    app.run()

def configure(config=None):
    if config=='debug':
        app.config.from_object(config.debugConfig)
    elif config=='production':
        app.config.from_object(config.productionConfig)
    else:
        raise NameError("This configuration name is not allowed!")

if __name__=='__main__':
    manager.add_option('-c', '--config', dest='config', required=True)
    manager.run()
