import { response, request } from "express";
import bcryptjs from "bcryptjs";
import User from "./user.model.js";

export const getUsers = async (req = request, res = response) => {
  const { limite, desde } = req.body;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.status(200).json({
    total,
    users,
  });
};

export const createUser = async (req, res) => {
  const { firstName, lastName, userName, password } = req.body;
  const user = new User({ firstName, lastName, userName, password });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(200).json({
    user,
  });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  await User.findByIdAndUpdate(id, resto);

  const usuario = await User.findOne({ _id: id });

  res.status(200).json({
    msg: "Usuario Actualizado exitosamente",
    usuario,
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, { state: false });

  const user = await User.findOne({ _id: id });

  res.status(200).json({
    msg: "Usuario eliminado exitosamente",
    user,
  });
};
