const errorHandler = (err, req, res, next) => {
	console.error(err.stack); // Consolga log

	let statusCode = err.statusCode || 500;
	let message = err.message || 'Serverda kutilmagan xato yuz berdi';

	if (err.name === 'MulterError') {
			statusCode = 400;
			message = `Fayl yuklashda xato: ${err.message}`;
	}

	if (err.name === 'CastError') {
			statusCode = 400;
			message = 'Noto‘g‘ri ID format';
	}

	if (err.code === 'ENOENT') {
			statusCode = 404;
			message = 'Fayl topilmadi';
	}

	res.status(statusCode).json({
			success: false,
			statusCode,
			message
	});
};

module.exports = errorHandler;
