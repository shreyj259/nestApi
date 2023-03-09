const Joi = require("joi");


export const LoginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(3).required()
})

export const RegisterSchema=Joi.object({
    name:Joi.string().min(2).max(15).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(3).required()
})

export const createCat=Joi.object({
    name:Joi.string().min(2).max(15).required(),
    breed:Joi.string().min(2).max(15).required(),
    age:Joi.number().required().min(0).max(15)
})


export const updateCatSchema=Joi.object({
    name:Joi.string().min(2).max(15),
    breed:Joi.string().min(2).max(15),
    age:Joi.number().min(0).max(15)
})


