const Joi = require('joi');

const contactValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Ism talab qilinadi',
  }),
  phone: Joi.string()
    .pattern(/^\+?\d{9,15}$/)
    .required()
    .messages({
      'string.empty': 'Telefon raqami talab qilinadi',
      'string.pattern.base': 'Telefon raqami noto‘g‘ri',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email manzili talab qilinadi',
      'string.email': 'Email manzili noto‘g‘ri',
    }),
  subject: Joi.string()
    .valid('Taklif', 'Tanqid', 'Shikoyat')
    .required()
    .messages({
      'any.only': 'Faqat "Taklif", "Tanqid" yoki "Shikoyat" tanlang',
      'string.empty': 'Mavzu tanlang',
    }),
  message: Joi.string().min(10).required().messages({
    'string.empty': 'Xabar matni talab qilinadi',
    'string.min': 'Xabar kamida 10 ta belgi bo‘lishi kerak',
  })
});

module.exports = contactValidationSchema;
