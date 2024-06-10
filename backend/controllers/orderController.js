const Order = require("../models/ordersModel");
const Table = require("../models/tableModel");
const Restaurant = require("../models/restuarantsModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const Item = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const addToTable = asyncHandler(async (req, res) => {
    const { restaurantId, tableId } = req.query;
    const { userId } = req.body;
    const table = await Table.findById(tableId);
    if (table.status === "free") {
        const order = await Order.create({
            restaurantId: restaurantId,
            tableId: tableId,
            status: "new"
        })
        table.status = "booked"
        const cart = await Cart.create({
            customerId: userId
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
        const order = await Order.findOne({ restaurantId: restaurantId, tableId: tableId, status: { $ne: 'completed' } })
        if (order && order.cartList.length < table.tableCapacity) {
            for (const cart of order.cartList) {
                const cartObj = await Cart.findById(cart);
                if (cartObj.customerId == userId) {
                    res.status(200).json({
                        cartId: cartObj._id,
                        orderId: order._id,
                        message: "Customer is already in this order"
                    })
                }
            }
            const cart = await Cart.create({
                customerId: userId
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
const placeOrder = asyncHandler(async (req, res) => {
    const { restaurantId, tableId } = req.query;
    const { userId, itemList } = req.body;//itemList should be an array of item ids along with a quantity number.
    //e.g expected itemList in request body
    /*
    [
        {
            item:65by32324qwe12-93,
            quantity:1
        },
        {
            item:234095418res2w4e3,
            quantity:2
        }
    ]
    */
    const order = await Order.findOne({ restaurantId: restaurantId, tableId: tableId, status: { $ne: 'completed' } });
    if (order) {
        for (const cart of order.cartList) {
            const cartObj = await Cart.findById(cart);
            if (cartObj.customerId == userId) {
                for (const item of itemList) {
                    cartObj.itemList.push({ item: item.item, quantity: item.quantity });
                    const itemObj = await Item.findById(item.item);
                    if (itemObj) {
                        cartObj.totalPrice = cartObj.totalPrice + (item.quantity * itemObj.price);
                        order.totalPrice = order.totalPrice + (item.quantity * itemObj.price);
                        await cartObj.save();
                        await order.save();
                    }
                    else {
                        res.status(400).json({
                            message: "Not able to place the order."
                        })
                    }
                }
                res.status(200).json({
                    cartId: cartObj._id,
                    orderId: order._id,
                    message: "Items added to the order."
                })
            }
        }
    }
    else {
        res.status(400).json({
            message: "No order is currently in progress at that table."
        })
    }
})
const viewAllMembers = asyncHandler(async (req, res) => {
    const { restaurantId, tableId } = req.query;
    const order = await Order.findOne({ restaurantId: restaurantId, tableId: tableId, status: { $ne: 'completed' } });

    if (order) {
        const membersList = [];
        for (const cart of order.cartList) {
            const cartObj = await Cart.findById(cart);
            if (cartObj) {
                const user = await User.findById(cartObj.customerId);
                const itemList = [];
                for (const item of cartObj.itemList) {
                    const itemObj = await Item.findById(item.item);
                    itemList.push({
                        name: itemObj.name,
                        price: itemObj.price,
                        quantity: item.quantity,
                        image: itemObj.image
                    });
                }
                membersList.push({
                    user: user.name,
                    itemList: itemList,
                    totalPrice: cartObj.totalPrice,
                    status: cartObj.status,
                    photo: user.photo
                });
            }
        }

        if (membersList.length > 0) {
            res.status(200).json(membersList);
        } else {
            res.status(200).json({
                message: "No members found for the current order."
            });
        }
    } else {
        res.status(200).json({
            message: "No order is currently in progress at that table."
        });
    }
});

const changeStatus = asyncHandler(async (req, res) => {
    const { orderId, status } = req.body;
    const order = await Order.findById(orderId);
    if (order) {
        order.status = status;
        await order.save();
        res.status(201).json({
            message: "status changed successfully "
        })
    }
    else {
        res.status(404).json({ message: "Unable to change status" });
    }
})
const viewCurrentOrdersRestaurant = asyncHandler(async (req, res) => {
    const { restaurantId } = req.query;
    const orders = await Order.find({ restaurantId: restaurantId, status: { $ne: 'completed' } });
    console.log(orders);
    const ordersArray = [];
    if (orders) {
        for (const order of orders) {
            const membersList = [];
            const table = await Table.findById(order.tableId);
            for (const cart of order.cartList) {
                const cartObj = await Cart.findById(cart);
                if (cartObj) {
                    const user = await User.findById(cartObj.customerId);
                    const itemList = [];
                    for (const item of cartObj.itemList) {
                        const itemObj = await Item.findById(item.item);
                        itemList.push({
                            name: itemObj.name,
                            price: itemObj.price,
                            quantity: item.quantity
                        })
                    }
                    membersList.push({
                        user: user.name,
                        itemList: itemList,
                        totalPrice: cartObj.totalPrice,
                        status: cartObj.status
                    })
                }
            }
            ordersArray.push({ table: table.tableNumber, status: order.status, membersList, totalPrice: order.totalPrice });
        }
        res.status(200).json(ordersArray);
    }
    else {
        res.status(400).json({ message: "No order is pending" });
    }
})


const getOrderStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.query;
    const order = await Order.findById(orderId);
    if (order) {
        res.status(200).json({
            status: order.status
        })
    }
    else {
        res.status(404).json({ message: "Order not found" });
    }
})

const PayIndividualBill = asyncHandler(async (req, res) => {
    const { orderId, cartId } = req.query;
    console.log("orderid:", orderId);
    console.log("cartId:", cartId);

    const { paymentMethod } = req.body;
    const order = await Order.findById(orderId);
    console.log("order:", order);
    const cart = await Cart.findById(cartId);
    console.log("cart:", cart);
    if (order && cart) {
        if (cart.paymentDone) {
            res.status(400).json({
                message: "Payment already done."
            })
        }
        else {
            cart.paymentDone = true;
            cart.status = "being_verified";
            cart.paymentMethod = paymentMethod;
            order.totalPaid = order.totalPaid + cart.totalPrice;
            await cart.save();
            await order.save();
            res.status(200).json({
                message: "Payment done successfully."
            })
        }
    }
    else {
        res.status(404).json({
            message: "Order or cart not found."
        })
    }
})
module.exports = {
    addToTable,
    placeOrder,
    viewAllMembers,
    changeStatus,
    viewCurrentOrdersRestaurant,
    getOrderStatus,
    PayIndividualBill
}