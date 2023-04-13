const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/userModel');

// Get user ticket | GET /api/tickets | private
const getTickets = asyncHandler(async (req, res) => {

   res.status(200).json({message: 'getTickets'});
})

// Create new ticket | POST /api/tickets/create | private
const createTicket = asyncHandler(async (req, res) => {
 
   res.status(200).json({message: 'createTicket'});
})

module.exports = {
   getTickets,
   createTicket
}