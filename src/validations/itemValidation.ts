import Joi from "joi";

export const itemValidator = {
  body: Joi.object<{
    name: string;
    price: number;
    description: string;
  }>({
    name: Joi.string().max(15).min(3).required(),
    price: Joi.number().min(0.1).required(),
    description: Joi.string().required(),
  }),
};
