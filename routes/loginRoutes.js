import express from 'express';
import loginCtrl from '../controllers/loginControllers.js';
// Contient la logique nécessaire à l'authentification
import jwt from 'jsonwebtoken'; // ajout token sécurisé
const SECRET = 'AppKey' // à mettre en fichier de conf. Plus tard
const loginController={
login(req,res){
 if (!req.body.username || !req.body.password) {
 return res.status(400).json({ message: `Erreur authentif.` })
 }
 // Simulation d'un utilisateur (normalement géré dans une BDD)
 if (req.body.username == "admin" && req.body.password =="azerty123") {
 // Création d'un token d'une durée de 120 secondes
 const token = jwt.sign(
 { id: 0, username: req.body.username},
 SECRET,
 { expiresIn: '120s'}
 )
 return res.json({ access_token: token})
 } else {
 return res.status(400).json({ message: `Erreur D'authentif.` })
 }
},
Error(req, res) {
res.render('404')
}
}

const router = express.Router();
router.post('/', loginCtrl.login);      // reçoit le formulaire
router.get('/', loginCtrl.formLogin);   // affiche le formulaire

export default router;