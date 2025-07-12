const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get Ticket List
router.get('/tickets', async (req, res) => {
  const { apikey, domain } = req.headers;
  try {
    const response = await axios.get(`https://${domain}.freshdesk.com/api/v2/tickets`, {
      auth: { username: apikey, password: 'X' }
    });
    res.json(response.data);
  } catch (err) {
    console.error('Ticket Fetch Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// ✅ Get ticket details and conversation thread
router.get('/ticket/:id', async (req, res) => {
  const { apikey, domain } = req.headers;
  const ticketId = req.params.id;

  try {
    // Get ticket details
    const ticketDetails = await axios.get(`https://${domain}.freshdesk.com/api/v2/tickets/${ticketId}`, {
      auth: { username: apikey, password: 'X' }
    });

    // Get conversations
    const conversations = await axios.get(`https://${domain}.freshdesk.com/api/v2/tickets/${ticketId}/conversations`, {
      auth: { username: apikey, password: 'X' }
    });

    res.json({
      ticket: ticketDetails.data,
      conversations: conversations.data
    });
  } catch (err) {
    console.error('Ticket Detail Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch ticket details' });
  }
});

module.exports = router;
