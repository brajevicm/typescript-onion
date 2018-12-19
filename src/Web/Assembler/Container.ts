import {Container} from 'inversify';
import {buildProviderModule} from 'inversify-binding-decorators';

import {bindings} from "./Bindings";

export const getContainer = async () => {
    await require('./Loader');
    const container = new Container();

    container.load(buildProviderModule());
    await container.loadAsync(bindings);

    return container
};