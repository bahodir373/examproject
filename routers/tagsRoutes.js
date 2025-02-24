const tagsRouter = require('express').Router();
const { getAllTags, getPostsByTag, createTag, updateTag, deleteTag } = require('../controllers/tagsController');
const { verifyAdmin } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Postlarga tegishli taglar bilan ishlash
 */

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Barcha taglarni olish
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Barcha mavjud taglar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 *       500:
 *         description: Server xatosi
 */
tagsRouter.get('/tags', getAllTags);

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     summary: Berilgan tagga tegishli postlarni olish
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tagning ID raqami
 *     responses:
 *       200:
 *         description: Tagga mos postlar
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       400:
 *         description: Noto'g'ri tag ID formati
 *       404:
 *         description: Bu tagga mos postlar topilmadi
 *       500:
 *         description: Server xatosi
 */
tagsRouter.get('/tags/:id', getPostsByTag);

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Yangi tag yaratish
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       201:
 *         description: Tag muvaffaqiyatli yaratildi
 *       400:
 *         description: Tag nomi kiritilmadi
 *       409:
 *         description: Bu nomli tag allaqachon mavjud
 *       500:
 *         description: Server xatosi
 */
tagsRouter.post('/tags', verifyAdmin, createTag);

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     summary: Tag nomini yangilash
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tag ID raqami
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Yangi Tag Nomi"
 *     responses:
 *       200:
 *         description: Tag yangilandi
 *       400:
 *         description: Tag nomini kiritish majburiy
 *       404:
 *         description: Tag topilmadi
 *       409:
 *         description: Bu nomli tag allaqachon mavjud
 *       500:
 *         description: Server xatosi
 */
tagsRouter.put('/tags/:id', verifyAdmin, updateTag);

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Tagni o'chirish
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tag ID raqami
 *     responses:
 *       200:
 *         description: Tag o'chirildi
 *       404:
 *         description: Tag topilmadi
 *       500:
 *         description: Server xatosi
 */
tagsRouter.delete('/tags/:id', verifyAdmin, deleteTag);

module.exports = tagsRouter;
