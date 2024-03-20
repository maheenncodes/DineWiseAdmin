const Order = require("../models/ordersModel");
const Table = require("../models/tableModel");
const Restaurant = require("../models/restuarantsModel");
const Cart = require("../models/ordersModel");
const asyncHandler = require("express-async-handler");
const addToTable = asyncHandler(async (req, res) => {
    const { restaurantId, tableId } = req.query;
    const { userId } = req.body;
    const table = await Table.findById(tableId);
    if (table.status === "free") {
        const order = await Order.create({
            restaurantId: restaurantId,
            tableId: tableId,
            status:"new"
        })
        table.status = "booked"
        const cart = await Cart.create({
            customerId:userId
        })
        order.cartList.push(cart.id);
        await table.save();
        await order.save();
        res.status(200).json({
            cartId: cart._id,
            orderId: order._id,
            message: "Customer added to order successfully."
        })
    }
    else {
        const order = await Order.find({ restaurantId: restaurantId, tableId: tableId })
        if (order) {
            for (const cart of order.cartList) {
                const cartObj = await Cart.findById(cart);
                if (cartObj.customerId==userId) {
                    res.status(200).json({
                        cartId: cartObj._id,
                        orderId: order._id,
                        message: "Customer is already in this order"
                    })
                }
            }
            const cart = await Cart.create({
                customerId:userId
            })
            order.cartList.push(cart.id);
            await order.save();
            res.status(200).json({
                cartId: cart._id,
                orderId: order._id,
                message: "Customer added to order successfully."
            })
        }        
    }
})

module.exports = {
    addToTable
}