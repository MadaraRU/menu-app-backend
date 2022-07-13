import Joi from "joi";

export const categoryNameValidator = {
  body: Joi.object<{
    categoryName: string;
  }>({
    categoryName: Joi.string().max(15).min(3),
  }),
};
