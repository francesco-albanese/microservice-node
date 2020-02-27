import { Router, Response } from 'express';

import { createCustomers } from './controllers/createCustomers';
import { fetchCustomers } from './controllers/fetchCustomers';
import { fetchCustomer } from './controllers/fetchCustomer';
import { deleteCustomer } from './controllers/deleteCustomer';

const routes = Router();

routes.get('/', (req, res: Response) => {
	res.send('🍕 Hello world from routes.');
});

routes.post('/customers', createCustomers);
routes.get('/customers', fetchCustomers);
routes.get('/customers/:id', fetchCustomer);
routes.delete('/customers/:id', deleteCustomer);

export { routes };
