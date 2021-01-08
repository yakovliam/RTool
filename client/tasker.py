# TODO redo this whole project

import config.config as config
import sock.client as client
from time import sleep

cfg = None
# initialize client
stub = client.Client()

# get sio
sio = client.sio


def do():
    global stub
    global sio

    # get try connection delay
    connection_delay = cfg['connectionDelay']

    # connect
    client.stub = stub
    client.delay = connection_delay
    # actually connect
    client.try_connection()


if __name__ != '__main__':
    cfg = config.load()
