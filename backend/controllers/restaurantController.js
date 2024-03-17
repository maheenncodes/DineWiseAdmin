const fs = require('fs');
const path = require('path');
const Restaurant = require("../models/restuarantsModel");
const Category = require("../models/categoryModel");
const Item = require("../models/productModel");
const { addTable, editTable } = require("../controllers/tableController");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Table = require("../models/tableModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const registerRestaurant = asyncHandler(async (req, res) => {
    const { name, phoneNo, description, openingTime, closingTime, admin } = req.body;
    const adminExists = await Restaurant.findOne({ admin: admin });
    if (adminExists) {
        res.status(400).json({ message:"Admin already has a Restaurant"})
    }
    else {
        if (req.file && !adminExists) {
            let uploadedFile;
            try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "DineWise",
                resource_type: "image",
            });
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error.message);
                res.status(500).json({ message: "Image could not be uploaded" });
            }
            const restaurant = await Restaurant.create({
                name,
                phoneNo,
                description,
                logo:uploadedFile.secure_url,
                openingTime,
                closingTime,
                admin
            })
            if (restaurant) {
                res.status(201).json({
                    message: "Restaurant added successfully "
                })
            }
            else {
                res.status(400).json({message: "Error while adding a new Restaurant"})
            }
        }
        else {
            res.status(400).json({message: "Error while adding a new Restaurant"})
        }
    }
})
const viewRestaurantDetails = asyncHandler(async (req, res) => {
    const { restaurantId } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
        res.status(200).json({
            restaurant
        });
    } else {
        res.status(404).json({ message:"Restaurant not found"});
    }
})
const addMenuItem = asyncHandler(async (req, res) => {
    const
    {
        categoryId,
        restaurantId,
        isNewCategory,
        categoryName,
        itemName,
        itemDescription,
        itemIngredients,
        itemPrice,
        itemQuantity,
        isPopular } = req.body;
    
    var imageUrl=null;
    if (req.file) {
        try {
            const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
                folder: "DineWise",
                resource_type: "image",
            });
            imageUrl = uploadedImage.secure_url;
        } catch (error) {
            res.status(500).json({ message:'Image could not be uploaded'});
        }
    }
    if (isNewCategory==='true') {
        const restaurant = await Restaurant.findById(restaurantId);
        if (restaurant) {
            const category = await Category.create({
                title: categoryName
            })
            if (category) {
                restaurant.menu.push(category._id);
                const newItem = await Item.create({
                    name: itemName,
                    description: itemDescription,
                    ingredients: itemIngredients,
                    price: itemPrice,
                    image:imageUrl,
                    quantity: itemQuantity,
                    isPopular:isPopular
                })
                if (newItem) {
                    if (!category.itemList) {
                        category.itemList = [];
                    }
                    category.itemList.push(newItem._id);
                    await category.save();
                    await restaurant.save();
                    res.status(200).json({
                        message: 'Item added to category successfully',
                        item: newItem
                    });
                }
                else {
                    res.status(400).json({ message: "Error while adding a new Category" })    
                }
            }
            else {
                res.status(400).json({ message: "Error while adding a new Category" })
            }
        }
        else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    }
    else {
        const restaurant = await Restaurant.findById(restaurantId);
        if (restaurant) {
            const categoryBool = restaurant.menu.find(menuItem => menuItem.equals(categoryId));
            if (categoryBool) {
                const category = await Category.findById(categoryId);
                const newItem = await Item.create({
                    name: itemName,
                    description: itemDescription,
                    ingredients: itemIngredients,
                    price: itemPrice,
                    image:imageUrl,
                    quantity: itemQuantity,
                    isPopular:isPopular
                })
                if (!category.itemList) {
                    category.itemList = [];
                }
                category.itemList.push(newItem._id);
                await category.save();
                await restaurant.save();
                res.status(200).json({
                    message: 'Item added to category successfully',
                    item: newItem
                });
            }
            else {
                res.status(404).json({message:"Category not found"})
            }
        }
        else {
            res.status(404).json({message:"Restaurant not found"})
        }
    }
})

const updateMenuItem = asyncHandler(async (req, res) => {
     const
    {
        categoryId,
        restaurantId,
        itemId,
        itemName,
        itemDescription,
        itemIngredients,
        itemPrice,
        itemQuantity,
        isPopular } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        res.status(404).json({ message: 'Restaurant not found' });
    }
    const category = restaurant.menu.find(menuItem => menuItem.equals(categoryId));
    if (!category) {
        res.status(404).json({ message: 'Category not found in the restaurant' });
    }
    const item = await Item.findById(itemId);
    if (!item) {
        res.status(404);
        throw new Error('Item not found in the category');
    }
    itemName && (item.name = itemName);
    itemDescription && (item.description = itemDescription);
    itemIngredients && (item.ingredients = itemIngredients);
    itemPrice && (item.price = itemPrice);
    itemQuantity && (item.quantity = itemQuantity);
    isPopular && (item.isPopular = isPopular);
    
    var imageUrl=null;
    if (req.file) {
        try {
            const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
                folder: "DineWise",
                resource_type: "image",
            });
            imageUrl = uploadedImage.secure_url;
            item.image = imageUrl;
        } catch (error) {
            res.status(500).json({ message:'Image could not be uploaded'});
        }
    }
    await item.save();
    res.status(200).json({
        message: 'Item updated successfully',
        item
    });
});

const deleteMenuItem = asyncHandler(async (req, res) => {
    const { restaurantId, categoryId, itemId } = req.query;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        res.status(404).json({ message: 'Restaurant not found' });
    }

    const categoryIndex = restaurant.menu.findIndex(menuItem => menuItem.equals(categoryId));

    if (categoryIndex === -1) {
        res.status(404).json({ message: 'Category not found in the restaurant' });
    }

    const category = await Category.findById(categoryId);

    const itemIndex = category.itemList.findIndex(item => item.equals(itemId));

    if (itemIndex === -1) {
        res.status(404).json({ message: 'Item not found in the category' });
    }

    category.itemList.splice(itemIndex, 1);
    
    await Item.findByIdAndDelete(itemId);
    await category.save();
    if (category.itemList.length === 0) {
        restaurant.menu.splice(categoryIndex, 1);
        await Category.findByIdAndDelete(categoryId);
    }
    await restaurant.save();

    res.status(200).json({
        message: 'Item deleted successfully'
    });
});

const viewAllCategories = asyncHandler(async (req, res) => {
    const { restaurantId } = req.query;
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
        const categoryList = [];
        for (const menuItem of restaurant.menu) {
            const categoryId = menuItem.toString();
            if (!categoryList.some(cat => cat.id === categoryId)) {
                const category = await Category.findById(menuItem);
                if (category) {
                    categoryList.push({
                        id: category._id,
                        title: category.title,
                    });
                }
            }
        }
        res.status(200).json(categoryList);   
    }
    else {
        res.status(404).json({ message: 'Restaurant not found' });
    }
})
const viewMenuDetails = asyncHandler(async (req, res) => {
    const { restaurantId } = req.query;
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
        const menuDetails = [];
        for (const menuItem of restaurant.menu) {
            const category = await Category.findById(menuItem);
            if (category) {
                const title = category.title;
                const itemList = [];
                for (const catItem of category.itemList) {
                    const item = await Item.findById(catItem);
                    itemList.push(item);
                }
                menuDetails.push({
                    _id: category._id,
                    categoryTitle: title,
                    itemList:itemList
                })
            }
            else {
                res.status(404).json({message:"Category is not correct"});
            }
        }
        if (menuDetails.length > 0) {
            res.status(200).json(menuDetails);
        }
        else {
            res.status(200).json([]);
        }
    }
    else {
        res.status(404).json({ message: 'Restaurant not found' });
    }
})
const addRestaurantTable = asyncHandler(async (req, res) => {
    const { restaurantId } = req.query;
    const { tableNumber, capacity } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
 
    if (restaurant) {
        if (!restaurant.table) {
            restaurant.table = [];
        }
        const table = await addTable({ tableNumber, capacity });
        restaurant.tables.push(table._id);
        restaurant.save();
        res.status(200).json({message:"Table saved successfully"})
    }
    else {
        res.status(404).json({ message: 'Restaurant not found' });
    }
})
const editRestaurantTable = asyncHandler(async (req, res) => {
    const { restaurantId } = req.query;
    const { tableId, tableNumber, capacity, status } = req.body;
    const restaurant = await Restaurant.findById(restaurantId); 
    if (restaurant) {
        const table = await editTable({ tableId, tableNumber, tableCapacity:capacity, status });
        if (table) {
            res.status(200).json({message:"Table edited successfully"})   
        }
    }
    else {
        res.status(404).json({ message: 'Restaurant not found' });
    }
})
const deleteTable = asyncHandler(async (req, res) => {
    const { restaurantId, tableId } = req.query;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        res.status(404).json({ message: 'Restaurant not found' });
    }
    const tableIndex = restaurant.tables.findIndex(table => table.equals(tableId));

    if (tableIndex === -1) {
        res.status(404).json({ message: 'Table not found in the restaurant' });
    }

    restaurant.tables.splice(tableIndex, 1);
    
    await Table.findByIdAndDelete(tableId);
    await restaurant.save();
    res.status(200).json({message:"Table deleted successfully"})
})
const viewAllTables = asyncHandler(async (req, res) => {
    const { restaurantId } = req.query;
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
        const tableDetails = [];
        for (const tbl of restaurant.tables) {
            const table = await Table.findById(tbl);
            if (table) {
                tableDetails.push({
                    _id: table._id,
                    tableNumber: table.tableNumber,
                    capacity: table.capacity,
                    status: table.status,
                })
            }
            else {
                res.status(404).json({message: "Table Id is not correct"});
            }
        }
        if (tableDetails.length > 0) {
            res.status(200).json(tableDetails);
        }
        else {
            res.status(200).json([]);
        }
    }
    else {
        res.status(404).json({ message: 'Restaurant not found' });
    }
})
const getQRCode = asyncHandler(async (req, res) => {
    const { restaurantId, tableId } = req.query;
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
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
    }
    else {
        res.status(404).json({ message: 'Restaurant not found' });
    }
});
const addRestaurantStaff = asyncHandler(async (req, res) => {
    const { restaurantId, userId } = req.query;
    const restaurant = await Restaurant.findById(restaurantId);
 
    if (restaurant) {
        if (!restaurant.staff) {
            restaurant.staff = [];
        }
        restaurant.staff.push(userId);
        restaurant.save();
        res.status(200).json({message:"Staff saved successfully"})
    }
    else {
        res.status(404).json({ message: 'Restaurant not found' });
    }
})
const viewStaff = asyncHandler(async (req, res) => {
    const { restaurantId } = req.query;
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
        const staffDetails = [];
        for (const member of restaurant.staff) {
            const staff = await User.findById(member);
            if (staff) {
                staffDetails.push({
                    _id: staff._id,
                    name: staff.name,
                    email: staff.email
                })
            }
            else {
                res.status(404).json({message: "User Id is not correct"});
            }
        }
        if (staffDetails.length > 0) {
            res.status(200).json(staffDetails);
        }
        else {
            res.status(200).json([]);
        }
    }
    else {
        res.status(404).json({ message: 'Restaurant not found' });
    }
})
const editStaff = asyncHandler(async(req, res) => {
    const { restaurantId, staffId } = req.query;
    const { name, email } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
        const memberIndex = restaurant.staff.findIndex(member => member.equals(staffId));
        if (memberIndex !== -1) {
            const staff = await User.findById(staffId);
            name && (staff.name = name)
            email && (staff.email = email)
            staff.save()
            res.status(200).json({message:"Staff updated successfully"})
        }
        else {
            res.status(404).json({message:"Staff not found"})            
        }
    }
    else {
        res.status(404).json({ message: 'Restaurant not found' });
    }
})
const deleteStaff = asyncHandler(async (req, res) => {
    const { restaurantId, staffId } = req.query;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        res.status(404).json({ message: 'Restaurant not found' });
    }

    const memberIndex = restaurant.staff.findIndex(member => member.equals(staffId));

    if (memberIndex === -1) {
        res.status(404).json({ message: 'Member not found in the restaurant' });
    }

    restaurant.staff.splice(memberIndex, 1);
    
    await User.findByIdAndDelete(staffId);
    await restaurant.save();
    res.status(200).json({message:"Staff deleted successfully"})
})
module.exports={
    registerRestaurant,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    viewAllCategories,
    viewRestaurantDetails,
    viewMenuDetails,
    addRestaurantStaff,
    viewStaff,
    editStaff,
    deleteStaff,
    addRestaurantTable,
    deleteTable,
    viewAllTables,
    editRestaurantTable,
    getQRCode,
}