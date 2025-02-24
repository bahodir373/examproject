const { findMostViewed } = require('../controllers/mostViewedController')

const Router = require("express").Router();

const MVRouter = Router;

/**
 * @swagger
 * /most-viewed:
 *   get:
 *     summary: Eng ko'p ko'rilgan 10 ta postni olish
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Eng ko'p ko'rilgan postlar
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: Hali hech qanday post topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hali hech qanday post topilmadi"
 *       500:
 *         description: Server xatosi
 */

MVRouter.get('/most-viewed', findMostViewed)

module.exports = MVRouter;