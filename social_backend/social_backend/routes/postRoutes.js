const express = require('express');
const multer = require('multer');
const path = require('path');
const postController = require('../controllers/postController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/posts', postController.getAllPosts);
router.post('/posts', upload.single('file'), postController.createPost);
router.post('/posts/like/:postId', postController.likePost);
router.post('/posts/comment/:postId', postController.addComment);
router.delete('/posts/:postId', postController.deletePost);

module.exports = router;
