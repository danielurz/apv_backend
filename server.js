import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { conexionDB } from "./config/db.js"
import veterinarioRouter from "./routes/veterinario.routes.js"
import pacienteRouter from "./routes/paciente.routes.js"

const app = express()

app.use(cors())
dotenv.config()
conexionDB()
app.use(express.json())

app.use("/vet", veterinarioRouter)
app.use("/pac", pacienteRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("Server listening in port 4000")
})