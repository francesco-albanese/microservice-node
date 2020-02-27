import { isValidObjectId } from 'mongoose';
import { Request, Response } from 'express';

import BookModel from '../models/Book';

export async function deleteBook(req: Request, res: Response) {
	const { id } = req.params;

	if (isValidObjectId(id)) {
		const deletedBook = await BookModel.findByIdAndDelete(id);
		if (deletedBook) {
			return res.status(200).json(deletedBook);
		}
		return res.status(404).json({
			error: {
				message: `Book with id: ${id} could not be found!`
			}
		});
	}

	return res.status(400).json({
		error: {
			message: `The id ${id} is not valid.`
		}
	});
}
