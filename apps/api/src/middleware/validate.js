export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validated = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      
      // Replace req with validated data to strip unknown keys
      req.body = validated.body;
      req.query = validated.query;
      req.params = validated.params;
      
      next();
    } catch (error) {
      if (error.name === 'ZodError') {
        const fields = {};
        error.errors.forEach(err => {
          const path = err.path.join('.');
          fields[path] = err.message;
        });
        
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
            fields
          }
        });
      }
      next(error);
    }
  };
};
