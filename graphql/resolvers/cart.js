const HttpError = require('../../model/http-Error');
const Cart = require('../../model/cart-model');

module.exports = {
	tickets: async (args, req) => {
		if (!req.isAuth) {
			return new HttpError('UnAuthenticated', 401);
		}

		let existingUser;
		try {
			existingUser = await Cart.findOne({
				userId: req.userId,
			});
		} catch (e) {
			return new HttpError('Something went wrong! Please try again!', 500);
		}

		if (!existingUser) {
			const createdCart = new Cart({
				userId: req.userId,
				cart: [],
			});

			try {
				await createdCart.save();
			} catch (e) {
				return new HttpError('Created user cart error, please try again!', 500);
			}

			return [];
		}

		return existingUser.cart;
	},
	addTicket: async (args, req) => {
		if (!req.isAuth) {
			return new HttpError('UnAuthenticated', 401);
		}

		let existingUser;
		try {
			existingUser = await Cart.findOne({
				userId: req.userId,
			});
		} catch (e) {
			return new HttpError('find user failed', 500);
		}

		if (!existingUser) {
			const createdCart = new Cart({
				userId: req.userId,
				cart: [args.ticketInput],
			});

			try {
				await createdCart.save();
			} catch (e) {
				return new HttpError(e.message, 500);
			}
		} else {
			existingUser.cart.push(args.ticketInput);

			try {
				await existingUser.save();
			} catch (e) {
				return new HttpError('Add to cart failed!', 500);
			}
		}

		return 'Add ticket successful!';
	},
	updateTicket: async (args, req) => {
		if (!req.isAuth) {
			return new HttpError('UnAuthenticated', 401);
		}

		let existingUser;
		try {
			existingUser = await Cart.findOne({
				userId: req.userId,
			});
		} catch (e) {
			return new HttpError('Something went wrong! Please try again!', 500);
		}

		if (!existingUser) {
			return new HttpError('Cannot find user from provided id!', 404);
		}

		// update user data
		const updatedTicket = existingUser.cart.find(
			ticket => ticket.id === args.ticketId
		);
		updatedTicket.payment = args.payment;

		try {
			await existingUser.save();
		} catch (e) {
			return new HttpError('Something went wrong! Please try again!', 500);
		}

		return existingUser.cart;
	},
	deleteTicket: async (args, req) => {
		if (!req.isAuth) {
			return new HttpError('UnAuthenticated', 401);
		}

		let existingUser;
		try {
			existingUser = await Cart.findOne({
				userId: req.userId,
			});
		} catch (e) {
			return new HttpError('Something went wrong! Please try again!', 500);
		}

		if (!existingUser) {
			return new HttpError('Cannot find user from provided id!', 404);
		}

		existingUser.cart = existingUser.cart.filter(
			ticket => ticket._id.toString() !== args.ticketId
		);

		try {
			await existingUser.save();
		} catch (e) {
			return new HttpError('Something went wrong! Please try again!', 500);
		}

		return existingUser.cart;
	},
};
