import { Request, Response, NextFunction } from 'express';

import { get } from '../utils/fetch';

export interface CustomerRequest extends Request {
	customers?: {
		name: string;
		age: number;
		address: number;
	}[];
}

export interface Customer {
	_id: string;
	name: string;
	age: number;
	address: number;
}

export async function getCustomers(
	req: CustomerRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const customers: Customer[] = await get({
			url: 'http://customers_app:7575/customers'
		});
		req.customers = customers;
		next();
	} catch (e) {
		res.status(500).json({
			error: {
				message: 'Could not fetch customers'
			}
		});
		next(e);
	}
}
