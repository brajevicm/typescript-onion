import {Container} from "inversify";
import {InversifyExpressServer} from "inversify-express-utils";
import {buildProviderModule} from "inversify-binding-decorators";
import {createConnection} from "typeorm";
import * as bodyParser from "body-parser";

import {ConfigProvider} from "./ConfigProvider";
import "./Assembler/Loader";
import {UserEntity} from "../Core/Domain/User/Entity/UserEntity";

export class Server {
    public start(): void {
        let config: any = ConfigProvider;

        // create database connection
        createConnection({
            type: config.type,
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.username,
            password: config.password,
            entities: [
                UserEntity
            ],
            synchronize: true,
        }).then(() => {
            this.startExpressServer();
        }).catch(e => console.log(e.message));
    }

    private startExpressServer(): void {
        // load everything needed to the Container
        let container = new Container();
        container.load(buildProviderModule());

        let server = new InversifyExpressServer(container);
        server.setConfig((app) => {
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(bodyParser.json());
        });

        let app = server.build();
        app.listen(3000, () => {
            console.log('Server started on port 3000 :)');
        });
    }
}