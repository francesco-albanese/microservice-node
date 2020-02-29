import { Request, Response, NextFunction } from 'express';

import { get } from '../utils/fetch';

export interface BookRequest extends Request {
	books?: {
		title: string;
		author: string;
		numberOfPages: number;
		publisher: string;
	}[];
}

export interface Book {
	_id: string;
	title: string;
	author: string;
	numberOfPages: number;
	publisher: string;
}

export async function getBooks(
	req: BookRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const books: Book[] = await get({ url: 'http://books_app:5757/books' });
		req.books = books;
		next();
	} catch (e) {
		res.status(500).json({
			error: {
				message: 'Could not fetch books'
			}
		});
		next(e);
	}
}
