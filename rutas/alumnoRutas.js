const express = require("express");
const router = express.Router();
const alumnosControlador = require("../controladores/alumnosControlador");

router.get("/", (req, res) => {
  res.send(
    '<a href="/alumnos">Lista de Alumnos</a>'
  );
});

router.get("/alumnos", alumnosControlador.traerAlumnos);
router.get("/alumnos/:legajo", alumnosControlador.traerAlumnosLegajo);
router.post("/alumnos", alumnosControlador.agregarAlumnos);
router.put("/alumnos/:legajo", alumnosControlador.actualizarAlumno);
router.delete("/alumnos/:legajo", alumnosControlador.eliminarAlumno);

module.exports = router;
