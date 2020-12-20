checkQuery = (req, res, next) => {
    const {term, offset} = req.query;
    if(term == undefined || term.length<1){
        res.status(400).send({
            message: "Please enter your query",
          });
        return;
    }
    // if(isNaN(offset) ||  offset < 0) {
    //     res.status(400).send({
    //         message: "Illegal offset",
    //     });
    //     return;
    // }
    next();
}


const verifyFields = {
    checkQuery: checkQuery,
};

module.exports = verifyFields;