import { Card, Button } from '../ui';
import { eliminarTareaRequest } from '../../api/tareas.api';

export function CardTareas({ tarea }) {
  return (
    <Card key={tarea.id} className="py-4 px-7">
      <div>
        <h1 className="text-2xl font-bold">{tarea.titulo}</h1>
        <p>{tarea.descripcion}</p>
      </div>
      <div className="flex justify-end gap-x-2">
        <Button>Editar</Button>
        <Button variant="danger" className="bg-red-500 hover:bg-red-700" onClick={async () => {
          if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
            await eliminarTareaRequest(tarea.id);
          }
        }}>
          Eliminar
        </Button>
      </div>
    </Card>
  );
}

export default CardTareas;