import { z } from "zod";

export const crearTareaSchema = z.object({
  titulo: z.string({
    required_error: "El título es obligatorio",
    invalid_type_error: "El título debe ser una cadena de texto",
  }).min(1, {
    message: "El título debe tener al menos 1 carácter",
  }).max(250, {
    message: "El título debe tener como máximo 250 caracteres",
  }),
  descripcion: z.string({
    required_error: "La descripción es obligatoria",
    invalid_type_error: "La descripción debe ser una cadena de texto",
  }).min(0, {
    message: "La descripción debe tener al menos 1 carácter",
  }).max(500, {
    message: "La descripción debe tener como máximo 500 caracteres",
  }).optional(),
});

export const updateTareaSchema = z.object({
  titulo: z.string({
    required_error: "El título es obligatorio",
    invalid_type_error: "El título debe ser una cadena de texto",
  }).min(1, {
    message: "El título debe tener al menos 1 carácter",
  }).max(250, {
    message: "El título debe tener como máximo 250 caracteres",
  }).optional(),
  descripcion: z.string({
    required_error: "La descripción es obligatoria",
    invalid_type_error: "La descripción debe ser una cadena de texto",
  }).min(0, {
    message: "La descripción debe tener al menos 1 carácter",
  }).max(500, {
    message: "La descripción debe tener como máximo 500 caracteres",
  }).optional(),
});
