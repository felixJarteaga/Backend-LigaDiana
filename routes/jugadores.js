/*
  Ruta: /api/jugadores
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { getJugadores, crearJugador } = require("../controllers/jugadores");

const router = Router();

router.get("/", getJugadores);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("userName", "El nombre de usuario es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearJugador
);

module.exports = router;
