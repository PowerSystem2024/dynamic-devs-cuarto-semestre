import { z } from "zod";

export const signupSchema = z.object({
  name: z.string({
    required_error: "El nombre es obligatorio",
    invalid_type_error: "El nombre debe ser una cadena de texto",
  }).min(1, {
    message: "El nombre debe tener al menos 1 carácter",
  }).max(255, {
    message: "El nombre debe tener como máximo 255 caracteres",
  }),
  email: z.email({
    required_error: "El email es obligatorio",
    invalid_type_error: "El email debe ser una cadena de texto",
  }),
  password: z.string({
    required_error: "La contraseña es obligatoria",
    invalid_type_error: "La contraseña debe ser una cadena de texto",
  }).min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }).max(255, {
    message: "La contraseña debe tener como máximo 255 caracteres",
  }),
});

export const signinSchema = z.object({
  email: z.email({
    required_error: "El email es obligatorio",
    invalid_type_error: "El email debe ser una cadena de texto",
  }),
  password: z.string({
    required_error: "La contraseña es obligatoria",
    invalid_type_error: "La contraseña debe ser una cadena de texto",
  }).min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }).max(255, {
    message: "La contraseña debe tener como máximo 255 caracteres",
  }),
});
