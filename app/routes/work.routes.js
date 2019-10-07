module.exports = (app) => {
    const works = require('../controllers/work.controller.js');

    // Create a new Note
    app.post('/works', works.create);

    // Retrieve all works
    app.get('/works', works.findAll);

    // Retrieve a single Note with noteId
    app.get('/works/:workId', works.findOne);

    // Update a Note with noteId
    app.put('/works/:workId', works.update);

    // Delete a Note with noteId
    app.delete('/works/:workId', works.delete);
}