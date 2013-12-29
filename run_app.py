from storytime import app
import storytime.config as config
import storytime.dbtools as dbtools

from flask.ext.script import Manager


def create_app(cfg=None):
    if cfg=='debug':
        app.config.from_object(config.debugConfig)
    elif cfg=='production':
        app.config.from_object(config.productionConfig)
    else:
        raise NameError("This confguration name is not allowed!")
    return app

manager = Manager(create_app)

@manager.command
def init_db():
    dbtools.init_db()

@manager.command
def run():
    app.run()

if __name__=='__main__':
    manager.add_option('-c', '--config', dest='cfg', required=False)
    manager.run()
