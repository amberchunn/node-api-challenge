// Dependencies
const express = require('express');
const helpers = require('../data/helpers/actionModel');
const projectActions = require('../data/helpers/projectModel');

const router = express.Router();


// GET All Actions
router.get('/actions', (req, res) => {
  helpers.get(req.data)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({message: `Error: ${err} when receiving the actions`})
      })
});

// GET Single Action
router.get('/actions/:id', (req, res) => {
  if (req.params.id) {
    helpers.get(req.params.id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({message: `Error: ${err} when receiving the action`})
      })
  }  else {
      return res.status(404).json({message: 'No action found'})
    }
})

// GET All Actions for Specific Project
router.get('/:project_id/actions/', (req, res) => {
  const project = req.params.project_id;
  if (project != null) {
    projectActions.getProjectActions(req.params.project_id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({message: `Error: ${err} when receiving the actions`})
      })
  }  else {
      return res.status(404).json({message: 'No project found'})
    }
})

// INSERT New Action
router.post("/actions", (req, res) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    return res.status(400).json({message: 'Error: Please be sure to add a title, description, and note'})
  }
    helpers.insert(req.body)
      .then((project) => {
        res.status(201).json(project)
      })
      .catch((err) => {
        res.status(500).json({message: 'Something went wrong', err})
      })
})

// PATCH Action
router.patch("/actions/:id", (req, res) => {
  if (!req.params.id) {
    console.log("No action with that id.")
    return null;
  }
  helpers.update(req.params.id, req.body)
    .then((action) => {
      if (action) {
        res.status(200).json(action)
      } else {
          res.status(404).json({message: "Not found"})
      }
    })
    .catch(() => {
      res.status(500).json({message: "There was an error updating the action"})
    })
})

// DELETE Action
router.delete("/actions/:id", (req, res) => {

  helpers.remove(req.params.id)
    .then((count) => {
      res.status(200).json(count)
    })
    .catch(() => {
      res.status(500).json({message: "Could not delete Action"})
    })
})
module.exports = router;
