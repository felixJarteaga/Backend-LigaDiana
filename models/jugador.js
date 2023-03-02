const { Schema, model } = require("mongoose");

const jugadorSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
  },
  estado: {
    type: String,
    required: true,
    default: "A",
  },
});

jugadorSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Jugador", jugadorSchema);
