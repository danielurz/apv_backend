import {Router} from "express";
import { checkAuth } from "../middlewares/authUser.js";
import { registroVet } from "../controllers/veterinario.controllers.js";
import { loginVet } from "../controllers/veterinario.controllers.js";
import { confirmarCuenta } from "../controllers/veterinario.controllers.js";
import { olvidoPassword } from "../controllers/veterinario.controllers.js";
import { nuevoPassword } from "../controllers/veterinario.controllers.js";
import { actualizarVet } from "../controllers/veterinario.controllers.js";
import { actualizarPassword } from "../controllers/veterinario.controllers.js";
import { perfil } from "../controllers/veterinario.controllers.js";

const router = Router()

// Area publica
router.post("/", registroVet)
router.post("/login", loginVet)
router.get("/confirmar-cuenta/:token", confirmarCuenta) 

router.post("/olvido-password", olvidoPassword)
router.put("/actualizar-datos/:vetId", actualizarVet)
router.put("/actualizar-password/:vetId", actualizarPassword)
router.post("/nuevo-password/:token", nuevoPassword)

// Area privada
router.get("/perfil", checkAuth, perfil)
export default router 