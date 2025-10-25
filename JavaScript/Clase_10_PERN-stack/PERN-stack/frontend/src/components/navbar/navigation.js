export const PublicRoutes = [
  { name: "About", path: "/about" },
  { name: "Iniciar Sesión", path: "/login" },
  { name: "Registro", path: "/register" }
];

export const PrivateRoutes = [
  { name: "Perfil", path: "/perfil" },
  { name: "Tareas", path: "/tareas" },
  { name: "Crear Tarea", path: "/tareas/crear" },
  { name: "Editar Tarea", path: "/tareas/editar/:id" }
];
