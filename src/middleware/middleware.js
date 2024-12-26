

export const handleError = (err, req, res, next) => {
    try {
        return res.status(err.status || 500).json({
            isSuccess:false,
            message: 'something went wrong',
            error: err.message || err
        })
    } catch (error) {
        return res.status(err.status || 500).json({
            isSuccess:false,
            message:'Failed to handle error properly',
            error: error.message || error
        });
    }
}
