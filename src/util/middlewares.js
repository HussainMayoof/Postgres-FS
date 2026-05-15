const errorHandler = (error, req, res, next) => {
    console.log(error.message);

    if (error.name === 'SequelizeValidationError') {
        return res.status(400).send({ error: 'Invalid body data' });
    }

    next(error);
};

export { errorHandler };
