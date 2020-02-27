import CustomerModel, { Customer } from '../models/Customer';
import { Request, Response } from 'express';

export async function createCustomers(req: Request, res: Response) {
	const { name, age, address } = req.body;

	const payload: Partial<Customer> = {
		name,
		age,
		address
	};

	const customer = new CustomerModel(payload);

	try {
		const created = await customer.save();
		res.status(201).json(created);
	} catch (e) {
		res.status(400).json(e);
	}
}
