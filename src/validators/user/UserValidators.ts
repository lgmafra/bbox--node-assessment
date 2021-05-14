import {Joi} from 'express-validation'

const createUserValidator = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
  })
};

export { createUserValidator };