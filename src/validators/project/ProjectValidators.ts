import { Joi } from 'express-validation';

const createProjectrValidator = {
  body: Joi.object({
    description: Joi.string().required(),
    userId: Joi.string().required()
  })
};

export { createProjectrValidator };
