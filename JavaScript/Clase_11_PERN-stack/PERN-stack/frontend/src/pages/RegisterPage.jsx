import { Button, Card, Container, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, errors: setUserErrors } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);
    if (user) {
      navigate("/tareas");
    }
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {
          setUserErrors && setUserErrors.map((error) => (
            <p className="bg-red-500 text-white p-2">{error}</p>
          ))
        }
        <h3 className="text-4xl font-bold my-2">Registro</h3>

        <form onSubmit={onSubmit}>
          <Label htmlFor="name">Nombre</Label>
          <Input placeholder="Ingrese su nombre" {...register("name", { required: true })} />
          {errors.name && <span className="text-red-500">Este campo es requerido</span>}
          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="Ingrese su email" {...register("email", { required: true })} />
          {errors.email && <span className="text-red-500">Este campo es requerido</span>}
          <Label htmlFor="password">Contraseña</Label>
          <Input type="password" placeholder="Ingrese su contraseña" {...register("password", { required: true })} />
          {errors.password && <span className="text-red-500">Este campo es requerido</span>}
          <Button>Registrarse</Button>
        </form>
        <div className="flex justify-between my-4">
          <p className="mr-4">¿Ya tienes una cuenta?</p>
          <Link to="/login">Inicia sesión</Link>
        </div>
      </Card>
    </Container>
  );
}

export default RegisterPage;