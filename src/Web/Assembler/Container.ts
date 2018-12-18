import {Container} from 'inversify';
import {buildProviderModule} from 'inversify-binding-decorators';

import './Loader';

let container = new Container();

container.load(buildProviderModule());

export {container};