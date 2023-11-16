import { Router } from "express";
import { agregarPaciente } from "../controllers/paciente.contollers.js";
import { obtenerPacientes } from "../controllers/paciente.contollers.js";
import { actualizarPaciente } from "../controllers/paciente.contollers.js";
import { eliminarPaciente } from "../controllers/paciente.contollers.js";

const router = Router()

router.post("/", agregarPaciente)
router.get("/:vetId", obtenerPacientes)

router.delete("/:pacId/:vetId", eliminarPaciente)
router.put("/:vetId",actualizarPaciente)

export default router