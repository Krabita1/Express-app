module.exports = app => {
    const mountains = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    // Create a new Mountain
    router.post("/", mountains.create);

    // Get a file with mountains
    router.post("/upload", mountains.postFile);
  
    // Retrieve all mountains
    router.get("/", mountains.findAll);
  
    // Retrieve a single Mountain with id
    router.get("/:id", mountains.findOne);
  
    // Update a Mountain with id
    router.put("/:id", mountains.update);
  
    // Delete a Mountain with id
    router.delete("/:id", mountains.delete);
  
    // Create a new Mountain
    router.delete("/", mountains.deleteAll);
  
    app.use('/api/mountains', router);
  };