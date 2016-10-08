#!/usr/bin/env python3
#coding:utf-8

import sys
import json

try:
    import bottle
except ImportError:
    print("Bottle is not present, try pip3 install bottle")
    sys.exit(1)

try:
    import my_params
except ImportError:
    print("Configuration file is missing !")
    sys.exit(1)

class Foosball:
    ''' '''
    def __init__(self):
        ''' Constructor '''
        setattr(Foosball, 'a', classmethod(bottle.route('/hello/<name>')(self.default)))
        return

    def start(self, host, port):
        ''' Entry point '''
        bottle.run(host=host, port=port)
        return 0

    def default(*args, **kwargs):
        ''' By default > Error: 501 Not implemented '''
        bottle.abort(501, "Maybe a day ...")
        return
        
def main():
    ''' Entry point '''
    app = Foosball()
    #for path, module_name in listing.items():
    #    module = __import__(module_name[0])
    #    method = getattr(module, module_name[1])
    #    setattr(Foosball, 'a', classmethod(bottle.route(path)(method)))
    app.start('192.168.178.103', 4242)
    return 

if __name__ == '__main__':
    sys.exit(main())
