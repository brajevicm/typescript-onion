import {AsyncContainerModule} from "inversify";
import {MySqlConnection} from "../../Infrastructure/Data/DataSource/MySqlConnection";

export const bindings = new AsyncContainerModule(async bind => {
    const options = {};

    await MySqlConnection.getConnection(options);
});