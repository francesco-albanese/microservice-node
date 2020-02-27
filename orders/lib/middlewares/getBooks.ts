import { Request, Response, NextFunction } from 'express';

import { get } from '../utils/fetch';

export interface BookRequest extends Request {
	books?: Array<{
		title: string;
		author: string;
		numberOfPages: number;
		publisher: string;
	}>;
}

export async function getBooks(
	req: BookRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const books = await get({ url: 'http://books_app:5757/books' });
		req.books = books;
		next();
	} catch (e) {
		next(e);
	}
}
