import { Router } from 'express';

import { createBooks } from './controllers/createBooks';
import { fetchBooks } from './controllers/fetchBooks';
import { fetchBook } from './controllers/fetchBook';
import { deleteBook } from './controllers/deleteBook';

const routes = Router();

routes.post('/books', createBooks);
routes.get('/books', fetchBooks);
routes.get('/books/:id', fetchBook);
routes.delete('/books/:id', deleteBook);

export { routes };
