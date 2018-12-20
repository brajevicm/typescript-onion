import { Server } from './Web/Server';
import container from './inversify.config';

new Server().start(container);
