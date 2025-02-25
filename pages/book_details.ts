import { Request, Response } from 'express';
import Book from '../models/book';
import express from 'express';

const router = express.Router();

/**
 * @route GET /book_dtls
 * @returns {object} 200 - An array of book details
 * @returns {Error}  500 - if an error occurs when fetching the book details
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const results = await Book.getBookDetails(req.query.id as string);
    res.status(200).send(results);
  }
  catch (err) {
    res.status(500).send('Book details not found');
  }
});

export default router;