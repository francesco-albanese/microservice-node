import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import CustomerModel from '../models/Customer';

export async function fetchCustomer(req: Request, res: Response) {
	const { id } = req.params;
	try {
		if (isValidObjectId(id)) {
			const customer = await CustomerModel.findById(id);
			if (customer) {
				return res.status(200).json(customer);
			}

			return res.status(404).json({
				error: {
					message: `Customer with id: ${id} could not be found!`
				}
			});
		}
		return res.status(400).json({
			error: {
				message: `The id ${id} is not a valid`
			}
		});
	} catch (e) {
		res.status(500).json(e);
	}
}
