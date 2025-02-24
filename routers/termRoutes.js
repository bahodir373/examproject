const { getAlphabet, getTermsByLetter, createTerm, getAllTerms, updateTerm, deleteTerm } = require('../controllers/termController');
const { verifyAdmin } = require('../middlewares/authMiddleware');

const termsRouter = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: Encyclopedia
 *   description: Yuridik ensiklopediya uchun API
 */

/**
 * @swagger
 * /encyclopedia/letter:
 *   get:
 *     summary: Barcha harflar ro'yxatini olish
 *     tags: [Encyclopedia]
 *     responses:
 *       200:
 *         description: Harflar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "A"
 */
termsRouter.get('/encyclopedia/letter', getAlphabet);

/**
 * @swagger
 * /encyclopedia/letter/{letter}:
 *   get:
 *     summary: Harf bo'yicha atamalarni olish
 *     tags: [Encyclopedia]
 *     parameters:
 *       - in: path
 *         name: letter
 *         required: true
 *         schema:
 *           type: string
 *         description: Qidirilayotgan harf
 *     responses:
 *       200:
 *         description: Harfga mos atamalar
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Term'
 *       404:
 *         description: Bu harfga mos atamalar topilmadi
 *       500:
 *         description: Server xatosi
 */
termsRouter.get('/encyclopedia/letter/:letter', getTermsByLetter);

/**
 * @swagger
 * /encyclopedia/terms:
 *   post:
 *     summary: Yangi atama qo'shish
 *     tags: [Encyclopedia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Term'
 *     responses:
 *       201:
 *         description: Atama muvaffaqiyatli qo'shildi
 *       400:
 *         description: Term va description majburiy
 *       500:
 *         description: Server xatosi
 */
termsRouter.post('/encyclopedia/terms', verifyAdmin, createTerm);

/**
 * @swagger
 * /encyclopedia/terms:
 *   get:
 *     summary: Barcha atamalarni olish
 *     tags: [Encyclopedia]
 *     responses:
 *       200:
 *         description: Barcha atamalar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Term'
 *       500:
 *         description: Server xatosi
 */
termsRouter.get('/encyclopedia/terms', getAllTerms);

/**
 * @swagger
 * /encyclopedia/terms/{id}:
 *   put:
 *     summary: Atamani yangilash
 *     tags: [Encyclopedia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Atama ID raqami
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Term'
 *     responses:
 *       200:
 *         description: Atama yangilandi
 *       400:
 *         description: Term va description majburiy
 *       404:
 *         description: Atama topilmadi
 *       500:
 *         description: Server xatosi
 */
termsRouter.put('/encyclopedia/terms/:id', verifyAdmin, updateTerm);

/**
 * @swagger
 * /encyclopedia/terms/{id}:
 *   delete:
 *     summary: Atamani o'chirish
 *     tags: [Encyclopedia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Atama ID raqami
 *     responses:
 *       200:
 *         description: Atama o'chirildi
 *       404:
 *         description: Atama topilmadi
 *       500:
 *         description: Server xatosi
 */
termsRouter.delete('/encyclopedia/terms/:id', verifyAdmin, deleteTerm);

module.exports = termsRouter;
