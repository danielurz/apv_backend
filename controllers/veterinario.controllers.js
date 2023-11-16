import Veterinario from "../models/veterinario.models.js"
import {randomUUID} from "crypto"
import { generarJWT } from "../config/jwt.js"
import { emailRegistro, emailOlvidePassword } from "../config/nodemailer.js"

export const registroVet = async (req,res) => {
    try {
        const {email,password,nombre} = req.body

        const existeVet = await Veterinario.findOne({email})
        if (existeVet) return res.status(400).json({error:"Este correo ya se encuentra registrado"})
    
        const newVet = new Veterinario({
            ...req.body,
            password: await Veterinario.hashPassword(password),
            token: randomUUID()
        })
        await newVet.save()

        // Enviar el email
        emailRegistro({
            email,
            nombre,
            token: newVet.token
        })
    
        res.json({success:"Veterinario registrado, revisa tu email"})
    } catch (error) {
        res.json({serverError: error.message})
    }
}


export const confirmarCuenta = async (req,res) => {
    try {
        const existeVet = await Veterinario.findOne({token:req.params.token})
        if (!existeVet) return res.status(400).json({error: "Token invalido"})
    
        existeVet.token = null
        existeVet.confirmado = true
        await existeVet.save()
    
        res.json({success: "Usuario confirmado"})
    } catch (error) {
        console.log(error)
        res.json({serverError: error.message}) 
    }
}


export const loginVet = async (req,res) => {
    try {
        const {email,password} = req.body

        const existeVet = await Veterinario.findOne({email})
        if (!existeVet) return res.status(400).json({error: "Email invalido"})

        const passwordMatches = await Veterinario.comparePassword(password,existeVet.password)
        if (!passwordMatches) return res.status(400).json({error: "Password Incorrecto"})

        if (!existeVet.confirmado) return res.status(400).json({error:"Cuenta no confirmada"})

        res.json({token: generarJWT(existeVet._id)})
    } catch (error) {
        console.log(error)
        res.json({serverError: error.message})
    }
}


export const olvidoPassword = async (req,res) => {
    try {
        const existeVet = await Veterinario.findOne({email: req.body.email})
        if (!existeVet) return res.status(400).json({error:"Este email no se encuentra registrado"})
    
        existeVet.token = randomUUID()
        await existeVet.save()
    
        emailOlvidePassword({
            nombre: existeVet.nombre,
            email: existeVet.email,
            token: existeVet.token,
        })
    
        res.json({success:"Un email fue enviado a su correo con las indicaciones"})
    } catch (error) {
        res.json({serverError: error})
    }
}


export const nuevoPassword = async (req,res) => {
    try {
        const existeVet = await Veterinario.findOne({token: req.params.token})
        if (!existeVet) return res.status(400).json({error:"Token invalido"})
        
        existeVet.password = await Veterinario.hashPassword(req.body.password)
        existeVet.token = null
        await existeVet.save()
    
        res.json({success:"Contraseña restaurada"})
    } catch (error) {
        res.json({serverError: error})
    }
}


export const actualizarVet = async (req,res) => {
    try {
        const existeVet = await Veterinario.findByIdAndUpdate(req.params.vetId,req.body)
        if (!existeVet) return res.status(404).json({error:"Vetetinario no encontrado"})

        res.json({success: "Datos actualizados"})
    } catch (error) {
        res.status(500).json({serverError: "error.message"})
    }
}


export const actualizarPassword = async (req,res) => {
    try {
        const {password, newPassword} = req.body
        const vet = await Veterinario.findById(req.params.vetId)
        const passwordMatches = await Veterinario.comparePassword(password,vet.password)

        if (!passwordMatches) return res.status(404).json({error: "Password incorrecto"})

        vet.password = await Veterinario.hashPassword(newPassword)
        await vet.save()

        res.json({success:"Password Actualizado"})
    } catch (error) {
        res.status(500).json({serverError: "error.message"})
    }
}


export const perfil = async (req,res) => {
    try {
        res.json({data: req.vet})
    } catch (error) {
        console.log(error)
    }
}