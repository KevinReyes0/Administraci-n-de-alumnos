import {Schema, model} from "mongoose";

const UserSchema = Schema({
    name : {
        type: String,
        required: [true, 'Nombre requerido'],
        maxLength: [25, 'Cant be overcome 25 characters']
    },
    surname : {
        type: String,
        required: [true, 'Apellido requerido'],
        maxLength: [25, 'Cant be overcome 25 characters']
    },
    username : {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, '  Correo requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Contraseña requerida'],
        minLength: 8
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['TEACHER_ROLE', 'STUDENT_ROLE'],
        default: 'STUDENT_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
    keeper: [{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: false
    }]
},
    {
        timestamps: true,
        versionKey: false,
    }
);

UserSchema.methods.toJSON = function() {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model('User', UserSchema);