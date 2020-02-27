interface Collection {
	_id: string;
}

interface Argument {
	element: string;
	collection: Collection[];
}

export function elementInCollection({
	element,
	collection = []
}: Argument): boolean {
	return collection.some(({ _id }) => _id === element);
}
