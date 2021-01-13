from . import screencap


def run_command(data, sio):
    command_string = data["command"]

    print("Running command -> " + command_string)

    # if command is 'screencap'
    if command_string == 'screencap':
        # get screencap image
        image = screencap.get_screencap().decode('utf-8')
        # emit image data to client
        sio.emit('screencap', {'data': image})
