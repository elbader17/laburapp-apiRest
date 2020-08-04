const sql = require("./db.js");

  // constructor de Personas
const Personas = function(Usuario) {
  // en el "this.atributo" va el nombre que tiene el atributo en la tabla de la DB.
  //del otro lado del "=" va el nombre que le asignamos al objeto? ' persona'- new.Persona-  en usuarios.controllers
  this.UsuarioId = Usuario.usuarioId; // le tenemos q asignar el ID del usuario q se le creo
  this.PersonaNombre = Usuario.personaNombre;
  this.PersonaApellido = Usuario.personaApellido;
  this.PersonaDNI = Usuario.personaDNI;
  this.PersonaFechaNacimiento = Usuario.personaFechaNacimiento;
  this.PersonaDomicilio = Usuario.personaDomicilio;
  this.PersonaTelefono = Usuario.personaTelefono;
  this.PersonaEMail = Usuario.personaEMail;
  this.LocalidadId = Usuario.localidadId; //x default va 1 x ahora (RIo4)
  
};

//armamos la funcion de crear persona
Personas.create = (nuevoUsuario, result) => {
  sql.query("INSERT INTO Persona SET ?", nuevoUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("nuevaPersona creada: ", { id: res.insertId, ...nuevoUsuario });
    result(null, { id: res.insertId, ...nuevoUsuario });
  });
};

module.exports = Personas;