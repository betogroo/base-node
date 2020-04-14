class IndexController {

    //GET    
    index(req, res) {
        res.render("index.ejs");
    }


    // POST
    post(req, res) {
        var { id, name } = req.body
        var data = { id, name }
        res.json(data)
    }


}

module.exports = new IndexController