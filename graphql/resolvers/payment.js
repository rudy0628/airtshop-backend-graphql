const HttpError = require('../../model/http-Error');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
	createPayment: async (args, req) => {
		if (!req.isAuth) {
			return new HttpError('UnAuthenticated', 401);
		}
		const { paymentId, amount, flight } = args;

		try {
			const paymentIntent = await stripe.paymentIntents.create({
				amount: amount,
				currency: 'TWD',
				description: `userId:${req.userId} flight:${flight} $${amount / 100}`,
				payment_method: paymentId,
				confirm: true,
			});

			return { id: paymentIntent.id, success: true };
		} catch (e) {
			return new HttpError(e.message, 401);
		}
	},
	refundPayment: async (args, req) => {
		if (!req.isAuth) {
			return new HttpError('UnAuthenticated', 401);
		}

		try {
			await stripe.refunds.create({
				payment_intent: args.paymentIntentId,
				amount: args.amount,
			});

			return { message: 'Refund successful!', success: true };
		} catch (e) {
			return new HttpError(e.message, 401);
		}
	},
};
