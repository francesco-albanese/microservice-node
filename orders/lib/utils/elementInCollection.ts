import { Book } from '../middlewares/getBooks';
import { Customer } from '../middlewares/getCustomers';

interface Argument {
	element: string;
	collection: Book[] | Customer[];
}

export function elementInCollection({
	element,
	collection = []
}: Argument): boolean {
	return collection.some(({ _id }: { _id: string }) => _id === element);
}
