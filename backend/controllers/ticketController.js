const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// Get user tickets | GET /api/tickets | private
const getTickets = asyncHandler(async (req, res) => {

   // Get user using the id in JWT
   const user = await User.findById(req.user.id);

   if (!user) {
      res.status(401)
      throw new Error('User not found');
   }

   const tickets = await Ticket.find({ user: req.user.id })

   res.status(200).json(tickets);
})

// Create new ticket | POST /api/tickets/create | private
const createTicket = asyncHandler(async (req, res) => {

   const { product, description } = req.body;

   if (!product || !description) {
      res.status(400);
      throw new Error('Please add product and description');
   }

   const user = await User.findById(req.user.id);

   if (!user) {
      res.status(401);
      throw new Error('User not found');
   }

   const ticket = await Ticket.create({
      product,
      description,
      user: req.user.id,
      status: 'new'
   })

   res.status(200).json(ticket);
})

// Get ticket | GET /api/tickets/:id | private
const getOneTicket = asyncHandler(async (req, res) => {
   // Get user using the id in JWT
   const user = await User.findById(req.user.id);

   if (!user) {
      res.status(401)
      throw new Error('User not found');
   }

   const ticket = await Ticket.findById(req.params.id);

   if(!ticket) {
      res.status(404);
      throw new Error('Ticket not found');
   }

   if(ticket.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not Authorized');
   }

   res.status(200).json(ticket);
})

// Delete ticket | DELETE /api/ticket/:id | private
const deleteTicket = asyncHandler(async (req, res) => {

   const user = await User.findById(req.user.id);

   if (!user) {
      res.status(401)
      throw new Error('User not found');
   }

   const ticket = await Ticket.findById(req.params.id);

   if(!ticket) {
      res.status(404);
      throw new Error('Ticket not found');
   }

   if(ticket.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not Authorized');
   }

   await ticket.deleteOne();

   res.status(200).json({success: true});
})

// Update ticket | PUT /api/ticket/:id | private
const updateTicket = asyncHandler(async (req, res) => {

   const user = await User.findById(req.user.id);

   if (!user) {
      res.status(401)
      throw new Error('User not found');
   }

   const ticket = await Ticket.findById(req.params.id);

   if(!ticket) {
      res.status(404);
      throw new Error('Ticket not found');
   }

   if(ticket.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not Authorized');
   }

   const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id, req.body, { new: true} )

   res.status(200).json(updatedTicket);
})

module.exports = {
   getTickets,
   getOneTicket,
   createTicket,
   deleteTicket,
   updateTicket,
}