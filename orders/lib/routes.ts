import { Router } from 'express';

import { createOrders } from './controllers/createOrders';
import { getBooks } from './middlewares/getBooks';
import { getCustomers } from './middlewares/getCustomers';
// import { fetchOrders } from './controllers/fetchOrders';
// import { fetchCustomer } from './controllers/fetchCustomer';
// import { deleteCustomer } from './controllers/deleteCustomer';

const routes = Router();

routes.post('/orders', getBooks, getCustomers, createOrders);
// routes.get('/customers', fetchOrders);
// routes.get('/customers/:id', fetchCustomer);
// routes.delete('/customers/:id', deleteCustomer);

export { routes };
