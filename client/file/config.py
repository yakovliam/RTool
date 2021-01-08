import yaml
import os

dirname = os.path.dirname(__file__)
file = os.path.join(dirname, '../config.yml')


# loads file into the 'file' variable
def load():
    with open(file, 'r') as f:
        try:
            config = yaml.safe_load(f)
        except yaml.YAMLError as e:
            print(e)

    return config
