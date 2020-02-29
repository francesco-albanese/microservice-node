import { get } from './fetch';
import { Order } from './../models/Order';
import { Book } from '../middlewares/getBooks';
import { Customer } from '../middlewares/getCustomers';

interface BooksCustomersIDs {
	bookIDs: string[];
	customerIDs: string[];
}

function getBooksAndCustomersIDs(orders: Order[]): BooksCustomersIDs {
	return orders.reduce<BooksCustomersIDs>(
		(ids, currentOrder) => {
			const { bookID, customerID } = currentOrder;
			ids.bookIDs.push(bookID.toString());
			ids.customerIDs.push(customerID.toString());
			return ids;
		},
		{
			bookIDs: [],
			customerIDs: []
		}
	);
}

async function getAllBooksInfo(bookIDs: string[]) {
	return await Promise.all(
		bookIDs.map(async bookID => {
			return await get<Book>({ url: `http://books_app:5757/books/${bookID}` });
		})
	);
}

async function getAllCustomersInfo(customerIDs: string[]) {
	return await Promise.all(
		customerIDs.map(async customerID => {
			return await get<Customer>({
				url: `http://customers_app:7575/customers/${customerID}`
			});
		})
	);
}

export interface AugmentedOrder {
	_id: string;
	initialDate: Date;
	deliveryDate: Date;
	book:
		| {
				_id: string;
				title: string;
				author: string;
				numberOfPages: number;
				publisher: string;
		  }
		| {
				_id: string;
		  };
	customer:
		| {
				_id: string;
				name: string;
				age: number;
				address: number;
		  }
		| {
				_id: string;
		  };
}

function augmentOrdersWithBooksAndCustomersInfo({
	allBooksInfo,
	allCustomersInfo,
	orders
}: {
	allBooksInfo: Book[];
	allCustomersInfo: Customer[];
	orders: Order[];
}) {
	return orders.reduce<AugmentedOrder[]>((augmentedOrders, currentOrder) => {
		const { customerID, bookID, initialDate, deliveryDate } = currentOrder;
		const book = allBooksInfo.find(({ _id }) => _id === bookID.toString());
		const customer = allCustomersInfo.find(
			({ _id }) => _id === customerID.toString()
		);

		const augmentedOrder = {
			_id: currentOrder._id,
			initialDate,
			deliveryDate,
			book: {
				...(book ? book : { _id: bookID.toString() })
			},
			customer: {
				...(customer ? customer : { _id: customerID.toString() })
			}
		};

		return [...augmentedOrders, augmentedOrder];
	}, []);
}

export async function getInfoForOrders(orders: Order[]) {
	const { bookIDs, customerIDs } = getBooksAndCustomersIDs(orders);

	try {
		const allBooksInfo = await getAllBooksInfo(bookIDs);
		const allCustomersInfo = await getAllCustomersInfo(customerIDs);
		const ordersWithBooksAndCustomersInfo = augmentOrdersWithBooksAndCustomersInfo(
			{ orders, allBooksInfo, allCustomersInfo }
		);

		return ordersWithBooksAndCustomersInfo;
	} catch (e) {
		return orders;
	}
}
