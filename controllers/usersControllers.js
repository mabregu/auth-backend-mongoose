const User = require('../models/userModel');
const usersControllers = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User
                .find()
                .select('-password -__v')
                .sort({ createdAt: -1 });
            ;
            res.json(users);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.json(user);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}

module.exports = usersControllers;