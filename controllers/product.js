const Product = require('../models/product');
const Joi = require('joi');

exports.createProduct = (req, res) => {
    (async () => {

        try {

            /**
            * joi validation
            */
            const schema = Joi.object({
                name: Joi.string().required(),
                description: Joi.string().required(),
                price: Joi.number().required(),
                category: Joi.string().required(),
                quantity: Joi.number().required(),
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

            if (req.role === 0) {
                return res.status(400).json({ message: 'you can not create Product. only admin can create' })
            }

            if(!req.file){
                return res.status(422).json({ message: 'Image not uploaded. Try again !' });
            }

            const product = new Product({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.category,
                imgUrl: req.file.path       // shippy remain
            });

            await product.save();
            return res.status(200).json({ Product: product});

        } catch (error) {
            const er = new Error('There is some error')
            return res.status(400).json({ message: er.message });
        }
    })();
}
