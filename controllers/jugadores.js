const { response } = require("express");
const bcrypt = require("bcryptjs");
const Jugador = require("../models/jugador");
const { generaJWT } = require("../helpers/jwt");

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
    // Generar el TOKEN - JWT
    const token = await generaJWT(jugador.id);
    res.json({
      ok: true,
      jugador,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};

const acualizarJugador = async (req, res = response) => {
  const id = req.params.id;

  try {
    const jugadorDB = await Jugador.findById(id);
    if (!jugadorDB) {
      return res.status(404).json({
        ok: false,
        msg: "No  existe un usuario con por ese id",
      });
    }

    // TODO: Validar token y comprobar si es el usuario  correcto

    // Actualizaciones
    const campos = req.body;

    if (jugadorDB.userName === req.body.userName) {
      delete campos.userName;
    } else {
      const existeUserName = await Jugador.findOne({
        userName: req.body.userName,
      });
      if (existeUserName) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un jugador con ese nombre de usuario",
        });
      }
    }

    delete campos.password;

    const jugadorActualizado = await Jugador.findByIdAndUpdate(id, campos, {
      new: true,
    });

    res.json({
      ok: true,
      jugador: jugadorActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inseperado...",
    });
  }
};

const borrarJugador = async (req, res = response) => {
  const id = req.params.id;
  try {
    const jugadorDB = await Jugador.findById(id);

    if (!jugadorDB) {
      return res.status(404).json({
        ok: false,
        msg: "No  existe un usuario con por ese id",
      });
    }
    await Jugador.findByIdAndUpdate(id, { estado: "D" });
    res.status(200).json({
      ok: true,
      msg: `Jugador ${jugadorDB.nombre} borrado`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inseperado...",
    });
  }
};

module.exports = {
  getJugadores,
  crearJugador,
  acualizarJugador,
  borrarJugador,
};
