const express = require('express');
const router = express.Router();
const {
   getTickets,
   getOneTicket,
   createTicket,
   deleteTicket,
   updateTicket,
} = require('../controllers/ticketController');


const { protect } = require('../middleware/authMiddleware');

router.route('/')
   .get(protect, getTickets)
   .post(protect, createTicket);

router.route('/:id')
   .get(protect, getOneTicket)
   .delete(protect, deleteTicket)
   .put(protect, updateTicket);

module.exports = router;
