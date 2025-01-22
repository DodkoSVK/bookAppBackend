const Joi = require("joi");

const createBookSchema = Joi.object({
    bookName: Joi.string().required(),
    bookGenre: Joi.string().required(),
    bookRating: Joi.number().min(0).max(10).required()
});
const patchBookSchema = Joi.object({
    bookName: Joi.string(),
    bookGenre: Joi.string(),
    bookRating: Joi.number().min(0).max(10)
}).min(1);
const sortSchema = Joi.object({ 
    sortBy: Joi.string().valid( 'id', 'name', 'genre', 'rating')
});
module.exports = { createBookSchema, patchBookSchema, sortSchema };