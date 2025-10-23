import { Button, Card, Input } from "../components/ui";
import { useForm } from "react-hook-form";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  //   const response = await fetch("http://localhost:3000/api/signup", {
  //     credentials: "include",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   const responseData = await response.json();
  //   console.log(responseData);
  // });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3 className="text-2xl font-bold">Registro</h3>

        <form onSubmit={onSubmit}>
          <Input placeholder="Ingrese su nombre" {...register("name", {required:true})} />
          {errors.name && <span className="text-red-500">Este campo es requerido</span>}
          <Input type="email" placeholder="Ingrese su email" {...register("email", {required:true})} />
          {errors.name && <span className="text-red-500">Este campo es requerido</span>}
          <Input type="password" placeholder="Ingrese su contraseña" {...register("password", {required:true})} />
          {errors.name && <span className="text-red-500">Este campo es requerido</span>}
          <Button>Registrarse</Button>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;