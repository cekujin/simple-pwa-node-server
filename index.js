const express = require('express');
const webPush = require('web-push');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(express.json());

const publicVapidKey = "BJVJ68dfNQeovIBGRPkoRA3wGa-S64U6zaPIrafZq34tXKls7gNhyYLd6VewaCtXCS1FYZYolc5BQpFrI3fhr4Y";
const privateVapidKey = "7ewchebkY-ghftm03v2eBGFBayxKlVF0gCdHSj4pWpc";

// Vapid key is used to identify who's sending the notification
webPush.setVapidDetails('mailto:testmail@gmail.com', publicVapidKey, privateVapidKey);

// Subscribe route
app.post('/subscribe', (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({ title: "Push test from server", body: "Greetings from server." });

    webPush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));