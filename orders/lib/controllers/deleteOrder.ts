import { isValidObjectId } from 'mongoose';
import { Request, Response } from 'express';

import OrderModel from '../models/Order';

export async function deleteOrder(req: Request, res: Response) {
	const { id } = req.params;
	try {
		if (isValidObjectId(id)) {
			const deletedOrder = await OrderModel.findByIdAndDelete(id);
			if (deletedOrder) {
				return res.status(200).json(deletedOrder);
			}
			return res.status(404).json({
				error: {
					message: `Order with id: ${id} could not be found!`
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
