const User = require('../models/auth');
const Joi = require('joi');
const jwt = require('jsonwebtoken');  // to generate token
const { isNull } = require('lodash');

const bcrypt = require('bcrypt');
const saltRound = 10;

// sign up controller
exports.signup = (req, res, next) => {
    (async () => {

        try {
            /**
            * joi validation
            */
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
              //  about: Joi.string().required()
            });

            // schema options
            const options = {
                abortEarly: false, // include all errors
                allowUnknown: true, // ignore unknown props
            };

            const { error, value } = schema.validate(req.body, options);

            if (error) {
                return res.status(400).json({ errorMessage: error.details });
            }

            const hashPassword = await bcrypt.hash(req.body.password, saltRound);
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
                about: req.body.about,
                role: req.body.role,
            });

            await user.save();
            const token = jwt.sign({ email: user.email, userRole: user.role, userId: user._id.toString(), }, process.env.JWT_SECRET, { expiresIn: '48h' });
            return res.status(200).json({
                token: token,
                userId: user._id.toString(),
                createdAt: user.createdAt,
                Name: user.name,
                role: user.role,
                expiresIn: 3600 * 48,
            });

        } catch (error) {
            const er = new Error('There is some error')
            return res.status(400).json({ message: er.message });
        }
    })();
};

// login controller
exports.login = (req, res) => {
    (async () => {
        try {
            /**
             * joi validation
             */
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            });

            // schema options
            const options = {
                abortEarly: false, // include all errors
                allowUnknown: true, // ignore unknown props
            };

            const { error, value } = schema.validate(req.body, options);

            if (error) {
                return res.status(400).json({ errorMessage: error.details });
            }

            const email = req.body.email;
            const password = req.body.password;

            const user = await User.findOne({ email: email });

            // if user not found
            if (isNull(user)) {
                const error = new Error('User not found with this email')
                return res.status(400).json({ message: error });
            } else {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response === true) {
                        // if user found then generate token
                        const token = jwt.sign({ email: user.email, userRole: user.role, userId: user._id.toString(), }, process.env.JWT_SECRET, { expiresIn: '48h' });

                        res.status(200).json({
                            token: token,
                            userId: user._id.toString(),
                            createdAt: user.createdAt,
                            Name: user.name,
                            role: user.role,
                            expiresIn: 3600 * 48,
                        });
                    }
                });
            }

        } catch (error) {
            const er = new Error('There is some error')
            return res.status(400).json({ message: er.message });
        }
    })();
};


// logout controller

exports.logout = (req, res) => {
    (async () => {
        try {
            const token = jwt.sign({ userId: 'logout' }, process.env.JWT_SECRET, { expiresIn: '1s' });
            res.status(200).json({ token: token, message: 'log out sucessfully' });

        } catch (error) {
            return res.status(400).json({ message: 'try again' });
        }
    })();
};



exports.userDeatails = (req, res) => {
    (async () => {
        try {

            const userId = req.userId;

            const user = await User.findById(userId);

            if (isNull(user)) {
                const er = new Error('User not found.. try again')
                return res.status(400).json({ message: er.message });
            }

            res.status(200).json({ UserDetails: user });

        } catch (error) {
            const er = new Error('There is some error')
            return res.status(400).json({ message: er.message });
        }
    })();
}

exports.updateUserDeatails = (req, res) => {
    (async () => {
        try {

            const userId = req.userId;

            const updateContent = req.body;
            let opts = {
                runValidators: true,
                setDefaultsOnInsert: true,
                upsert: true,
                context: 'query'
            };

            const updateUser = await User.findByIdAndUpdate(userId, updateContent, opts);
          
            res.status(200).json({ UpdateUserDetails: updateUser });


        } catch (error) {
            const er = new Error('There is some error')
            return res.status(400).json({ message: er.message });
        }
    })()
}