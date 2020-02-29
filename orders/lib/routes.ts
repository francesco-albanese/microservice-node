import { Router } from 'express';

import { createOrders } from './controllers/createOrders';
import { getBooks } from './middlewares/getBooks';
import { getCustomers } from './middlewares/getCustomers';
import { fetchOrders } from './controllers/fetchOrders';
import { fetchOrder } from './controllers/fetchOrder';
import { deleteOrder } from './controllers/deleteOrder';

const routes = Router();

routes.post('/orders', getBooks, getCustomers, createOrders);
routes.get('/orders', fetchOrders);
routes.get('/orders/:id', fetchOrder);
routes.delete('/orders/:id', deleteOrder);

export { routes };
