const multer = require('multer');
const { getAuthor, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/aboutController');
const { verifyAdmin } = require('../middlewares/authMiddleware');
const aboutRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

/**
 * @swagger
 * tags:
 *   - name: Author
 *     description: Muallif ma'lumotlari bilan ishlash uchun API'lar
 */

/**
 * @swagger
 * /author:
 *   get:
 *     summary: Muallifning barcha ma'lumotlarni olish
 *     tags: [Author]
 *     responses:
 *       200:
 *         description: Muallif ma'lumotlari
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       500:
 *         description: Server xatosi
 */
aboutRouter.get('/author', getAuthor);

const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

/**
 * @swagger
 * /author:
 *   post:
 *     summary: Yangi muallif qo'shish
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Muallifning to'liq ismi
 *                 example: "Ali Valiyev"
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Tug‘ilgan sana
 *                 example: "1990-05-15"
 *               birthPlace:
 *                 type: string
 *                 description: Tug‘ilgan joyi
 *                 example: "Toshkent"
 *               education:
 *                 type: string
 *                 description: Ta’limi
 *                 example: "Toshkent Davlat Universiteti"
 *               achievements:
 *                 type: string
 *                 description: Yutuqlar (JSON formatda)
 *                 example: '["Kitob muallifi", "Professor"]'
 *               website:
 *                 type: string
 *                 description: Shaxsiy veb-sayti
 *                 example: "https://example.com"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Muallif rasmi
 *     responses:
 *       201:
 *         description: Muallif yaratildi
 *       400:
 *         description: Noto'g'ri so'rov
 *       500:
 *         description: Server xatosi
 */
aboutRouter.post('/author', verifyAdmin, upload.single('image'), createAuthor);

/**
 * @swagger
 * /author/{id}:
 *   put:
 *     summary: Muallif ma'lumotlarini yangilash
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Muallif ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               birthPlace:
 *                 type: string
 *               education:
 *                 type: string
 *               achievements:
 *                 type: string
 *               website:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Ma'lumotlar yangilandi
 *       400:
 *         description: Noto'g'ri so'rov
 *       404:
 *         description: Muallif topilmadi
 *       500:
 *         description: Server xatosi
 */
aboutRouter.put('/author/:id', verifyAdmin, upload.single('image'), updateAuthor);

/**
 * @swagger
 * /author/{id}:
 *   delete:
 *     summary: Muallifni o'chirish
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Muallif ID
 *     responses:
 *       200:
 *         description: Muallif o‘chirildi
 *       404:
 *         description: Muallif topilmadi
 *       500:
 *         description: Server xatosi
 */
aboutRouter.delete('/author/:id', verifyAdmin, deleteAuthor);

module.exports = aboutRouter;
