const express = require('express')
const app = express()
const con = require('./config')

app.get('/donor', (req, res) => {

    con.query("SELECT * FROM donor", (err, result) => {
        if (err) {
            res.send("Error occurred while fetching data")
        }
        else {
            res.send(result)
        }
    })

})
app.get('/donee', (req, res) => {

    con.query("SELECT * FROM donee", (err, result) => {
        if (err) {
            res.send("Error occurred while fetching data")
        }
        else {
            res.send(result)
        }
    })

})
app.get('/donation', (req, res) => {

    con.query("SELECT * FROM donation", (err, result) => {
        if (err) {
            res.send("Error occurred while fetching data")
        }
        else {
            res.send(result)
        }
    })

})
app.get('/review', (req, res) => {

    con.query("SELECT * FROM review", (err, result) => {
        if (err) {
            res.send("Error occurred while fetching data")
        }
        else {
            res.send(result)
        }
    })

})
app.get('/feedback', (req, res) => {

    con.query("SELECT * FROM feedback", (err, result) => {
        if (err) {
            res.send("Error occurred while fetching data")
        }
        else {
            res.send(result)
        }
    })

})


app.get('/donor/:id', (req, res) => {
    const donorId = req.params.id;
    const sql = 'SELECT * FROM Donor WHERE donorId = ?';

    con.query(sql, [donorId], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Donor not found' });
            return;
        }
        res.json(result[0]);
    });
});



// POST Create Donor
app.post('/donor', (req, res) => {
    const { name, orgName, latitude, longitude, geohash, avgRatings } = req.body;
    const sql = 'INSERT INTO Donor (name, orgName, latitude, longitude, geohash, avgRatings) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [name, orgName, latitude, longitude, geohash, avgRatings], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(201).json({ message: 'Donor created successfully' });
    });
});


// -----------------donee

// GET Donee by ID
app.get('/donee/:id', (req, res) => {
    const doneeId = req.params.id;
    const sql = 'SELECT * FROM Donee WHERE doneeId = ?';

    db.query(sql, [doneeId], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Donee not found' });
            return;
        }
        res.json(result[0]);
    });
});

// POST Create Donee
app.post('/donee', (req, res) => {
    const { doneeName, latitude, longitude, geohash } = req.body;
    const sql = 'INSERT INTO Donee (doneeName, latitude, longitude, geohash) VALUES (?, ?, ?, ?)';

    db.query(sql, [doneeName, latitude, longitude, geohash], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(201).json({ message: 'Donee created successfully' });
    });
});

//   ----------------- review ----------------

// GET Review by ID
app.get('/review/:id', (req, res) => {
    const reviewId = req.params.id;
    const sql = 'SELECT * FROM Review WHERE reviewId = ?';

    db.query(sql, [reviewId], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Review not found' });
            return;
        }
        res.json(result[0]);
    });
});

// POST Create Review
app.post('/review', (req, res) => {
    const { doneeId, donorId, reviewTitle, reviewDescription, rating } = req.body;
    const sql = 'INSERT INTO Review (doneeId, donorId, reviewTitle, reviewDescription, rating) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [doneeId, donorId, reviewTitle, reviewDescription, rating], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(201).json({ message: 'Review created successfully' });
    });
});

//   ------------- donation -------------


// GET Donation by ID
app.get('/donation/:id', (req, res) => {
    const donationId = req.params.id;
    const sql = 'SELECT * FROM Donation WHERE donationId = ?';

    db.query(sql, [donationId], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Donation not found' });
            return;
        }
        res.json(result[0]);
    });
});

// POST Create Donation
app.post('/donation', (req, res) => {
    const { donorId, donationName, donationType, noOfDonations, donationDescription, donationExpiry, donationPickupLatitude, donationPickupLongitude, donationPickupGeohash } = req.body;
    const sql = 'INSERT INTO Donation (donorId, donationName, donationType, noOfDonations, donationDescription, donationExpiry, donationPickupLatitude, donationPickupLongitude, donationPickupGeohash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [donorId, donationName, donationType, noOfDonations, donationDescription, donationExpiry, donationPickupLatitude, donationPickupLongitude, donationPickupGeohash], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(201).json({ message: 'Donation created successfully' });
    });
});

//   ------------- feedback -------------

// GET Feedback by ID
app.get('/feedback/:id', (req, res) => {
    const feedbackId = req.params.id;
    const sql = 'SELECT * FROM Feedback WHERE feedbackId = ?';

    db.query(sql, [feedbackId], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Feedback not found' });
            return;
        }
        res.json(result[0]);
    });
});

// POST Create Feedback
app.post('/feedback', (req, res) => {
    const { donationId, feedbackTitle, feedbackDescription, doneeId } = req.body;
    const sql = 'INSERT INTO Feedback (donationId, feedbackTitle, feedbackDescription, doneeId) VALUES (?, ?, ?, ?)';

    db.query(sql, [donationId, feedbackTitle, feedbackDescription, doneeId], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(201).json({ message: 'Feedback created successfully' });
    });
});


app.listen(5000, () => {
    console.log("listening on port 5000");
})
