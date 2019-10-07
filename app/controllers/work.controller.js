const Work = require('../models/work.model.js');
var moment = require('moment');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.time) {
        return res.status(400).send({
            message: "Work time can not be empty"
        });
    }

    // Create a Note
    const work = new Work({
        action: req.body.action || [],
        time: moment().add(req.body.time, 'm').toDate(),
        parent: req.body.parent,
        parentId: req.body.parentId,
        name: req.body.name
    });

    // Save Note in the database
    work.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Work.find()
    .then(works => {
        res.send(works);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Work.findById(req.params.workId)
    .then(work => {
        if(!work) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.workId
            });            
        }
        res.send(work);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Work not found with id " + req.params.workId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.workId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Work content can not be empty"
        });
    }

    // Find note and update it with the request body
    Work.findByIdAndUpdate(req.params.workId, {
        action: req.body.action || [],
        time: moment().add(req.body.time, 'm').toDate(),
        parent: req.body.parent,
        parentId: req.body.parentId,
        name: req.body.name
    }, {new: true})
    .then(work => {
        if(!work) {
            return res.status(404).send({
                message: "Work not found with id " + req.params.workId
            });
        }
        res.send(work);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Work not found with id " + req.params.workId
            });                
        }
        return res.status(500).send({
            message: "Error updating work with id " + req.params.workId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Work.findByIdAndRemove(req.params.workId)
    .then(work => {
        if(!work) {
            return res.status(404).send({
                message: "Work not found with id " + req.params.workId
            });
        }
        res.send({message: "Work deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Work not found with id " + req.params.workId
            });
        }
        return res.status(500).send({
            message: "Could not delete work with id " + req.params.workId
        });
    });
};
