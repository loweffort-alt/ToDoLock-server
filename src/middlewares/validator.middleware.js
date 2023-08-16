//export const validateSchema = (schema) => (req, res, next) => {
//try {
//schema.parse(req.body);
//next();
//} catch (error) {
//return res.status(400).json({ errors: error.issues.map((e) => e.message) });
//}
//};

//Ambas maneras son correctas de escribir, sólo que no puede pasar como 4 argumentos (req, res, next, schema) porque no me lo permite express. Es necesario hacer currying de funciones

export const validateSchema = (schema) => {
  return function (req, res, next) {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.issues.map((e) => e.message) });
    }
  };
};
