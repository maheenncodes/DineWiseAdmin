const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    itemList: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0,
        enum: [0, 1, 2, 3, 4, 5]
    },
    comment: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["payment_pending", "being_verified", "completed"],
        default: "payment_pending"
    },


    paymentDone: {
        type: Boolean,
        default: false
    },

    paymentVerified: {
        type: Boolean,
        default: false
    }


}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;