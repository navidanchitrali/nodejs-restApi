const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    registerUser: async (req, res) => {
        const userModel = new UserModel(req.body);
        userModel.password = await bcrypt.hash(req.body.password, 10);
        try {
            const response = await userModel.save();
            response.password = undefined;
            return res.status(201).json({ message: 'success', data: response });

        } catch (err) {
            res.status(500).json({ message: 'error', err });
        }

    },
    loginUser: async (req, res) => {
        try {
            const user = await UserModel.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).
                    json({ message: 'Auth failed : Inavliad UserName/ Password' });
            }
            const isPasswordEqual = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordEqual) {
                return res.status(401).
                    json({ message: 'Auth failed : Inavliad UserName/ Password' });
            }
            const tokeObject = {
                _id: user._id,
                fullname: user.fullname,
                email: user.email
            }
            const jwtToken = jwt.sign(tokeObject, process.env.SECRET, { expiresIn: '4h' });

            return res.status(200)
                .json({ jwtToken, tokeObject });


        } catch (err) {
            return res.status(500).json({ message: 'error ', err });
        }
     },

     getUsers:async(req, res)=>{
        try{
            const users=UserModel.find({});
            return res.status(200).json({data:users});

        }catch (err) {
            return res.status(500).json({ message: 'erroryyyee ', err });
        }

     }
     
}