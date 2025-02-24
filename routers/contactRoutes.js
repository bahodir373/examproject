const { createContact, getContacts, getContact } = require('../controllers/contactController')
const { verifyAdmin } = require('../middlewares/authMiddleware')

const contactRouter = require('express').Router()

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Yangi murojaat yuborish
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ali Valiyev"
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               email:
 *                 type: string
 *                 example: "ali.valiyev@example.com"
 *               subject:
 *                 type: string
 *                 enum: ["Taklif", "Tanqid", "Shikoyat"]
 *                 example: "Taklif"
 *               message:
 *                 type: string
 *                 example: "Saytni yaxshilash uchun taklifim bor."
 *     responses:
 *       201:
 *         description: Murojaat muvaffaqiyatli yuborildi
 *       400:
 *         description: Validatsiya xatoliklari
 *
 *   get:
 *     summary: Barcha murojaatlarni olish
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Barcha murojaatlar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "65d64b899f7f9a001b5e17b4"
 *                   name:
 *                     type: string
 *                     example: "Ali Valiyev"
 *                   phone:
 *                     type: string
 *                     example: "+998901234567"
 *                   email:
 *                     type: string
 *                     example: "ali.valiyev@example.com"
 *                   subject:
 *                     type: string
 *                     example: "Taklif"
 *                   message:
 *                     type: string
 *                     example: "Saytni yaxshilash uchun taklifim bor."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-02-22T14:45:00.000Z"
 *       401:
 *         description: Token yuborilmagan yoki noto'g'ri
 */

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: ID bo'yicha murojaatni olish
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Murojaat ID-si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Topilgan murojaat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "65d64b899f7f9a001b5e17b4"
 *                 name:
 *                   type: string
 *                   example: "Ali Valiyev"
 *                 phone:
 *                   type: string
 *                   example: "+998901234567"
 *                 email:
 *                   type: string
 *                   example: "ali.valiyev@example.com"
 *                 subject:
 *                   type: string
 *                   example: "Taklif"
 *                 message:
 *                   type: string
 *                   example: "Saytni yaxshilash uchun taklifim bor."
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-02-22T14:45:00.000Z"
 *       404:
 *         description: Murojaat topilmadi
 *       401:
 *         description: Token yuborilmagan yoki noto'g'ri
 */

contactRouter.get('/contacts', verifyAdmin ,getContacts)
contactRouter.get('/contacts/:id', verifyAdmin, getContact)
contactRouter.post('/contacts', createContact)


module.exports = contactRouter