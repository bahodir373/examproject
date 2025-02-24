const Router = require('express').Router;

const { findCategory } = require('../controllers/categoryController');

const categoryRouter = Router();

/**
 * @swagger
 * /categories/{category}:
 *   get:
 *     summary: Tanlangan kategoriya bo'yicha postlarni olish
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: Kategoriya nomi (masalan, "sud-huquq", "ijtimoiy-iqtisodiy")
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kategoriya bo'yicha topilgan postlar
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       400:
 *         description: Noto'g'ri kategoriya nomi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bunday kategoriya mavjud emas"
 *       404:
 *         description: Kategoriyada postlar topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bu kategoriyada postlar topilmadi"
 *       500:
 *         description: Server xatosi
 */


categoryRouter.get('/categories/:category', findCategory);

module.exports = categoryRouter;
