import 'reflect-metadata';
import {InversifyExpressServer} from 'inversify-express-utils';
import * as bodyParser from 'body-parser';

import {container} from './Assembler/Container';

// start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});

let serverInstance = server.build();
serverInstance.listen(3000);

console.log('Server started on port 3000 :)');