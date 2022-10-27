'use strict';

require('dotenv').config({ path: './.env' });

const connectToDatabase = require('./db');
const Note = require('./models/Note');

// callbackWaitsForEmptyEventLoop – Set to false to send the response right away when the callback runs, instead of waiting for the Node.js event loop to be empty. If this is false, any outstanding events continue to run during the next invocation.

module.exports.create = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase()

    const note = await Note.create(JSON.parse(event.body))

    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          note
        },
        null,
        2
      ),
    };

  } catch(err) {

    return {
      statusCode: err.statusCode || 500,
      body: "Error creating the note",
    };
    
  }
};


module.exports.getOne = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase()

    const note = await Note.findById(event.pathParameters.id)

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          note
        },
        null,
        2
      ),
    };

  } catch(err) {

    return {
      statusCode: err.statusCode || 500,
      body: "Error fetching the note",
    };
    
  }
};


module.exports.getAll = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase()

    const notes = await Note.find()

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          notes
        },
        null,
        2
      ),
    };

  } catch(err) {

    return {
      statusCode: err.statusCode || 500,
      body: "Error fetching the notes",
    };
    
  }
};


module.exports.update = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase()

    const note = await Note.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {new: true})

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          note
        },
        null,
        2
      ),
    };

  } catch(err) {

    return {
      statusCode: err.statusCode || 500,
      body: "Error updating the note",
    };
    
  }
};


module.exports.delete = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase()

    const note = await Note.findByIdAndRemove(event.pathParameters.id)

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Removed note with id: ${note._id}`,
          note,
        },
        null,
        2
      ),
    };

  } catch(err) {

    return {
      statusCode: err.statusCode || 500,
      body: "Error updating the note",
    };
    
  }
};