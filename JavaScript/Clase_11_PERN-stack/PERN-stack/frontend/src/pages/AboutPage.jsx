function AboutPage() {
	return (
		<div>
			<h1 className="text-center font-bold py-4 px-3 text-4xl">Tecnologías Utilizadas</h1>
			<h2 className="text-2xl py-4 px-2">
				Antes de profundizar en el desarrollo, echamos un vistazo a las
				tecnologías clave que utilizamos en este proyecto.
			</h2>
			<ul
				className="py-4 px-2" // Mantenemos las clases de espaciado si son necesarias
				style={{
					fontSize: '1.1rem',      // Tamaño de fuente un poco más grande
					lineHeight: '1.8',       // Mayor separación entre líneas
					listStyleType: 'disc',   // Asegura que se usen puntos (viñetas)
					paddingLeft: '30px',     // Ajusta la sangría de la lista
				}}
			>
				<li>
					<strong>PostgreSQL</strong>: una potente base de datos relacional que almacenará nuestros
					datos de usuario y tareas.
				</li>
				<li>
					<strong>Express.js</strong>: un framework web para Node.js que nos ayudará a construir
					nuestra API de manera eficiente.
				</li>
				<li>
					<strong>React.js</strong>: una biblioteca de JavaScript para construir interfaces de usuario
					interactivas y dinámicas.
				</li>
				<li>
					<strong>Node.js</strong>: un entorno de ejecución de JavaScript del lado del servidor que
					nos permitirá crear nuestra aplicación backend.
				</li>
				<li>
					<strong>JWT (JSON Web Tokens)</strong>: una forma segura de manejar la autenticación y
					autorización de usuarios.
				</li>
			</ul>
		</div>
	)
}

export default AboutPage