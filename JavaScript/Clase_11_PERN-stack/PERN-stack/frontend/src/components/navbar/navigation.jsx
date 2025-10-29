import { MdAddTask } from 'react-icons/md';
import { BiTask, BiUserCircle } from 'react-icons/bi';

export const PublicRoutes = [
  { name: "About", path: "/about" },
  { name: "Iniciar Sesión", path: "/login" },
  { name: "Registro", path: "/register" }
];

export const PrivateRoutes = [
  { name: "Perfil", path: "/perfil", icon: <BiUserCircle /> },
  { name: "Tareas", path: "/tareas", icon: <BiTask /> },
  { name: "Agregar", path: "/tareas/crear", icon: <MdAddTask /> }
];
