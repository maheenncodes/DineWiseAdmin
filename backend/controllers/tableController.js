const Table = require("../models/tableModel");
const asyncHandler = require("express-async-handler");

const generateQRCode = asyncHandler(async ({ tableId }) => {
    try {
        console.log("!!!",tableId)
        const qrData = `http:zameen.com/new-projects?table_id=${tableId}`;//To be changed with actual URL
        const qrCodeImage = await qrcode.toDataURL(qrData);
        return qrCodeImage;
    }
    catch (error) {
        throw new Error('Error generating QR code');
    }
})
const addTable = asyncHandler(async (req,res) => {
    const {tableNumber,capacity} = req.body
    const status = "free"
    const table = await Table.create({
        tableNumber,
        capacity,
        status
    })
    if (table) {
        const qrCode = await generateQRCode(table._id);
        table.qrCode = qrCode;
        await table.save();
        res.status(201).json({ 
            message:"Table added successfully "
        })
    }
    else {
        res.status(400)
        throw new Error("Error while adding a new table")
    }
});
const getTableStatus = asyncHandler(async (req, res) => {
    const { tableId } = req.body;
    const table = await Table.findById(tableId);
    if (table) {
        res.status(200).json({
            status: table.status
        });
    } else {
        res.status(404);
        throw new Error("Table not found");
    }
});

const getQRCode = asyncHandler(async (req, res) => {
    const { tableId } = req.body;
    const table = await Table.findById(tableId);
    if (table && table.qrCode) {
        const qrCodeBuffer = Buffer.from(table.qrCode.split(",")[1], 'base64');
        res.set('Content-Type', 'image/png');
        res.send(qrCodeBuffer);   
    }
    else {
        res.status(404);
        throw new Error("Code not found");
    }
});
const changeStatus = asyncHandler(async (req, res) => {
    const { tableId, status } = req.body;
    const table = await Table.findById(tableId);
    if (table) {
        table.status = status;
        await table.save();
        res.status(201).json({ 
            message:"status changed successfully "
        })
    }
    else {
        res.status(404);
        throw new Error("Unable to change status");
    }
})
const editTable = asyncHandler(async (req, res) => {
    const { tableId, tableNumber, tableCapacity, status } = req.body;
    const table = await Table.findById(tableId);
    if (table) {
        table.status = status;
        table.tableNumber = tableNumber;
        table.tableCapacity = tableCapacity;
        await table.save();
        res.status(201).json({ 
            message:"status changed successfully "
        })
    }
    else {
        res.status(404);
        throw new Error("Unable to change status");
    }
})
const deleteTable = asyncHandler(async (req, res) => {
    const { tableId } = req.body;
    const table = await Table.findByIdAndDelete(tableId);
    if (table) {
        res.status(200).json({
            success: true,
            message: 'Table deleted successfully',
            data: table
        });
    }
    else {
        res.status(404);
        throw new Error('Table not found');
    }
})
const viewTable = asyncHandler(async (req, res) => {
    const { tableId } = req.body;
    const table = await Table.findById(tableId);
    if (table) {
        res.status(200).json({
            table:table
        });
    } else {
        res.status(404);
        throw new Error("Table not found");
    }
});

module.exports = {
    addTable,
    getTableStatus,
    getQRCode,
    changeStatus,
    viewTable,
    editTable,
    deleteTable
}