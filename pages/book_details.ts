import { Request, Response } from 'express';
import Book from '../models/book';
import express from 'express';
import BookInstance from '../models/bookinstance';
const router = express.Router();

/**
 * @route GET /book_dtls
 * @returns {object} 200 - An array of book details
 * @returns {Error}  500 - if an error occurs when fetching the book details
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    if (!req.query.id) {
      return res.status(400).send('Book ID is required');
    }

    const [book, copies] = await Promise.all([
      Book.getBookDetails(req.query.id as string),
      BookInstance.find({ book: req.query.id as string }, { imprint: 1, status: 1 })
    ]);
    
    res.status(200).send({
      title: book.title,
      author: book.author,
      copies: copies.map((copy: any) => ({
        imprint: copy.imprint,
        status: copy.status
      }))
    });
  }
  catch (err) {
    console.error('Error fetching book details:', err);
    res.status(500).send('Book details not found');
  }
});

export default router;