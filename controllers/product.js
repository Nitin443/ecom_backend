const Product = require('../models/product');
const Joi = require('joi');
const { isNull } = require('lodash');

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
                return res.status(400).json({ errorMessage: 'you can not create Product. only admin can create' })
            }

            if (!req.file) {
                return res.status(422).json({ errorMessage: 'Image not uploaded. Try again !' });
            }


            // 1mb = 1000000  // 1kb = 1000
            if (!req.file.size > 2000000) {
                return res.status(422).json({ errorMessage: 'Image size large than 2MB upload less mb image.' });
            }

            const product = new Product({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.category,
                imgUrl: req.file.path,
                shippy: req.body.shippy     
            });

            await product.save();
            return res.status(200).json({ Product: product });

        } catch (error) {
            return res.status(400).json({ errorMessage: error });
        }
    })();
}


exports.getProduct = (req, res) => {
    (async () => {
        try {

            const products = await Product.find();
            return res.status(200).json({ Products: products });


        } catch (error) {
            const er = new Error('There is some error')
            return res.status(400).json({ message: er.message });
        }
    })();
}


exports.getProductById = (req, res) => {

    (async () => {
        try {
            /**
            * joi validation
            */
            const schema = Joi.object({
                productId: Joi.string().required(),
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

            const productId = req.params.productId;

            const getProduct = await Product.findById(productId);

            if (isNull(getProduct)) {
                return res.status(422).json({ message: 'Product with given id is not exit.' });
            }

            return res.status(200).json({ Product: getProduct });

        } catch (error) {
            const er = new Error('There is some error')
            return res.status(400).json({ message: er.message });
        }
    })();

}


exports.updateProduct = (req, res) => {
    (async () => {
        try {
            /**
              * joi validation
              */
            const schema = Joi.object({
                productId: Joi.string().required(),
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
                return res.status(400).json({ message: 'you can not update Product. only admin can update' })
            }


            const productId = req.params.productId;

            const updateContent = req.body;
            let opts = {
                runValidators: true,
                setDefaultsOnInsert: true,
                upsert: true,
                context: 'query'
            };
            let imgUrl = req.body.image;

            if (req.file) {
                imgUrl = req.file.path;
            }

            if (!imgUrl) {
                return res.status(422).json({ message: 'Image not uploaded' })
            }


            const updateProduct = await Product.findByIdAndUpdate(productId, updateContent, opts);

            if (isNull(updateProduct)) {
                return res.status(422).json({ message: 'Product with given id is not exit.' });
            }

            return res.status(200).json({ UpdateProduct: updateProduct, message: 'update product sucessfully' });

        } catch (error) {
            const er = new Error('There is some error')
            return res.status(400).json({ message: er.message });
        }
    })();
}


exports.deleteProduct = (req, res) => {
    (async () => {
        try {
            /**
              * joi validation
              */
            const schema = Joi.object({
                productId: Joi.string().required(),
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
                return res.status(400).json({ message: 'you can not delete Product. only admin can delete' })
            }

            const productId = req.params.productId;

            const deleteProduct = await Product.findById(productId);

            if (isNull(deleteProduct)) {
                return res.status(422).json({ message: 'Product with given id is not exit.' });
            }

            await deleteProduct.deleteOne();
            return res.status(200).json({ DeleteProduct: deleteProduct, message: 'Delete product sucessfully' });

        } catch (error) {
            const er = new Error('There is some error')
            return res.status(400).json({ message: er.message });
        }
    })();
}


// fetch product by query [based on sell/ arrival(new product that added recently)]
//  by sell = /product?sortBy=sold&order=desc&limit=4
//  by arrival = /product?sortBy=createdAt&order=desc&limit=4

exports.getList = (req, res) => {
    (async () => {

        try {

            let order = req.query.order ? req.query.order : "asc";
            let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
            let limit = req.query.limit ? parseInt(req.query.limit) : 5;

            const productList = await Product.find().sort([[sortBy, order]]).limit(limit);

            return res.status(200).json({ ProductList: productList });

        } catch (error) {
            const er = new Error('There is some error')
            return res.status(400).json({ errorMessage: er.message });
        }
    })();
}


// get product list based on product related category

exports.getRelatedCategoryProduct = (req, res) => {
    (async() => {



        try {
            /**
              * joi validation
              */
            const schema = Joi.object({
                productId: Joi.string().required(),
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

            let limit = req.query.limit ? parseInt(req.query.limit) : 5;
            const productId = req.params.productId;

            const product = await Product.findById(productId);
            const proCategory = product.category;

            const relatedProList = await Product.find({category: proCategory}).limit(limit);

            res.status(200).json({list: relatedProList});
         
     } catch (error) {
        const er = new Error('There is some error')
        return res.status(400).json({ message: er.message });
     }


    })();

}


exports.searchProduct = (req, res) => {
    (async() => {

    try {
            let order = req.body.order ? req.body.order : "desc";
            let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
            let limit = req.body.limit ? parseInt(req.body.limit) : 5;
            let skip = parseInt(req.body.skip);

            let searchFields = {};

            for (let key in req.body.filters) {
                        if (req.body.filters[key].length > 0) {
                            if (key === "price") {
                                // gte -  greater than price [0-10]
                                // lte - less than
                                searchFields[key] = {
                                    $gte: req.body.filters[key][0],
                                    $lte: req.body.filters[key][1]
                                };
                            } else {
                                searchFields[key] = req.body.filters[key];
                            }
                        }
                    }
            
        const searchPro = await Product.find({searchFields}).sort([[sortBy, order]]).skip(skip).limit(limit);

        res.status(200).json({SearchProduct: searchPro});
        
    } catch (error) {
        const er = new Error('There is some error')
        return res.status(400).json({ errorMessage: er.message });
    }



    })();
}

