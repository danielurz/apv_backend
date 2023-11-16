import jwt from "jsonwebtoken"
import Veterinario from "../models/veterinario.models.js"

export const checkAuth = async (req,res,next) => {

    const auth = req.headers.authorization

    if (auth && auth.startsWith("Bearer")) {
        try {
            const token = auth.split(" ")[1]
            const decoded = jwt.verify(token, process.env.SECRET_JWT)

            req.vet = await Veterinario.findById(decoded.id).select(
                "-password -token -confirmado -createdAt -updatedAt"
            )

            return next()

        } catch (error) {
            return res.status(400).json({error: "Token no valido"})
        }
    }

    res.status(400).json({error: "Token no valido o inexistente"})
}