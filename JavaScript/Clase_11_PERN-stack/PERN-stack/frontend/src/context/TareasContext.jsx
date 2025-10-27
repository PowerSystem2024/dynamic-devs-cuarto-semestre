import { createContext, useState, useContext } from "react";
import { obtenerTareasRequest, eliminarTareaRequest, crearTareaRequest, obtenerTareaRequest, actualizarTareaRequest } from "../api/tareas.api";

const TareaContext = createContext();
export const useTareas = () => {
  const context = useContext(TareaContext);
  if (!context) {
    throw new Error("useTareas must be used within a TareaProvider");
  }
  return context;
}

export const TareaProvider = ({ children }) => {
  const [tareas, setTareas] = useState([]);
  const [errors, setError] = useState([]);

  const listarTareas = async () => {
    const response = await obtenerTareasRequest()
    setTareas(response.data);
  }

  const cargarTarea = async (id) => {
    const res = await obtenerTareaRequest(id);
    return res.data;
  }


  const crearTarea = async (tarea) => {
    try {
      const res = await crearTareaRequest(tarea);
      setTareas([...tareas, res.data]);
      return res.data;
    } catch (error) {
      if (error.response) {
        setError([error.response.data.message]);
      }
    }
  }

  const eliminarTarea = async (id) => {
    const res = await eliminarTareaRequest(id);
    if (res.status === 204) {
      setTareas(tareas.filter(tarea => tarea.id !== id));
    }
  }

  const editarTarea = async (id, tarea) => {
    try {
      const res = await actualizarTareaRequest(id, tarea);
      return res.data;
    } catch (error) {
      if (error.response) {
        setError([error.response.data.message]);
      }
    }
  }

  return (
    <TareaContext.Provider value={{ tareas, listarTareas, eliminarTarea, crearTarea, cargarTarea, errors, editarTarea }}>
      {children}
    </TareaContext.Provider>
  );
};