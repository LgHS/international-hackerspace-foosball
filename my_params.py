\server_version = '0.0.1 alpha'
server_name = 'Foosball API'


    'resources':[
        {
            ### /player/
            'name':'player',
            'URI':'',

            'ressource':'',
            'params':'',
            'details':[
                {
                    'http_method':'GET',
                    'http_body_params':'',
                    'py_module':'',
                    'py_method':''
                }
            ]
        },
    ]
}

player = {
    'name' : 'player',

    'bdd_struct' : {
        'id' : 'int',
        'username' : 'varchar',
        'password' : 'varchar',
        'created_at' : 'timestamp'
    },
    
    'verb' : {
            'GET' : {'uri':'/player/{id}'},
            'POST' : {'uri':'/player', 'params':['']},
        }
}
