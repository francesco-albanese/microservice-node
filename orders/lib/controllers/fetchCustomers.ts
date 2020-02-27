import { Request, Response } from 'express';

import CustomerModel from '../models/Customer';

export async function fetchCustomers(req: Request, res: Response) {
	try {
		const customers = await CustomerModel.find({});
		res.status(200).json(customers);
	} catch (e) {
		res.status(500).json(e);
	}
}
