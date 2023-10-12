// Define the Joi schema for user registration
export const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    address: Joi.string().min(5).max(100).required(),
});
