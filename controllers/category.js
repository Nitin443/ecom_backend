const Category = require('../models/category');
const Joi = require('joi');
const {isNull} = require('lodash');

exports.createCategory = (req, res) => {

    (async () => {
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

            if (req.role === 0) {
                return res.status(400).json({ message: 'you can not create category. only admin can create' })
            }

            const category = new Category({
                name: req.body.name,
            });

            await category.save();
            return res.status(200).json({ Category: category });

        } catch (error) {
            const er = new Error('There is some error')
            return res.status(400).json({ message: er.message });
        }
    })();
};

exports.getCategoryById = (req, res) => {

    (async () => {
        try {
            /**
            * joi validation
            */
            const schema = Joi.object({
                categoryId: Joi.string().required(),
            });

            // schema options
            const options = {
                abortEarly: false, // include all errors
                allowUnknown: true, // ignore unknown props
            };

            const { error, value } = schema.validate(req.params, options);

            if (error) {
                return res.status(400).json({ errorMessage: error.details });
            }

            if (req.role === 0) {
                return res.status(400).json({ message: 'you can not get category. only admin can get ' })
            }

            const categoryId = req.params.categoryId;

            const getCategory = await Category.findById(categoryId);

            if (isNull(getCategory)) {
                return res.status(422).json({ message: 'Product with given id is not exit.' });
            }

            return res.status(200).json({ Category: getCategory });

        } catch (error) {
            const er = new Error('There is some error')
            return res.status(400).json({ message: er.message });
        }
    })();

}

exports.getCategory = (req, res) => {
    (async () => {
        try {

            if (req.role === 0) {
                return res.status(400).json({ errorMessage: 'you can not get category. only admin can get ' })
            }

            const category = await Category.find();
            return res.status(200).json({ Category: category });


        } catch (error) {
            const er = new Error('There is some error')
            return res.status(400).json({ errorMessage: er.message });
        }
    })();
}


exports.updateCategory = (req, res) =>{
    (async() => {
        try {
          /**
            * joi validation
            */
           const schema = Joi.object({
            categoryId: Joi.string().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
        };

        const { error, value } = schema.validate(req.params, options);

        if (error) {
            return res.status(400).json({ errorMessage: error.details });
        }

        if (req.role === 0) {
            return res.status(400).json({ message: 'you can not update Category. only admin can update'})
        }

         
        const categoryId = req.params.categoryId;

        const updateContent = req.body;
                let opts = {
                    runValidators: true,
                    setDefaultsOnInsert: true,
                    upsert: false,
                    context: 'query'
                };

        const updateCategory = await Category.findByIdAndUpdate(categoryId, updateContent, opts);
         
        if(isNull(updateCategory)){
            return res.status(422).json({ message: 'Product with given id is not exit.'});
        }
          
        return res.status(200).json({ UpdateCategory: updateCategory, message: 'update Category sucessfully'});
            
        } catch (error) {
          const er = new Error('There is some error')
          return res.status(400).json({ message: er.message });
        }
    })();

}


exports.deleteCategory = (req, res) => {
    (async() => {
        try {
          /**
            * joi validation
            */
           const schema = Joi.object({
            categoryId: Joi.string().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
        };

        const { error, value } = schema.validate(req.params, options);

        if (error) {
            return res.status(400).json({ errorMessage: error.details });
        }

        if (req.role === 0) {
            return res.status(400).json({ message: 'you can not delete Category. only admin can delete'})
        }
         
        const categoryId = req.params.categoryId;

        const deleteCategory = await Category.findById(categoryId);

        if(isNull(deleteCategory)){
            return res.status(422).json({ message: 'Category with given id is not exit.'});
        }

        await deleteCategory.deleteOne();
        return res.status(200).json({ DeleteCategory: deleteCategory, message: 'Delete Category sucessfully'});
            
        } catch (error) {
          const er = new Error('There is some error')
          return res.status(400).json({ message: er.message });
        }
    })();   
  }









