const sql = require("./db.js");

// constructor de USUARIO
// en el this. va el nombre q tiene el atributo en la DB. Del otro lado del =, el nombre del parametro que recibe
const Usuarios = function(Usuario) {
  
  this.UsuarioNombre = Usuario.nombreUsuario;
  this.UsuarioContrasena = Usuario.contrasenaUsuario;
  this.TipoUsuarioId = Usuario.tipoUsuarioId;
  this.UsuarioEstado = Usuario.estadoUsuario;
};


Usuarios.create = (nuevoUsuario,result,status) => {
  sql.query('SELECT * FROM Usuario WHERE UsuarioNombre = ?', [nuevoUsuario.UsuarioNombre], (err, res) =>{ //chequeamos el nombre de usuario no este en uso
    if (res.length) { //si encuentra algo, nos develve error
      console.log(nuevoUsuario)
      console.log('nombre de usuario ya en uso', nuevoUsuario.UsuarioNombre);
      result({
        message: 'usuario ya en uso'
      });
      return;
      }else { //si no encuentra nada en la db con ese nombre de usuario,crea uno nuevo y lo inserta.
        sql.query("INSERT INTO Usuario SET ?", nuevoUsuario, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          //aca mandamos un mensajito a consola,status OK y el ID del usuario creado en idUsuario, q sirve para persona, lo captamos en USUARIOS.CONTROLLERS
          console.log("usuario creado: ", { idUsuario: res.insertId, ...nuevoUsuario });
          result(status==='ok',{idUsuario: res.insertId, ...nuevoUsuario, messageOk :'Usuario registrado con exitoxxx'});          

        });//fin insert in usuario
      }; //fin else
  });
};

  


// Usuarios.findById = (UsuarioId, result) => {
//   sql.query(`SELECT * FROM usuario WHERE id = ${UsuarioId}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("usuario encontrado : ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Usuarios with the id
//     result({ kind: "not_found" }, null);
//   });
// };

Usuarios.getAll = result => {
  sql.query("SELECT * FROM Usuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("Lista usuarios: ", res);
    result(null, res);
  });
};

// Usuarios.updateById = (id, Usuario, result) => {
//   sql.query(
//     "UPDATE usuario SET emailUsu = ?, nombreUsu = ?, estadoUsu = ? WHERE idUsu = ?",
//     [Usuario.email, Usuario.nombre, Usuario.estado, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Usuarios with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("Usuario actualizado: ", { id: id, ...Usuario });
//       result(null, { id: id, ...Usuarios });
//     }
//   );
// };

// Usuarios.remove = (id, result) => {
//   sql.query("DELETE FROM usuario WHERE idUsu = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Usuarios with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("Usuario con el id:< ", id, " > eliminado exitosamente");
//     result(null, res);
//   });
// };

// Usuarios.removeAll = result => {
//   sql.query("DELETE FROM usuario", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`Se borraron ${res.affectedRows} usuarios de la base de datos`);
//     result(null, res);
//   });
// };

module.exports = Usuarios;