const { mountains } = require("../models");
const db = require("../models");
const Mountain = db.mountains;
const multer = require('multer');

// Create and Save a new Mountain
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Mountain
    const mountain = new Mountain({
      name: req.body.name,
      height: req.body.height,
    });
  
    // Save Mountain in the database
    mountain
      .save(mountain)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Mountain."
        });
      });
  };

  var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './uploads');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    }
 });
  var upload = multer({storage: storage}).single("avatar");


  exports.postFile = (req, res) => {
   upload(req, res, (err) => {
      if(err) {
        res.status(400).send("Something went wrong!");
      } else {
          const  fs = require('fs');

          var fileString = fs.readFileSync('./uploads/' + req.file.originalname).toString();
          var fileObj = JSON.parse(fileString);
        //  db.mountains.insertMany(fileObj.mountains);
          
          //send response
          res.send(fileObj.mountains);
      }
  });  
};

// Retrieve all mountains from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Mountain.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving mountains."
        });
      });
  };

// Find a single Mountain with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Mountain.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Mountain with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Mountain with id=" + id });
      });
  };

// Update a Mountain by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Mountain.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Mountain with id=${id}. Maybe Mountain was not found!`
          });
        } else res.send({ message: "Mountain was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Mountain with id=" + id
        });
      });
  };

// Delete a Mountain with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Mountain.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Mountain with id=${id}. Maybe Mountain was not found!`
          });
        } else {
          res.send({
            message: "Mountain was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Mountain with id=" + id
        });
      });
  };

// Delete all mountains from the database.
exports.deleteAll = (req, res) => {
    Mountain.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} mountains were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all mountains."
        });
      });
  };
