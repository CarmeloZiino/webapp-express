import express from 'express';

import upload from '../middlewares/multer.js';

const router = express.Router();

import { index, show, destroy, storeReview , store } from '../controllers/movieController.js';

//Rotte per i Film

//index
//localhost:3000/api/movies
router.get('/', index);

//show
//localhost:3000/api/movies/:id
router.get('/:id', show);

//destroy
//localhost:3000/api/movies/:id
router.delete('/:id', destroy);


//StoreReview
router.post('/:id/reviews' , storeReview)

//store
router.post( '/', upload.single('image'), store )





export default router;