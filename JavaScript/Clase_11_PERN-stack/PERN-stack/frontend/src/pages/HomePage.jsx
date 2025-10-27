import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import Card from '../components/ui/Card.jsx';

function HomePage() {
  const data = useContext(AuthContext);
  console.log(data);
  return (
    <Card>
      <h1 className='font-bold justify-center text-2xl py-4'>
        {" "}
        Desarrollo de una Aplicación PERN con Autenticación y CRUD
      </h1>
      <h3>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Eos reiciendis quis aliquid?
        Quas nesciunt eum porro aliquid quo saepe, optio numquam,
        nobis ratione voluptas harum at architecto ipsam!
        Corrupti sequi praesentium error impedit velit totam dolor natus
        ducimus doloribus veritatis!
      </h3>

    </Card>
  )
}

export default HomePage