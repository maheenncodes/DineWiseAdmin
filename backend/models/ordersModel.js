const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required:[true,'Restaurant Id is necessary']
    },
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        required:[true,'Table Id is necessary']
    },
    cartId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    }],
    status: [{
        type: String,
        enum: ["new", "preparing", "served", "cancelled", "payment_pending", "completed"],
        default:"new"
    }],
    time: {
        type: Date,
        required: [true,"Order time is necessary"] 
    },
    totalPrice: {
        type: Number,
        default: 0,
    }
},{timestamps: true});

const Order = mongoose.model("Category", orderSchema);
module.exports = Order;