const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle ticket submissions
app.post('/submit-ticket', async (req, res) => {
    try {
        const { name, email, description } = req.body;
        const ticketRef = db.collection('tickets').doc();
        await ticketRef.set({
            id: ticketRef.id,
            name,
            email,
            description,
            createdAt: new Date().toISOString(),
        });

        res.status(200).send({ success: true, message: 'Ticket submitted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Error submitting ticket.' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
