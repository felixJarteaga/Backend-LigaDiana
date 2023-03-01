const { response } = require("express");
const bcrypt = require("bcryptjs");
const Jugador = require("../models/jugador");

const getJugadores = async (req, res) => {
  const jugadores = await Jugador.find({}, "nombre userName password role");

  res.json({
    ok: true,
    jugadores,
  });
};

const crearJugador = async (req, res = response) => {
  const { password, userName } = req.body;

  try {
    const existeUserName = await Jugador.findOne({ userName });
    if (existeUserName) {
      return res.status(400).json({
        ok: false,
        msg: "El nombre de usuario ya existe.",
      });
    }

    const jugador = new Jugador(req.body);

    // Encriptar Contraseña
    const salt = bcrypt.genSaltSync();
    jugador.password = bcrypt.hashSync(password, salt);

    // Guardamos el usuario
    await jugador.save();
    res.json({
      ok: true,
      jugador,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};

module.exports = {
  getJugadores,
  crearJugador,
};
