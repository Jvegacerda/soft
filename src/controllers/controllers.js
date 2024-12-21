
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DB } = require('../db/db');
const SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await DB.query(
      'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4)',
      [email, hashedPassword, rol, lenguage]
    );
    res.status(201).send({ message: 'Usuario registrado con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al registrar usuario.' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await DB.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = rows[0];

    if (!user) return res.status(404).send({ message: 'Usuario no encontrado.' });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return res.status(401).send({ message: 'Contraseña incorrecta.' });

    const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al iniciar sesión.' });
  }
};

const getUserData = async (req, res) => {
  const { email } = req.user;

  try {
    const { rows } = await DB.query('SELECT email, rol, lenguage FROM usuarios WHERE email = $1', [email]);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al obtener datos del usuario.' });
  }
};

module.exports = { registerUser, loginUser, getUserData };
