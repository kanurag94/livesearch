const search = require('../controllers/search.controller')
const verifyFields = require('../middleware/verifyFields')
module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/search", verifyFields.checkQuery, async (req, res) => {
        const {term, offset} = req.query;
        const results = await search.queryTerm(term, offset);

        // sends dictionary containing matching records
        res.send(results['hits']['hits']);
        return;
    });
  };
  