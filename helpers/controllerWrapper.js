function controllerWrapper(controller) {
  const fn = async (req, res, next) => {
    try {
      // console.log(1);
      await controller(req, res);
    } catch (error) {
      // console.log(2);
      next(error);
    }
  };
  return fn;
}

module.exports = controllerWrapper;
