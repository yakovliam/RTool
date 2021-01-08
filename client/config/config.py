import yaml


# loads config into the 'config' variable
def load():
    with open("config.yml", 'r') as file:
        try:
            config = yaml.safe_load(file)
        except yaml.YAMLError as e:
            print(e)

    return config
