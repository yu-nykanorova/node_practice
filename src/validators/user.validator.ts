import Joi from "joi";

const name = Joi.string()
  .trim()
  .pattern(/^[A-Za-zА-Яа-яёЁіІїЇєЄҐґ]+$/)
  .min(3)
  .messages({
    "string.pattern.base": "Only letters allowed",
    "string.min": "Name must be at least 3 characters",
  });
const email = Joi.string()
  .trim()
  .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  .messages({
    "string.pattern.base": "Email is invalid",
  });
const password = Joi.string().min(6).messages({
  "string.min": "At least 6 characters long",
});
const age = Joi.number().min(0).max(120).messages({
  "number.min": "Age should be greater than 0",
  "number.max": "Age should be higher than 120",
});
const phone = Joi.string()
  .pattern(/^\+?[0-9]{10,15}$/)
  .messages({
    "string.pattern.base": "Phone number is invalid",
  });

export const createValidator = Joi.object({
  name: name.required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: email.required().messages({
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: password.required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
  age: age.required().messages({
    "any.required": "Age is required",
  }),
  phone,
});

export const updateValidator = Joi.object({
  name,
  email,
  password,
  oldPassword: password,
  age,
  phone,
});

export const signInValidator = Joi.object({
  email: email.required().messages({
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: password.required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});
