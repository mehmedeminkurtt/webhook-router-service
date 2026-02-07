import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

// Main webhook endpoint: receives incoming events
app.post('/webhook', async (req, res) => {
  const { details } = req.body;

  // Basic payload validation
  if (!details || !details.advert || !details.customer) {
    return res.status(400).json({ error: 'Missing required payload fields' });
  }

  const title = details.advert.title.toLocaleLowerCase('tr');
  const ilanid = details.advert.id;
  console.log(`🔔 New incoming event: "${title}" (ID: ${ilanid})`);

  let targetUrl = null;

  // Routing rules based on product title or advert ID
  if (title.includes('call of duty')) {
    targetUrl = 'http://localhost:3000/webhook'; // Route to service A
  } else if (Number(ilanid) === 3512844) {
    targetUrl = 'http://localhost:3001/webhook'; // Route to service B
  } else if (title.includes('oto +')) {
    targetUrl = 'http://localhost:3002/webhook'; // Route to service C
  } else if (Number(ilanid) === 3492000 || Number(ilanid) === 3154155) {
    targetUrl = 'http://localhost:3003/webhook'; // Route to service D
  }

  if (targetUrl) {
    try {
      await axios.post(targetUrl, req.body);
      res.status(200).json({ success: true, message: 'Event routed successfully' });
    } catch (err) {
      console.error('🚨 Routing error:', err.message);
      res.status(500).json({ success: false, message: 'Failed to route event' });
    }
  } else {
    console.log(`⚠️ No matching route found for: ${title} (${ilanid})`);
    res.status(200).json({ success: true, message: 'No matching route found, event not forwarded' });
  }
});

// Start webhook listener service
app.listen(80, () => console.log('🧭 Webhook router is running on port 80'));
