const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [
        {
            product: { type: Object, required: true },
            quantity: { type: Number, required: true },
            status: Number
        }
    ],
    user: {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    status: Number
},
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);