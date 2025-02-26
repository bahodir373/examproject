const Author = require('../models/Author');

exports.createAuthor = async (req, res, next) => {
  try {
    const { fullName, birthDate, birthPlace, education, website } = req.body;
    let achievements = req.body.achievements;
    if (!Array.isArray(achievements)) {
      achievements = achievements ? achievements.split(",").map(tag => tag.trim()) : [];
    }

    let imagePath = "";

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else {
      const err = new Error("Rasm yuklanmagan");
      err.statusCode = 400;
      return next(err);
    }

    if (!fullName) {
      const error = new Error("Ismingizni to'liq kiriting");
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
      image: imagePath
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
    let achievements = req.body.achievements;
    if (!Array.isArray(achievements)) {
      achievements = achievements ? achievements.split(",").map(tag => tag.trim()) : [];
    }

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
