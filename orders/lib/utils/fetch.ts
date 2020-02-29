import fetch from 'node-fetch';

export interface Request {
	url: string;
}

export async function get<T>({ url }: Request): Promise<T> {
	try {
		const response = await fetch(url);
		return await response.json();
	} catch (e) {
		throw e;
	}
}
