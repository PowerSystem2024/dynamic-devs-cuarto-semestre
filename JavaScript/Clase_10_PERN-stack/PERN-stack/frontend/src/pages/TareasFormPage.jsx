import { Card, Input, TextArea, Label, Button } from '../components/ui';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { crearTareaRequest } from '../api/tareas.api';
import { useState } from 'react';

function TareasFormPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [postError, setPostError] = useState([]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await crearTareaRequest(data);
      navigate('/tareas');
    } catch (error) {
      setPostError([error.response.data.message]);
    }
  });
  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {
          postError.map((error, i) => (
            <p key={i} className="bg-red-500 text-white p-2">{error}</p>
          ))
        }
        <h2 className="text-3xl font-bold my-4">Formulario de Tareas</h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="titulo">Título</Label>
          <Input type="text" placeholder="Título de la tarea" id="titulo" autoFocus {
            ...register('titulo', { required: true })
          } />
          {errors.titulo && (<p className="text-red-500">El título es requerido</p>)}
          <Label htmlFor="descripcion">Descripción</Label>
          <TextArea type="text" placeholder="Descripción de la tarea" id="descripcion" row={3} {
            ...register('descripcion')
          } />

          <Button>Guardar</Button>
        </form>
      </Card>
    </div>
  )
}

export default TareasFormPage