const paymentResolver = require('./payment');
const cartResolver = require('./cart');

const rootResolver = {
	...paymentResolver,
	...cartResolver,
};

module.exports = rootResolver;
