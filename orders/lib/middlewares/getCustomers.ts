import { Request, Response, NextFunction } from 'express';

import { get } from '../utils/fetch';

export interface CustomerRequest extends Request {
	customers?: Array<{
		name: string;
		age: number;
		address: number;
	}>;
}

export async function getCustomers(
	req: CustomerRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const customers = await get({ url: 'http://customers_app:7575/customers' });
		req.customers = customers;
		console.log({ customers });
		next();
	} catch (e) {
		next(e);
	}
}
