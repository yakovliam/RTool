import file.config as config
import socketio
import command.command as cmd
import time
import file.log as log

# load file
cfg = config.load()

# create client
sio = socketio.Client(reconnection_delay=cfg["connectionDelay"])


#
# event handling
#

# connect
@sio.event
def connect():
    # log
    log.log(log.LogType.INFO, "Connected to the host, waiting for a handshake")

    print("Connected, waiting for handshake")

    # essential sleep for handshake to happen
    time.sleep(1)

    # send credentials
    send_credentials()

    # log
    log.log(log.LogType.INFO, "Connected to the host")

    # connected!
    print("Connected to host -> Success (" + cfg["host"] + ")")


# disconnect
@sio.event
def disconnect():
    # log
    log.log(log.LogType.WARNING, "Disconnected from the host, retrying")

    print("Disconnected from host -> Retrying")


# on response
@sio.on("response")
def response(data):
    # log
    log.log(log.LogType.INFO, "Received the a host response -> " + str(data))

    print("Received Response -> " + str(data))

# on message
@sio.on("message")
def message(data):
    # log
    log.log(log.LogType.INFO, "Received the a host message -> " + str(data))

    print("Received Message -> " + str(data))


# on command
@sio.on("command")
def command(data):
    # log
    log.log(log.LogType.INFO, "Received the a host command -> " + str(data))

    print("Received Command -> " + str(data))

    try:
        # run command
        cmd.run_command(data, sio)
    except Exception as e:
        # log
        log.log(log.LogType.ERROR,
                "There was a command while trying to execute the a host command -> " + str(data) + ", Error: " + str(e))

        print("Error while executing command -> " + str(e))
        # send error to server
        data = {"error": "true", "message": str(e)}
        send_response(data)


#
# function
#

# send credentials to the server
def send_credentials():
    sio.emit('connect credentials', {"clientId": cfg["clientId"], "clientToken": cfg["clientToken"]})


# send response to server
def send_response(data):
    sio.emit("response", data)


# start
def start():
    # log
    log.log(log.LogType.INFO, "Started tasker")

    while True:

        try:
            # log
            log.log(log.LogType.INFO, "Trying to connect to the host")

            # Connection loop
            sio.connect(cfg['host'])
        except Exception as e:
            # log
            log.log(log.LogType.ERROR,
                    "There was an error while trying to connect to the host -> " + str(e))

            print("There was an error while connecting to the host -> " + str(e) + " -> Retrying")
            time.sleep(cfg["connectionDelay"])
            continue

        # we wait for an incoming message....so....do nothing
        sio.wait()

        # at this point the server would have disconnected...that's the only way that this would be reached
        # so we wait the connection delay time
        time.sleep(cfg["connectionDelay"])
