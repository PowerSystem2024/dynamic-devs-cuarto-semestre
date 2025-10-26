import { useEffect } from 'react'
import { CardTareas } from '../components/tareas/CardTareas';
import { useTareas } from '../context/TareasContext';

function TareasPage() {
  const { tareas, listarTareas } = useTareas();

  useEffect(() => {
    listarTareas();
  }, [])

  return (
    <div className='grid grid-cols-3 gap-2'>
      {
        tareas.map((tarea) => (
          <CardTareas key={tarea.id} tarea={tarea} />
        ))
      }
    </div>
  )
}

export default TareasPage