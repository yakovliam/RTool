# TODO redo this whole project

# -*- coding: utf-8 -*-
"""RTool Client

This is the client stub for the RTool project. It acts as the endpoint for the user
to be hosting. It connects to the server, and sends information back and forth in realtime
using sock programming (sock.io)
"""
__author__ = "Yakovliam"
__copyright__ = "Copyright 2020"
__credits__ = ["Yakovliam"]

__license__ = "WTFPL"
__version__ = "1.0.0"
__maintainer__ = "Yakovliam"
__email__ = "jacob@yakovliam.com"
__status__ = "Development"

# tasker
import tasker


def main():
    print("Initializing")
    # go
    tasker.do()


if __name__ == '__main__':
    main()
