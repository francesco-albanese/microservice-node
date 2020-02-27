import BookModel, { Book } from './../models/Book';
import { Request, Response } from 'express';

export async function createBooks(req: Request, res: Response) {
	const { title, author, numberOfPages, publisher } = req.body;

	const payload: Partial<Book> = {
		title,
		author,
		numberOfPages,
		publisher
	};

	const book = new BookModel(payload);

	try {
		const created = await book.save();
		res.status(201).json(created);
	} catch (e) {
		res.status(400).json(e);
	}
}
