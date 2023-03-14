const { response } = require("express");
const bcrypt = require("bcryptjs");
const Jugador = require("../models/jugador");
const { generaJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { userName, password } = req.body;

  try {
    // Verificar jugador en la DB
    const jugadorDB = await Jugador.findOne({ userName });
    if (!jugadorDB) {
      return res.status(404).json({
        ok: false,
        msg: "Nombre de usuario no encontrado",
      });
    }
    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, jugadorDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "La contraseña no es válida",
      });
    }
    // Generar el TOKEN - JWT
    const token = await generaJWT(jugadorDB.id);
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable  con el   administrador",
    });
  }
};

module.exports = {
  login,
};
