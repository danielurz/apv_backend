import mongoose from "mongoose";
import bcrypt from "bcrypt"

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true    
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    telefono: {
        type: String,
        trim: true,
        default: null
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})


veterinarioSchema.statics.hashPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

veterinarioSchema.statics.comparePassword = async (password,hashedPassword) => {
    return await bcrypt.compare(password,hashedPassword)
}

export default mongoose.model("Veterinario", veterinarioSchema)