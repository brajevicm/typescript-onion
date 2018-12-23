import 'reflect-metadata';

import * as dotenv from 'dotenv';
dotenv.config();

import { container } from './Config/Inversify';
import { Server } from './Web/Server';

(async () => await new Server().start(container))();
