import { Request, Response } from 'express';

import BookModel from '../models/Book';

export async function fetchBooks(req: Request, res: Response) {
	try {
		const books = await BookModel.find({});
		res.status(200).json(books);
	} catch (e) {
		res.status(500).json(e);
	}
}
