const User = require("../models/user");

exports.getUser = async (request, response) => {
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

exports.postUser = async (request, response) => {
    try {
        const { firstName, lastName, email, dateBirth, phoneNumber, password } = request.body;

        if (!firstName) {
            return response.status(400).json({
                message: "Please, enter with your full name!",
                type: "error",
            });
        }
        const newUser = new User({ firstName, lastName, email, dateBirth, phoneNumber, password })
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

exports.postUserByLogin = async (request, response) => {
    try {
        const { email, password } = request.body;
        console.log(email);
        console.log(password);
        const user = await User.findOne({ where: { email: email } });
        console.log(user);
        if (!user) {
            return response.status(400).json({
                message: "User does not exist!",
                type: "error"
            });
        }

        if (password !== user.password) {
            return response.status(400).json({
                message: "Incorrect Password",
                type: "error",
            });
        }
        return response.status(200).json({
            message: "Login Successfully!",
            type: "success",
            id: user.id,
        })

    } catch (error) {
        response.json(error);
        response.status(500).json({
            message: "Signin Failed!",
            type: "error",
        });
    }
};