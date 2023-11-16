import Paciente from "../models/paciente.models.js"

export const agregarPaciente = async (req,res) => {
    try {
        const newPaciente = new Paciente(req.body)
        await newPaciente.save()

        res.json({success:"Paciente creado",id: newPaciente._id})
    } catch (error) {
        res.json({serverError: error.message})
        console.log(error.message)
    }
}


export const obtenerPacientes = async (req,res) => {
    try {
        const pacientes = await Paciente.find().where({
            veterinarioId: req.params.vetId
        }).select(
            "-createdAt -updatedAt -veterinarioId"
        )

        res.json(pacientes)
    } catch (error) {
        res.json({serverError: error.message})
        console.log(error)
    }
}


export const obtenerPaciente = async (req,res) => {
    try {
        const paciente = await Paciente.findById(req.params.id).where({
            veterinarioId: req.vet._id
        })
        if (!paciente) res.status(400).json({error:"Paciente no encontrado"})

        res.json(paciente)
    } catch (error) {
        console.log(error)
    }
}


export const actualizarPaciente = async (req,res) => {
    try {
        const paciente = await Paciente.findByIdAndUpdate(req.body._id,req.body).where({
            veterinarioId: req.params.vetId
        })
        
        if (!paciente) return res.status(400).json({error: "Paciente no encontrado"})
        res.json({success:"Paciente actualizado"})
    
    } catch (error) {
        res.json({serverError: error.message})
        console.log(error.message)
    }
} 


export const eliminarPaciente = async (req,res) => {
    try {
        const {pacId,vetId} = req.params

        const paciente = await Paciente.findByIdAndDelete(pacId).where({
            veterinarioId: vetId
        })
        
        if (!paciente) return res.status(400).json({error: "Paciente no encontrado"})
        res.json({success:"Paciente eliminado"})
    } catch (error) {
        res.json({serverError: error.message})
        console.log(error.message)
    }
}