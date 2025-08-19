const User = require("../models/user");
const nodemailer = require("nodemailer");


const transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD
    }
});

exports.getUser = async (request, response) => {
    try {
        const result = await User.findAll();
        return response.json(result);
    } catch (error) {
        return response.status(500).json({
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
                message: "Please, enter with your first name!",
                type: "error",
            });
        }
        let verificationCode = "";
        for (let i = 0; i < 4; i++){
            verificationCode += Math.floor(Math.random()*9);
        }
        const newUser = new User({ firstName, lastName, email, dateBirth, phoneNumber, password, verificationCode })
        await newUser.save();
        try {
            await transport.sendMail({
                from: "devcontateste@outlook.com",
                to: email,
                subject: "Verification Code",
                text: `Hello, here your verification code ${verificationCode}`
            }); 
            if(!error){
                return response.status(200).json({
                    message: "Email sent",
                    type: "sucess",
                })
            } 
        } catch (error) {
            return response.status(500).json({
                message: "Email Sent Failed!",
                type: "error",
            })
        }
        
        return response.status(201).json({
            message: "User created successfully",
            type: "success",
            id: newUser.id,
        })
    } catch (error) {
        return response.status(500).json({
            message: "Sign Up Failed!",
            type: "error",
        });
    }
};

exports.postUserByLogin = async(request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ where: { email: email } });

        if(!email){
            return response.status(400).json({
                message: "Invalid email",
                type: "error",
            });
        }

        if (!password) {
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
        return response.status(500).json({
            message: "Sign In Failed!",
            type: "error",
        });
    }
};

exports.getUserById = async (request, response) => {
    try {
        const id = request.params.id;
        const result = await User.findOne({
            where: { id }
        });
        return response.json(result);
    } catch (error) {
        return response.status(500).json({
            message: "Recover Id Failed!",
            type: "error",
        });
    }
};

exports.updateUser = async (request, response) => {
    try {
        const id = request.params.id;
        const body = request.body;
        const result = await User.update(body, {
            where: { id }
        });
        return response.json(result);
    } catch (error) {
        return response.status(500).json({
            message: "Update Failed!",
            type: "error",
        });
    }
};

exports.deleteUser = async (request, response) => {
    try {
        const id = request.params.id;
        const result = await User.destroy({
            where: { id }
        });
       
        return response.status(201).json({
            message: "User deleted successfully",
            type: "success"
        })
    } catch (error) {
        return response.status(500).json({
            message: "Delete Failed!",
            type: "error",
        });
    }
};

exports.verifyCode = async (resquest, response) => {
    try {
        const {id, code } = request.body;
        const result = await User.findOne({
            where: { id }
        });
        console.log(result);
        response.status(201).json({
            message: "Code verified successfully",
            type: "success"
        })
    } catch (error) {
        response.status(500).json({
            message: "Code verification Failed!",
            type: "error",
        });
    }
}
