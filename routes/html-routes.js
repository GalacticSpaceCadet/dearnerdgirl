
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.



  // cms route loads cms.html
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // blog route loads frontblog.html which will show site visitor noneditable version
  app.get("/frontblog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/frontblog.html"));
  });
//gets the editable blog route for editable content
    app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // authors route loads author-manager.html
  app.get("/authors", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/diaries.html"));
  });

};