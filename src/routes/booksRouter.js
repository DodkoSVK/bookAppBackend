const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksControllers');

router.get('/', booksController.getBook);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.createBook);
router.patch('/:id', booksController.editBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;