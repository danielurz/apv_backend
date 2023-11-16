import mongoose from "mongoose"

const pacienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    propietario: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now()
    },
    sintomas: {
        type: String,
        required: true,
        trim: true
    },
    veterinarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Veterinario"
    }
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model("Paciente", pacienteSchema)