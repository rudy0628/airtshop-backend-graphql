const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	cart: [
		{
			flight: {
				type: String,
				required: true,
			},
			depTime: {
				type: String,
				required: true,
			},
			arrTime: {
				type: String,
				required: true,
			},
			from: {
				type: String,
				required: true,
			},
			to: {
				type: String,
				required: true,
			},
			gate: {
				type: String,
				required: true,
			},
			duration: {
				type: Number,
				required: true,
			},
			classType: {
				type: String,
				required: true,
			},
			passenger: {
				type: String,
				required: true,
			},
			seat: {
				type: String,
				required: true,
			},
			fullName: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
			},
			phoneNumber: {
				type: String,
				required: true,
			},
			payment: {
				type: String,
				required: true,
			},
		},
	],
});

module.exports = mongoose.model('Cart', cartSchema);
