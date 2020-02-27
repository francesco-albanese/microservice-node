import { model, Schema, Document, Types } from 'mongoose';

export interface Order extends Document {
	customerID: Types.ObjectId;
	bookID: Types.ObjectId;
	initialDate: Date;
	deliveryDate: Date;
}

const OrderSchema: Schema = new Schema({
	customerID: {
		type: Schema.Types.ObjectId,
		required: true
	},
	bookID: {
		type: Schema.Types.ObjectId,
		required: true
	},
	initialDate: {
		type: Date,
		required: true,
		default: Date.now
	},
	deliveryDate: {
		type: Date,
		required: true,
		default: Date.now
	}
});

export default model<Order>('Order', OrderSchema);
