import express from 'express';
import loginCtrl from '../controllers/loginControllers.js';

const router = express.Router();
router.post('/', loginCtrl.login);      // reçoit le formulaire
router.get('/', loginCtrl.formLogin);   // affiche le formulaire

export default router;