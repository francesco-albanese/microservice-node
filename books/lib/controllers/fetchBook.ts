import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import BookModel from '../models/Book';

export async function fetchBook(req: Request, res: Response) {
	const { id } = req.params;
	try {
		if (isValidObjectId(id)) {
			const book = await BookModel.findById(id);
			if (book) {
				return res.status(200).json(book);
			}

			return res.status(404).json({
				error: {
					message: `Book with id: ${id} could not be found!`
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
