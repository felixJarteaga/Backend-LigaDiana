/*
  Ruta: /api/jugadores
*/

const { Router } = require("express");
const { getJugadores, crearJugador } = require("../controllers/jugadores");

const router = Router();

router.get("/", getJugadores);
router.post("/", crearJugador);

module.exports = router;
