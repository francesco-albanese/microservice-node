import { model, Schema, Document } from 'mongoose';

export interface Customer extends Document {
	name: string;
	age: number;
	address: number;
}

const CustomerSchema: Schema = new Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	address: {
		type: String,
		required: true
	}
});

export default model<Customer>('Customer', CustomerSchema);
