const Category = require('../models/category');
const Joi = require('joi');

exports.createCategory = (req, res) => {
    
    (async() => {
        try {

            /**
             * joi validation
             */
             const schema = Joi.object({
                name: Joi.string().required(),
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

            if(req.role === 0){
                return res.status(400).json({message: 'you can not create category. only admin can create'})
            }

            const category = new Category({
                name: req.body.name,
            });

            await category.save();
            return res.status(200).json({ Category: category});
            
        } catch (error) {
            const er = new Error('There is some error')
            return res.status(400).json({ message: er.message });
        }
    })();
};