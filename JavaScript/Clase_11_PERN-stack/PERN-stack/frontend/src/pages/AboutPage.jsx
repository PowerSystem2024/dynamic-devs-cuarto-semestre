import React from 'react'

function AboutPage() {
  return (
    <div>
      <h1 className='text-center font-bold py-4 px-3 text-4xl'>Tecnologías Utilizadas</h1>
      <h2 className='text-2xl py-4 px-2'>
        Antes de profundizar en el desarrollo, echamos un vistazo a las
        tecnologías clave que utilizamos en este proyecto.
      </h2>
      <h3 className='py-4 px-2'>
        ¨{" "}
        PostgreSQL: una potente base de datos relacional que almacenará nuestros
        datos de usuario y tareas. <br />
        Express.js: un framework web para Node.js que nos ayudará a construir
        nuestra API de manera eficiente. <br />
        React.js: una biblioteca de JavaScript para construir interfaces de usuario
        interactivas y dinámicas. <br />
        Node.js: un entorno de ejecución de JavaScript del lado del servidor que
        nos permitirá crear nuestra aplicación backend. <br />
        JWT (JSON Web Tokens): una forma segura de manejar la autenticación y
        autorización de usuarios. <br />
      </h3>
    </div>
  )
}

export default AboutPage
