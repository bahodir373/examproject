const Contact = require('../models/Contact');
const contactValidationSchema = require('../validations/contactValidation');

exports.createContact = async (req, res, next) => {
  try {
    const { error } = contactValidationSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      const validationError = new Error("Validatsiya xatoliklari");
      validationError.statusCode = 400;
      validationError.details = errors;
      return next(validationError);
    }

    const newContact = new Contact(req.body);
    await newContact.save();

    res.status(201).json({ message: 'Murojaat muvaffaqiyatli yuborildi' });
  } catch (err) {
    next(err);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

exports.getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      const notFoundError = new Error("Bunday murojaat topilmadi");
      notFoundError.statusCode = 404;
      return next(notFoundError);
    }

    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};
