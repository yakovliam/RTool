from datetime import datetime
from enum import Enum
import os
import json

dirname = os.path.dirname(__file__)
file = os.path.join(dirname, '../logs.json')


# log type enum
class LogType(Enum):
    ERROR = 1
    WARNING = 2
    INFO = 3


# log function
def log(type, message):
    logs = get_logs()

    # get date
    date = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]

    # add log to logs
    logs['logs'].append({"date": date, "type": str(type.name), "message": message})

    # write to file
    with open(file, 'w+') as f:
        json.dump(logs, f)

        # close
        f.close()


def get_logs():
    # open file
    with open(file, 'r') as f:
        # return file contents
        return json.loads(f.read())
