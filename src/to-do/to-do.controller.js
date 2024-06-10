import ToDo from "./to-do.model.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import User from "../user/user.model.js";

export const createToDo = async (req, res) => {
    const { nameTask, status, dateBegin, dateEnd, nameUser, description } = req.body;
    let toDoSaved = null;
    const newToDo = new ToDo({ nameTask, status, dateBegin, dateEnd, nameUser, description });
    await newToDo.save();
    /* const user = await User.findById(userId);
     const nameUser = user.firstName + " " + user.lastName;
     console.log("Se obtiene un nombre: " + nameUser);*/


    res.status(201).json({
        message: "To-Do creado exitosamente",
    });
}

export const viewToDo = async (req, res) => {
    const toDo = await ToDo.find();
    
    res.status(201).json({
        toDo
    });
}

export const updateToDo = async (req, res) => {
    const { id } = req.params;

    try {
        const toDoStatus = await ToDo.findOne({ _id: id });
        if (!toDoStatus) {
            return res.status(404).json({ message: "To-Do no encontrado" });
        }

        const updatedToDo = await ToDo.findByIdAndUpdate(
            id,
            { status: !toDoStatus.status }, 
            { new: true } 
        );

        res.status(200).json({
            message: "To-Do actualizado exitosamente",
            toDo: updatedToDo
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar To-Do",
            error: error.message
        });
    }
};


export const deleteToDo = async (req, res) => {
    const { id } = req.params;
    const toDo = await ToDo.findByIdAndDelete({ _id: id });
    res.status(201).json({
        message: "To-Do eliminado exitosamente",
        toDo
    });

}