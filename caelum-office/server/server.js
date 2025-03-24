require('dotenv').config(); // Load environment variables at the top
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const PORT = 3001;

// Initialize OpenAI client with the API key from the .env file
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env file
});

// Middleware
app.use(cors());
app.use(express.json());

// POST endpoint for handling user messages
app.post('/caelum', async (req, res) => {
    const userMessage = req.body.message; // Assuming the user message is sent in the request body
    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: "system", content: "You are Caelum, integrated into Caelum Office." },
                { role: "user", content: userMessage },
            ],
        });

        // Send the AI's reply back to the client
        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error.message);
        res.status(500).json({ error: 'Failed to communicate with OpenAI' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Caelum Office server running on port ${PORT}`);
});