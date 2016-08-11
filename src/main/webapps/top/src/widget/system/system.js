import uuid from 'uuid';
import cookie from 'cookie';

class System {
    constructor() {

    }

    guid() {
        if(!cookie.get('userId')){
            cookie.set('userId', uuid.v4(), { expires: 7*365, path: '/' })
        }
    }
}

export default System;
