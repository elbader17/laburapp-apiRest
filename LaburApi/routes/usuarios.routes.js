module.exports = app => {
    const usuarios = require("../controllers/usuarios.controller.js");
  
    // RUta para crear un nuevo usuario. Es la misma que para verlos,pero trabaja con distitnos metodos
    app.post("/usuarios", usuarios.create);

    // app.post("/usuarios", (req,resp));
  
    // Trae todos los usuarios
    app.get("/usuarios", usuarios.findAll);
  
    // // Retrieve a single usuario with usuarioId
    // app.get("/usuarios/:usuarioId", usuarios.findOne);
  
    // // Update a usuario with usuarioId
    // app.put("/usuarios/:usuarioId", usuarios.update);
  
    // // Delete a usuario with usuarioId
    // app.delete("/usuarios/:usuarioId", usuarios.delete);
  
    // // Delete ALL  usuarios
    // app.delete("/usuarios", usuarios.deleteAll);
  };