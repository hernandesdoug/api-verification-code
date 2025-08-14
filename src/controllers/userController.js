const User = require("../models/user");

exports.getUser = async(request, response) => {
    try {
        const result = await User.findAll();
        response.json(result);
    } catch (error) {
        response.json(error);
        response.status(500).json({
        message: "Error retrieving users!",
        type: "error",
        });
    }     
};

exports.postUser = async(request, response) => {
    try {
        const {firstName, lastName, email, dateBirth, phoneNumber, password} = request.body;
        
        if (!firstName){
            return response.status(400).json({
                message: "Please, enter with your full name!",
                type: "error",
            });
        }
        const newUser = new User({firstName, lastName, email, dateBirth, phoneNumber, password})
        await newUser.save();
        response.status(201).json({
            message: "User created successfully",
            type: "success",
            id: newUser.id,
        })
    } catch (error) {
        response.json(error);
        response.status(500).json({
            message: "Sign Up Failed!",
            type: "error",
        });
    }
};

