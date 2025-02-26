const Router = require("express").Router;
const { getInitialPosts, getPostBySlug, createPost, updatePost, deletePost, getDolzarbPosts, getPaginatedPosts, loadMorePosts, searchFunc } = require("../controllers/postController");
const { verifyAdmin } = require('../middlewares/authMiddleware')
const multer = require("multer");
const path = require("path");

const postRouter = Router();
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Barcha postlarni olish
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Postlar muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 hasMore:
 *                   type: boolean
 *       500:
 *         description: Server xatosi
 */
postRouter.get("/posts", getInitialPosts);

/**
 * @swagger
 * /posts/{slug}:
 *   get:
 *     summary: Slug orqali postni olish
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Post slugi
 *     responses:
 *       200:
 *         description: Post muvaffaqiyatli topildi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bunday post topilmadi"
 *       500:
 *         description: Server xatosi
 */


postRouter.get("/posts/:slug", getPostBySlug);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Yangi post yaratish
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *                 example: "ijtimoiy-iqtisodiy"
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Post teglar ro‘yxati
 *                 example:
 *                   - "sud"
 *                   - "sanat"
 *               highlighted:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post muvaffaqiyatli yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post muvaffaqiyatli yaratildi"
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Validatsiya xatosi yoki rasm yuklanmagan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rasm yuklanmagan"
 *       500:
 *         description: Server xatosi
 */

postRouter.post("/posts", verifyAdmin, upload.single("image"), createPost);
/**
 * @swagger
 * /posts/{slug}:
 *   put:
 *     summary: Postni yangilash
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Post slugi
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Post sarlavhasi
 *                 example: "Yangi post sarlavhasi"
 *               category:
 *                 type: string
 *                 description: Post kategoriyasi
 *                 example: "ijtimoiy-iqtisodiy"
 *               content:
 *                 type: string
 *                 description: Post matni
 *                 example: "Bu postning to'liq matni..."
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Post teglar ro‘yxati
 *                 example:
 *                   - "sud"
 *                   - "sanat"
 *               highlighted:
 *                 type: boolean
 *                 description: Postni dolzarb qilish
 *                 example: true
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Post uchun rasm
 *     responses:
 *       200:
 *         description: Post muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post yangilandi"
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Noto'g'ri kategoriya yoki xato ma'lumot
 *       404:
 *         description: Post topilmadi
 *       500:
 *         description: Server xatosi
 */

postRouter.put("/posts/:slug", verifyAdmin, updatePost);

/**
 * @swagger
 * /posts/{slug}:
 *   delete:
 *     summary: Postni o'chirish
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Post slugi
 *     responses:
 *       200:
 *         description: Post muvaffaqiyatli o'chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post o‘chirildi"
 *       404:
 *         description: Post topilmadi
 *       500:
 *         description: Server xatosi
 */
postRouter.delete("/posts/:slug", verifyAdmin, deletePost);

/**
 * @swagger
 * /highlighted:
 *   get:
 *     summary: Dolzarb postlarni olish
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Dolzarb postlar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Server xatosi
 */
postRouter.get('/highlighted', getDolzarbPosts)
/**
 * @swagger
 * /load-more:
 *   get:
 *     summary: Ko'proq postlarni yuklash
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Nechta postni o'tkazib yuborish (paginatsiya uchun)
 *     responses:
 *       200:
 *         description: Ko'proq postlar muvaffaqiyatli yuklandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 hasMore:
 *                   type: boolean
 *                   description: Yana postlar mavjud yoki yo'qligini bildiradi
 *       500:
 *         description: Server xatosi
 */

postRouter.get('/load-more', loadMorePosts)

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Postlarni qidirish
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Qidiruv matni
 *     responses:
 *       200:
 *         description: Mos postlar
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       400:
 *         description: Qidiruv matni kiritilmadi
 *       404:
 *         description: Mos postlar topilmadi
 *       500:
 *         description: Server xatosi
 */
postRouter.get('/search', searchFunc)

module.exports = postRouter;
