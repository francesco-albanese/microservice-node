import { Request, Response } from 'express';

import OrderModel from '../models/Order';
import { getInfoForOrders } from '../utils/getInfoForOrders';

export async function fetchOrders(req: Request, res: Response) {
	try {
		const orders = await OrderModel.find({});
		const ordersWithBooksAndCustomersInfo = await getInfoForOrders(orders);
		res.status(200).json(ordersWithBooksAndCustomersInfo);
	} catch (e) {
		res.status(500).json(e);
	}
}
