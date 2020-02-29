import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import OrderModel from '../models/Order';
import { getInfoForOrders } from '../utils/getInfoForOrders';

export async function fetchOrder(req: Request, res: Response) {
	const { id } = req.params;
	try {
		if (isValidObjectId(id)) {
			const order = await OrderModel.findById(id);

			if (order) {
				const [augmentedOrder] = await getInfoForOrders([order]);
				return res.status(200).json(augmentedOrder);
			}

			return res.status(404).json({
				error: {
					message: `Order with id: ${id} could not be found!`
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
