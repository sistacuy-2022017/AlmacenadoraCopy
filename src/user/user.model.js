import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "El nombre es obligotario"]
    },
    lastName: {
        type: String,
        required: [true, "El nombre es obligotario"]
    },
    userName: {
        type: String,
        required: [true, "El apellido es obligatorio"]
    },
    password: {
        type: String,
        required: [true, "El contraseña es obligatorio"]
    },
    state: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model('User', UserSchema);