# TODO redo this whole project

import socketio
import config.config as config
import time

cfg = None
sio = socketio.Client()
stub = None
delay = None


def get_sio():
    return sio


class Client:
    def __init__(self):
        self.client_id = cfg['clientId']
        self.client_token = cfg['clientToken']

    def connect_to_server(self):
        # host ip
        host = cfg['host']

        print("Connecting to host -> " + host)

        try:
            # connect
            sio.connect(host, namespaces=['/client'])
            # wait a second for handshake
            time.sleep(1)

            # send credentials
            self.send_credentials()
        except Exception as e:
            print(e)
            return None

        return get_sio()

    def send_credentials(self):
        sio.emit('connect credentials', {"clientId": self.client_id, "clientToken": self.client_token},
                 namespace='/client')


#
# event handling
#

# on response
@sio.on("response", namespace='/client')
def response(data):
    print("Response -> " + str(data))


# on disconnect
@sio.event(namespace='/client')
def disconnect():
    print("Disconnected, trying to reconnect")
    # try to reconnect
    try_connection()


def try_connection():

    # forever, try to connect
    while True:
        # connect to server (socket)
        if stub and delay:
            res = stub.connect_to_server()
        else:
            res = None

        # if fail, retry
        if not res:
            print("Retrying in " + str(delay) + " seconds")
            # wait x seconds before retrying
            time.sleep(delay)
        else:
            break

    print("Connection Successful")


if __name__ != '__main__':
    # load config
    cfg = config.load()
