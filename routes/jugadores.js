/*
  Ruta: /api/jugadores
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getJugadores,
  crearJugador,
  acualizarJugador,
  borrarJugador,
} = require("../controllers/jugadores");

const { validatJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validatJWT, getJugadores);

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

router.put(
  "/:id",
  [
    validatJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("role", "El rol de usuario es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  acualizarJugador
);

router.delete("/:id", validatJWT, borrarJugador);

module.exports = router;
