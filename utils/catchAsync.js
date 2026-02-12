module.exports = fn => {
    return (req, res, next) => {
        // fn(req,res,next).catch(err=> next(err));
        //can also write
        fn(req, res, next).catch(next);
    };
};