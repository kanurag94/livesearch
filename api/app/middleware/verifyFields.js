// Checks if incoming term is valid or not
checkQuery = (req, res, next) => {
    const {term, offset} = req.query;
    if(term == undefined || term.length<1){
        res.status(400).send({
            message: "Please enter your query",
          });
        return;
    }
    next();
}


const verifyFields = {
    checkQuery: checkQuery,
};

module.exports = verifyFields;