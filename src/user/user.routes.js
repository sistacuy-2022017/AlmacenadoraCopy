import { Router } from "express";
import { check } from "express-validator";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "./user.controller.js";
import {
  existeUsuarioById,
  existenteUsername,
} from "../helpers/db-validators.js";

import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("firstName", "El nombre es obligatorio").not().isEmpty(),
    check("lastName", "El nombre es obligatorio").not().isEmpty(),
    check("userName", "El nombre es obligatorio").not().isEmpty(),
    check("userName").custom(existenteUsername),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  createUser
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  updateUser
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  deleteUser
);

export default router;
