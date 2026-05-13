import Joi from "joi";

export const createValidator = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[A-Za-zА-Яа-яёЁіІїЇєЄҐґ]+$/)
    .min(3)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.pattern.base": "Only letters allowed",
      "string.min": "Name must be at least 3 characters",
    }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "At least 6 characters long",
  }),
  age: Joi.number().min(0).max(120).required().messages({
    "number.min": "Age should be greater than 0",
    "number.max": "Age should be higher than 120",
  }),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .messages({
      "string.pattern.base": "Phone number is invalid",
    }),
});

export const updateValidator = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[A-Za-zА-Яа-яёЁіІїЇєЄҐґ]+$/)
    .min(3)
    .messages({
      "string.pattern.base": "Only letters allowed",
      "string.min": "Name must be at least 3 characters",
    }),
  email: Joi.string().email().messages({
    "string.empty": "Email is invalid",
  }),
  password: Joi.string().min(6).messages({
    "string.min": "At least 6 characters long",
  }),
  age: Joi.number().min(0).max(120).messages({
    "number.min": "Age should be greater than 0",
    "number.max": "Age should be higher than 120",
  }),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .messages({
      "string.pattern.base": "Phone number is invalid",
    }),
});
