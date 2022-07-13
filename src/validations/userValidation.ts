import Joi from "joi";

export const regiserValidator = {
  body: Joi.object<{
    name: string;
    email: string;
    password: string;
  }>({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  }),
};

export const loginValidator = {
  body: Joi.object<{
    email: string;
    password: string;
  }>({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  }),
};
