const fs = require("fs");
const alumnosServicio = require("../servicios/alumnoServicio");

exports.traerAlumnos = (req, res) => {
  const alumnos = alumnosServicio.traerAlumnos();
  let html = "<h1>Lista de Alumnos</h1><ul>";
  alumnos.forEach((alumno) => {
    html += `<li>${alumno.nombre} ${alumno.apellido} <a href="/alumnos/${alumno.legajo}">Ver detalles</a></li>`;
  });
  html += "</ul>";
  res.send(html);
};

exports.traerAlumnosLegajo = (req, res) => {
  const legajo = parseInt(req.params.legajo);
  const alumno = alumnosServicio.traerAlumnosLegajo(legajo);
  if (alumno) {
    res.json(alumno);
  } else {
    res.status(404).json({ message: "Alumno no encontrado" });
  }
};

exports.agregarAlumnos = (req, res) => {
  const nuevoAlumno = req.body;
  const alumno = alumnosServicio.agregarAlumnos(nuevoAlumno);
  console.log(alumno, 'alumno agregaralumno controlador')
  console.log(nuevoAlumno)
  res.status(201).json(alumno);
};

exports.agregarAlumnos = (req, res) => {
  const nuevoAlumno = req.body;

  if (!nuevoAlumno.legajo || !nuevoAlumno.nombre || !nuevoAlumno.apellido || !nuevoAlumno.año) {
    res.status(400).json({ message: "Los campos legajo, nombre, apellido y año son obligatorios" });
    return;
  }

  const alumno = alumnosServicio.agregarAlumnos(nuevoAlumno);
  res.status(201).json(alumno);
};


exports.actualizarAlumno = (req, res) => {
  const legajo = parseInt(req.params.legajo);

  const updatedAlumno = req.body;
  const alumno = alumnosServicio.actualizarAlumno(legajo, updatedAlumno);
  if (alumno) {
    res.json(alumno);
    console.log(alumno, 'alumnos actualizaralumnosControlador');
  } else {
    res.status(404).json({ message: "Alumno no encontrado" });
  }
};

exports.eliminarAlumno = (req, res) => {
  const legajo = parseInt(req.params.legajo);

  const alumno = alumnosServicio.eliminarAlumno(legajo);
  if (alumno) {
    res.json({ message: "Alumno eliminado correctamente" });
  } else {
    res.status(404).json({ message: "Alumno no encontrado" });
  }
};
