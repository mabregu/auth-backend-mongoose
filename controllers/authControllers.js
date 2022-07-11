const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
require('dotenv').config();

const secret = process.env.SECRET || 'secret';

const authControllers = {
    register: (req, res) => {
        console.log(req.body);
        bcrypt
            .hash(req.body.password, 10)
            .then(hash => {
                let user = new User({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    birthDate: req.body.birthDate,
                    password: hash
                });
                
                user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User created',
                            result: result
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    })
                ;
            })
            .catch(err => {
                res.json({ message: 'Something went wrong' });
            })
        ;
    },
    login: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user.email,
                            userId: user._id
                        },
                            secret,
                            { expiresIn: '1h' }
                        );
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token
                        });
                    }
                    res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                );
            }).catch(err => {
                res.status(500).json({
                    error: err
                });
            }
            );
    }
}

module.exports = authControllers;