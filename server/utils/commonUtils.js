const response = (res, status, httpStatusCode, message, data = null) => {

    const responseJSON = {
        status,
        message,
    }
    
    if (data) {
        responseJSON.data = data;
    }

    return res.status(httpStatusCode).json(responseJSON);
};

module.exports = response;