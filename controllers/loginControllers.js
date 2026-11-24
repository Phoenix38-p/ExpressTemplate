import jwt from 'jsonwebtoken';
const SECRET = 'AppKey';  // clé pour signer le jeton

const loginController = {
  formLogin(req, res) {
    console.log("Affiche authentification")
    res.render('authentification');   // affiche la page de connexion
  },

  login(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: 'Erreur authentif.' });
    }
    if (req.body.username == "admin" && req.body.password == "azerty123") {
      const token = jwt.sign(
        { id: 0, username: req.body.username },
        SECRET,
        { expiresIn: '120s' }          // le jeton expire après 2 minutes
      );
      res.cookie('access_token', token, {
        httpOnly: true,   // le navigateur (JS) ne peut pas le lire
        secure: true,     // envoyé uniquement en HTTPS
        sameSite: 'lax',  // protège contre le CSRF
        maxAge: 120_000   // même durée que le jeton
      });
      return res.render('main');
    } else {
      return res.status(400).json({ message: "Erreur d'authentif." });
    }
  },

  Error(req, res) { res.render('404'); }
};

export default loginController;