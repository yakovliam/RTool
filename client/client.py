import config.config as config
import socketio
import time

# load config
cfg = config.load()

# create client
sio = socketio.Client()


#
# event handling
#

# disconnect
@sio.event
def disconnect():
    print("Disconnected from server")


# on response
@sio.on("response")
def response(data):
    print("Response -> " + str(data))


# on message
@sio.on("message")
def message(data):
    print("Message -> " + str(data))


#
# function
#

# send credentials to the server
def send_credentials():
    sio.emit('connect credentials', {"clientId": cfg["clientId"], "clientToken": cfg["clientToken"]})


# start
def start():
    while True:

        try:
            # Connection loop
            sio.connect(cfg['host'])
        except Exception as e:
            print(e)
            print("Retrying connection")
            time.sleep(cfg["connectionDelay"])
            continue

        print("Connected, waiting for handshake")

        # essential sleep for handshake to happen
        time.sleep(1)

        # send credentials
        send_credentials()

        # connected!
        print("Successfully connected to the host -> (" + cfg["host"] + ")")

        # we wait for an incoming message....so....do nothing
        sio.wait()

        # at this point the server would have disconnected...that's the only way that this would be reached
        # so, we print and wait the connection delay time
        print("Retrying connection")
        time.sleep(cfg["connectionDelay"])
