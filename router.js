import Router from 'express';
import NoteController from './NoteController.js';

const router = new Router();

router.post('/notes', NoteController.create);
router.get('/notes', NoteController.fetchAll);
router.get('/notes/search', NoteController.search);
router.get('/notes/:id', NoteController.fetchOne);
router.put('/notes/:id', NoteController.update);
router.delete('/notes/:id', NoteController.delete);

export default router;
