const Joi = require('joi');

const createContactValidationSchema = Joi.object({
  name: Joi.string().min(4).max(10).required(),
  email: Joi.string().email().required(),
  address: Joi.string().min(4).max(10).required(),
});


const validateCreateContact = (req, res, next) => {
  const { error } = createContactValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = {
  validateCreateContact,
};
