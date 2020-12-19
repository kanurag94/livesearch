const search = require('../controllers/search.controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/search", function(req, res){
        const {term, offset} = req.query;
        res.body = search.queryTerm(term, offset);
        res.send(res.body);
        return;
    });
  };
  