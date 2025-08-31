
-- Comenzamos con CRUD: create(insertar), read(leer), update(actualizar), delete(eliminar)
-- Listar los estudiantes (read)
SELECT * FROM estudiantes.estudiantes2025;
-- Insertar estudiante
INSERT INTO estudiantes.estudiantes2025(nombre, apellido, telefono, email) VALUES ("Juan", "Perez", "2604886655", "juan@mail.com");
-- Update 
UPDATE estudiantes.estudiantes2025 SET nombre="Juan Carlos", apellido="Garcia" WHERE idestudiantes2025= 1;
-- Delete
DELETE FROM estudiantes.estudiantes2025 WHERE idestudiantes2025=3;
-- Para modificar el ID y comience en 1
ALTER TABLE estudiantes.estudiantes2025 AUTO_INCREMENT = 1;