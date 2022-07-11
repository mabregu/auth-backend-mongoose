const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const usersControllers = {
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
        res.send("Login");
    }
}

module.exports = usersControllers;