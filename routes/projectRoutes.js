// Dependencies
const express = require('express');
const helpers = require('../data/helpers/projectModel');
const router = express.Router();


// GET All Projects
router.get('/', (req, res, next) => {
  helpers.get(req.data)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({message: 'Error receiving projects'})
      })
});

// GET Single Project
router.get('/:id', (req, res, next) => {
  if (req.params.id) {
    helpers.get(req.params.id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({message: 'There was a problem with the server'})
      })
  }  else {
      return res.status(404).json({message: 'No project found'})
    }
})

// INSERT New Project
router.post("/", (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({message: 'Error: Please be sure to add a title and description'})
  }
    helpers.insert(req.body)
      .then((project) => {
        res.status(201).json(project)
      })
      .catch((err) => {
        res.status(500).json({message: 'Something went wrong', err})
      })
})

// PATCH Project
router.patch("/:id", (req, res) => {
  if (!req.params.id) {
    console.log("No project with that id.")
    return null;
  }
  helpers.update(req.params.id, req.body)
    .then((project) => {
      if (project) {
        res.status(200).json(project)
      } else {
          res.status(404).json({message: "Not found"})
      }
    })
    .catch(() => {
      res.status(500).json({message: "There was an error updating the project"})
    })
})

// DELETE Project
router.delete("/:id", (req, res) => {
  helpers.remove(req.params.id)
    .then((count) => {
      res.status(200).json(count)
    })
    .catch(() => {
      res.status(500).json({message: "Could not delete project"})
    })
})
module.exports = router;
