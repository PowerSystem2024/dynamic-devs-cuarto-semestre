import axios from './axios';

export const crearTareaRequest = async (tarea) => await axios.post('/tareas', tarea)

export const obtenerTareasRequest = async () => await axios.get('/tareas')

export const eliminarTareaRequest = async (id) => await axios.delete(`/tareas/${id}`)

export const obtenerTareaRequest = async (id) => await axios.get(`/tareas/${id}`)

export const actualizarTareaRequest = async (id, tarea) => await axios.put(`/tareas/${id}`, tarea)
