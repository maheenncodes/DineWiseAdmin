const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    itemList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }],
    totalPrice: {
        type: Number,
        default:0
    },
    rating: {
        type: Number,
        default: 0,
        enum: [0, 1, 2, 3, 4, 5]
    },
    comment: {
        type: String,
        default:""
    }
},{timestamps: true});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;