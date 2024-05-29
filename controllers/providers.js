const providersRouter = require('express').Router();
const Provider = require('../models/provider');
const Joi = require('joi');

// Define validation schema for provider data
const providerSchema = Joi.object({
    displayName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    address: Joi.string().required(),
    gender: Joi.string().required(),
    age: Joi.required(),
    education: Joi.string().required(),
    businessName: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    experience: Joi.required()
});

providersRouter.post('/', async (request, response) => {

    // console.log('values', request.body);
    try {
        // Validate request body against schema
        const { error } = providerSchema.validate(request.body);
        if (error) {
            return response.status(400).json({ error: error.details[0].message });
        }


        // const findUser = await Provider.findOne( {email} );
        // if (findUser) {
        //     return response.status(409).json({
        //         error: 'User email already exists'
        //     });
        // }
        // Create a new provider instance
        const newProvider = {
            ...request.body,
            rating: 5,
        }
        const provider = new Provider(newProvider);

        // Save provider to the database
        const savedProvider = await provider.save();

        // Respond with the saved provider
        response.json(savedProvider);
    } catch (error) {
        // Handle server errors
        response.status(500).json({ error: 'Internal server error' });
    }
});

providersRouter.get('/', async (request, response) => {
    const provider = await Provider.find({}).populate('provides')
    if (provider) {
        response.json(provider)
    }
    else {
        response.status(404).end()
    }
})

providersRouter.get('/:id', async (request, response) => {
    const email = request.params.id
    const provider = await Provider.findOne({ email })
    .populate('provides')
    .populate('requests')
    .populate('current')
    .populate('history')
    if (provider) {
        response.json(provider)
    }
    else {
        response.status(404).end()
    }
})

module.exports = providersRouter;
