const mongoose = require("mongoose");
const tableSchema = mongoose.Schema({
    tableNumber: {
        type: Number,
        required: [true, "Table Number is necessary"]
    },
    tableCapacity: {
        type: Number,
        required: [true, "Table Capacity is necessary"]
    },
    qrCode: {
        type: String,
        required:[true, "Table needs to have a QR Code"]
    },
    status: {
        type: String,
        enum:["booked","free"]
    }
}, {timeStamps: true})

const Table = mongoose.model("Restuarant",tableSchema)
module.exports = Table