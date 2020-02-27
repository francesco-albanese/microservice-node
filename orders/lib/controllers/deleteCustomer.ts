import { isValidObjectId } from 'mongoose';
import { Request, Response } from 'express';

import CustomerModel from '../models/Customer';

export async function deleteCustomer(req: Request, res: Response) {
	const { id } = req.params;
	try {
		if (isValidObjectId(id)) {
			const deletedCustomer = await CustomerModel.findByIdAndDelete(id);
			if (deletedCustomer) {
				return res.status(200).json(deletedCustomer);
			}
			return res.status(404).json({
				error: {
					message: `Customer with id: ${id} could not be found!`
				}
			});
		}
		return res.status(400).json({
			error: {
				message: `The id ${id} is not valid.`
			}
		});
	} catch (e) {
		res.status(500).json(e);
	}

	return res.status(400).json({
		error: {
			message: `The id ${id} is not valid.`
		}
	});
}
