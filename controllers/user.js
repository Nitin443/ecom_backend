const User = require('../models/user');

exports.signup = (req, res) => {


    async () => {

        try {

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                about: req.body.about,
                role: req.body.role
            });

            await user.save();
            return res.json({ user });;

        } catch (error) {
            return res.status(400).json({
                err
            });
        }

    };

};