import bcryptjs from "bcryptjs";
import User from "../user/user.model.js";
import { generateToken } from "../helpers/generate-jwt.js";


export const login = async (req, res) => {
    let { userName, password } = req.body;
    let user = await User.findOne({ userName: userName });
    let passwordCorrect = bcryptjs.compareSync(password, user.password);
    let name = user.firstName + " " + user.lastName;
    if (passwordCorrect) {
        // Generar token
        let token = await generateToken(user._id);
        req.headers.authorization = token;

        return res.status(200).json({
            msg: "Login exitoso",
            name,
            token
        });
    } else {
        return res.status(400).json({
            msg: "Contraseña incorrecta"
        });
    }

}