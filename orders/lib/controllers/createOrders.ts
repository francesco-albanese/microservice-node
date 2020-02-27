import { Request, Response } from 'express';
import { Types } from 'mongoose';

import { elementInCollection } from './../utils/elementInCollection';
import OrderModel, { Order } from '../models/Order';

export async function createOrders(req: Request, res: Response) {
	const { customerID, bookID, initialDate, deliveryDate } = req.body;
	if (
		!elementInCollection({ element: customerID, collection: req.customers }) ||
		!elementInCollection({ element: bookID, collection: req.books })
	) {
		return res.status(400).json({
			error: {
				message: 'You need to provide an existing customerID and bookID.'
			}
		});
	}

	const payload: Partial<Order> = {
		customerID: Types.ObjectId(customerID),
		bookID: Types.ObjectId(bookID),
		initialDate,
		deliveryDate
	};

	const order = new OrderModel(payload);

	try {
		const created = await order.save();
		res.status(201).json(created);
	} catch (e) {
		res.status(400).json(e);
	}
}
