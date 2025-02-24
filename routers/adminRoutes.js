const { login, logout } = require('../controllers/adminController')

const Router = require("express").Router();

const adminRouter = Router;

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin autentifikatsiyasi

 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: topaolsangtop
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Muvaffaqiyatli login
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Username yoki parol noto‘g‘ri
 *       404:
 *         description: Admin topilmadi

 * /admin/logout:
 *   post:
 *     summary: Admin logout
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Muvaffaqiyatli logout
 *       401:
 *         description: Token noto‘g‘ri yoki yuborilmagan
 *       404:
 *         description: Admin topilmadi
 */


adminRouter.post('/admin/login', login);
adminRouter.post('/admin/logout', logout);

module.exports = adminRouter;
