import { Card, Input, TextArea, Label, Button } from '../components/ui';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTareas } from '../context/TareasContext';

function TareasFormPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const params = useParams();
  const navigate = useNavigate();
  const { crearTarea, cargarTarea, editarTarea, errors: tareasErrors } = useTareas();

  const onSubmit = handleSubmit(async (data) => {
    if (!params.id) {
      await crearTarea(data);
      navigate('/tareas');
    } else {
      await editarTarea(params.id, data);
      navigate('/tareas');
    }
  });

  useEffect(() => {
    if (params.id) {
      cargarTarea(params.id).then(tarea => {
        setValue('titulo', tarea.titulo);
        setValue('descripcion', tarea.descripcion);
      });
    }
  }, []);

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {
          tareasErrors.map((error, i) => (
            <p key={i} className="bg-red-500 text-white p-2">{error}</p>
          ))
        }
        <h2 className="text-3xl font-bold my-4">{params.id ? 'Editar Tarea' : 'Crear Tarea'}</h2>
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