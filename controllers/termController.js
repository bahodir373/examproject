const Term = require('../models/Term');

exports.getAlphabet = (req, res) => {
  const alphabet = ['A', 'B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 
                    'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 
                    'V', 'X', 'Y', 'Z', "O'", "G'", 'SH', 'CH'];
  res.json(alphabet);
};

exports.getTermsByLetter = async (req, res, next) => {
  try {
    const { letter } = req.params;
    const regex = new RegExp('^' + letter, 'i');
    const terms = await Term.find({ term: regex }).sort({ term: 1 });

    if (terms.length === 0) {
      const err = new Error("Bu harfga mos atamalar topilmadi");
      err.statusCode = 404;
      return next(err);
    }

    res.json(terms);
  } catch (error) {
    next(error);
  }
};

exports.createTerm = async (req, res, next) => {
  try {
    const { term, description } = req.body;

    if (!term || !description) {
      const err = new Error("Term va description majburiy");
      err.statusCode = 400;
      return next(err);
    }

    const newTerm = new Term({ term, description });
    await newTerm.save();

    res.status(201).json({ message: "Atama muvaffaqiyatli qo'shildi", newTerm });
  } catch (error) {
    next(error);
  }
};

// 📋 Get All Terms
exports.getAllTerms = async (req, res, next) => {
  try {
    const terms = await Term.find().sort({ term: 1 });
    res.json(terms);
  } catch (error) {
    next(error);
  }
};

exports.updateTerm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { term, description } = req.body;

    if (!term || !description) {
      const err = new Error("Term va description majburiy");
      err.statusCode = 400;
      return next(err);
    }

    const updatedTerm = await Term.findByIdAndUpdate(
      id,
      { term, description },
      { new: true, runValidators: true }
    );

    if (!updatedTerm) {
      const err = new Error("Atama topilmadi");
      err.statusCode = 404;
      return next(err);
    }

    res.json({ message: "Atama yangilandi", updatedTerm });
  } catch (error) {
    next(error);
  }
};

exports.deleteTerm = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTerm = await Term.findByIdAndDelete(id);
    if (!deletedTerm) {
      const err = new Error("Atama topilmadi");
      err.statusCode = 404;
      return next(err);
    }

    res.json({ message: "Atama o'chirildi", deletedTerm });
  } catch (error) {
    next(error);
  }
};
