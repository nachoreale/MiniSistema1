const fs = require("fs");
const alumnosDataPath = "./data/alumnos.json";

exports.traerAlumnos = () => {
  const data = fs.readFileSync(alumnosDataPath, "utf8");
  return JSON.parse(data);
};

exports.traerAlumnosLegajo = (legajo) => {
  const alumnos = this.traerAlumnos();
  return alumnos.find((alumno) => alumno.legajo === legajo);
};

exports.agregarAlumnos = (nuevoAlumno) => {
  const alumnos = this.traerAlumnos();
  alumnos.push(nuevoAlumno);
  console.log(nuevoAlumno, 'nuevo alumno')
  fs.writeFileSync(alumnosDataPath, JSON.stringify(alumnos, null, 2));
  console.log(alumnos, 'alumnos agregaralumnos')
  return nuevoAlumno;
};


exports.actualizarAlumno = (legajo, alumnoActualizado) => {
  const alumnos = this.traerAlumnos();
  const index = alumnos.findIndex((alumno) => alumno.legajo === legajo);
  if (index !== -1) {
    alumnos[index] = { ...alumnos[index], ...alumnoActualizado };
    fs.writeFileSync(alumnosDataPath, JSON.stringify(alumnos, null, 2));
    return alumnos[index];
  }
  return null;
};


exports.eliminarAlumno = (legajo) => {
  const alumnos = this.traerAlumnos();
  const index = alumnos.findIndex((alumno) => alumno.legajo === legajo);
  if (index !== -1) {
    const deletedAlumno = alumnos.splice(index, 1)[0];
    fs.writeFileSync(alumnosDataPath, JSON.stringify(alumnos, null, 2));
    return deletedAlumno;
  } else {
    return null;
  }
};
