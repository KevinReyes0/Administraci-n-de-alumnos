import { response, request } from "express";
import {hash} from "argon2";
import User from './user.model.js';
import Course from '../courses/courses.model.js'

export const getUsers = async (req = request, res = response) => {
    try {
        const {limite = 10, desde = 0} = req.query;
        const query = {estado: true};


        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .populate({path: 'keeper', match: { status: true }, select: 'name' })
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            succes: true,
            total,
            users
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            msj: 'Error al obtener usuario',
            error
        })
    }
}

export const getUserById = async (req, res) => {
    try {
    
        const {id} = req.params;

        const user = await User.findById(id).populate({path: 'keeper', match: { status: true }, select: 'name description' });

        if(!user){
            return res.status(404).json({
                succes: false,
                msg: 'Usuario no encontrado'
            })
        }

        res.status(200).json({
            succes: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msj: "Error al obtener usuario",
            error
        })
    }
}


export const updateUser = async (req, res  = response) => {
    try {
        const {id} = req.params;
        const {_id, password, email, ...data} = req.body;

        if(password){
            data.password = await hash(password)
        }

        const user = await User.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            succes: true,
            msj: 'Usuario actualizado con exito',
            user
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msj: "Error al actualizar user",
            error
        })
    }
}

export const updatePassword = async (req, res = response) => {
    try {
        const {id} = req.params;
        const {password} = req.body;

        if(password){
            const passwordUpdate = await hash(password)

            await User.findByIdAndUpdate(id, { password: passwordUpdate });
        };

        res.status(200).json({
            succes: true,
            msj: 'Contraseña actualizado con exito',
        });

    } catch (error) {
        res.status(500).json({
            succes: true,
            msj: 'No se pudo actualizar la contraseña',
            error
        })
    }
}

export const deleteUser = async (req, res) =>{
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { estado: false}, { new: true });
        const autheticatedUser = req.user;
        
        res.status(200).json({
            success: true,
            msg: 'Usuario desactivado',
            user,
            autheticatedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al desactivar usuario',
            error
        })
    }
}

export const asignarCurso = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;

        const course = await Course.findOne({name: data.name});   

        if(!course){
            return res.status(404).json({
                succes: false,
                message: 'No se encontro el curso'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(id).populate({path: 'keeper', match: { status: true }, select: 'name description' });

        if (updatedUser.keeper.length >= 3) {
            return res.status(400).json({
                success: false,
                message: 'El usuario ya tiene el máximo de 3 cursos asignados'
            });
        }       

        updatedUser.keeper.push([course._id]);
        await updatedUser.save();

        res.status(200).json({
            success: true,
            message: 'Curso asignado correctamente',
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error al asignar el curso',
            error
        })
    }
}