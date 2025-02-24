const Author = require('../models/Author');

exports.createAuthor = async (req, res, next) => {
  try {
    const { fullName, birthDate, birthPlace, education, website } = req.body;
    const achievements = req.body.achievements ? JSON.parse(req.body.achievements) : [];
    const image = req.file ? req.file.filename : null;

    if (!fullName) {
      const error = new Error("FullName majburiy");
      error.statusCode = 400;
      return next(error);
    }

    const newAuthor = new Author({
      fullName,
      birthDate,
      birthPlace,
      education,
      achievements,
      website,
      image
    });

    await newAuthor.save();
    res.status(201).json({ message: 'Muallif muvaffaqiyatli yaratildi', author: newAuthor });
  } catch (error) {
    next(error);
  }
};

exports.getAuthor = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

exports.updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fullName, birthDate, birthPlace, education, website } = req.body;
    const achievements = req.body.achievements ? JSON.parse(req.body.achievements) : undefined;

    const updateData = {
      ...(fullName && { fullName }),
      ...(birthDate && { birthDate }),
      ...(birthPlace && { birthPlace }),
      ...(education && { education }),
      ...(website && { website }),
      ...(achievements && { achievements })
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedAuthor = await Author.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedAuthor) {
      const error = new Error('Muallif topilmadi');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: 'Muallif maʼlumotlari yangilandi', updatedAuthor });
  } catch (error) {
    next(error);
  }
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);

    if (!deletedAuthor) {
      const error = new Error('Muallif topilmadi');
      error.statusCode = 404;
      return next(error);
    }

    res.json({ message: 'Muallif o‘chirildi', deletedAuthor });
  } catch (err) {
    next(err);
  }
};
