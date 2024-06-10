import mongoose, { model } from 'mongoose';

const ToDo = mongoose.Schema({
    nameTask: {
        type: String,
        required: [true, "El nombre es obligotario"]
    },
    status: {
        type: Boolean,
        default: false
    },
    dateBegin: {
        type: Date,
        default: Date.now
    },
    dateEnd: {
        type: String,
        default: Date.now
    },
    nameUser: {
        type: String,
        ref: "User",
        required: [true, "El id es obligatorio"]
    },
    description: {
        type: String,
        required: [true, "La descripción es obligotaria"]
    }
});


ToDo.methods.toJSON = function () {
    const { __v, _id, ...toDo } = this.toObject();
    toDo.dateBegin=this.dateBegin.toISOString().substring(0, 10);
    toDo.id = _id;
    return toDo;
}

export default mongoose.model('ToDo', ToDo);