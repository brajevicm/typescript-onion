import * as dotenv from 'dotenv';
dotenv.config();

import { Server } from './Web/Server';
import { container } from './Config/Inversify';

new Server().start(container);
