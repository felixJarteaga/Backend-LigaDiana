const Jugador = require("../models/jugador");

const getJugadores = (req, res) => {
  res.json({
    ok: true,
    msg: "get Jugadores",
  });
};

const crearJugador = async (req, res) => {
  const { nombre, password, userName } = req.body;

  const jugador = new Jugador(req.body);

  await jugador.save();

  res.json({
    ok: true,
    jugador,
  });
};

module.exports = {
  getJugadores,
  crearJugador,
};
