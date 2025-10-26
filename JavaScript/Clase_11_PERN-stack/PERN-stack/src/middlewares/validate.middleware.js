export const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    next();
  } catch (error) {
    if (Array.isArray(error.errors)) {
      return res.status(400).json(error.errors.map((error) => error.message));
    }
  }
};
