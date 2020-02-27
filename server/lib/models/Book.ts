import { model, Schema, Document } from 'mongoose';

export interface Book extends Document {
	title: string;
	author: string;
	numberOfPages: number;
	publisher: string;
}

const BookSchema: Schema = new Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	numberOfPages: {
		type: Number,
		required: false
	},
	publisher: {
		type: String,
		required: false
	}
});

export default model<Book>('Book', BookSchema);
