const express = require('express')
const cors = require('cors')
const app = express()
const con = require('./config')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const bcrypt = require("bcrypt")

app.use(cors())

// =========DONOR API =============================

// 1. Get All Donors
app.get('/api/donors', (req, res) => {
    con.query("SELECT * FROM Donor", (err, result) => {
        if (err) {
            res.send("Error occurred while fetching data");
        } else {
            res.send(result);
        }
    });
});

// 2. Register Donor
app.post('/api/donors/register', async (req, res) => {
    const { name, orgName, email, passwd, latitude, longitude, geohash, avgRatings } = req.body;

    const emailExistsQuery = 'SELECT * FROM donor WHERE email = ?';

    con.query(emailExistsQuery, [email], (err, emailExistsResult) => {
        if (err) {
            console.error('Error checking existing email:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (emailExistsResult.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // bcrypt.hash(passwd, 10, (hashErr, hashedpasswd) => {
        //     if (hashErr) {
        //         console.error('Error hashing passwd:', hashErr);
        //         return res.status(500).json({ error: 'Internal server error' });
        //     }

        const insertDonorQuery = 'INSERT INTO Donor (name, orgName, email, passwd, latitude, longitude, geohash, avgRatings) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        con.query(insertDonorQuery, [name, orgName, email, passwd, latitude, longitude, geohash, avgRatings], (insertErr, insertDonorResult) => {
            if (insertErr) {
                console.error('Error registering donor:', insertErr);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const donorId = insertDonorResult.insertId;
            res.status(201).json({ message: 'Donor registered successfully', donorId });
        });
    });
    // });
});

// 3. Login Donor
app.post('/api/donors/login', (req, res) => {
    const { email, passwd } = req.body;

    // return res.json(passwd);

    const checkEmailQuery = 'SELECT * FROM donor WHERE email = ?';
    con.query(checkEmailQuery, [email], (err, donor) => {

        // return res.json(donor[0].passwd);

        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (donor.length === 0) {
            return res.status(401).json({ error: 'Invalid email or passwd' });
        }

        // Compare passwords directly
        if (passwd !== donor[0].passwd) {
            return res.status(401).json({ error: 'Invalid email or passwd' });
        }

        res.json({ message: 'Login successful' });
    });
});


// 4. Get Donor Details by Donor ID
app.get('/api/donors/:id', (req, res) => {
    const donorId = req.params.id;
    const getDonorQuery = 'SELECT * FROM Donor WHERE donorId = ?';
    con.query(getDonorQuery, [donorId], (err, donors) => {
        if (err) {
            console.error('Error getting donor details:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (donors.length === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        res.json(donors[0]);
    });
});

// 5. Update Donor Details by Donor ID
app.put('/api/donors/:id', (req, res) => {
    const donorId = req.params.id;
    const { name, orgName, latitude, longitude, geohash, avgRatings } = req.body;

    const updateDonorQuery = 'UPDATE Donor SET name = ?, orgName = ?, latitude = ?, longitude = ?, geohash = ?, avgRatings = ? WHERE donorId = ?';
    con.query(updateDonorQuery, [name, orgName, latitude, longitude, geohash, avgRatings, donorId], (err, updateDonorResult) => {
        if (err) {
            console.error('Error updating donor details:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (updateDonorResult.affectedRows === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        res.json({ message: 'Donor updated successfully' });
    });
});

// =========DONOR API  END=============================

// =========DONEE API =============================

// 1. Register Donee
app.post('/api/donees/register', (req, res) => {
    const { doneeName, latitude, longitude, geohash, email, passwd } = req.body;

    // Check if the email already exists
    const emailExistsQuery = 'SELECT * FROM Donee WHERE email = ?';
    con.query(emailExistsQuery, [email], (err, emailExistsResult) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (emailExistsResult.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Insert new donee
        const insertDoneeQuery = 'INSERT INTO Donee (doneeName, latitude, longitude, geohash, email, passwd) VALUES (?, ?, ?, ?, ?, ?)';
        con.query(insertDoneeQuery, [doneeName, latitude, longitude, geohash, email, passwd], (err, insertDoneeResult) => {
            if (err) {
                console.error('Error inserting donee:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const doneeId = insertDoneeResult.insertId;
            res.status(201).json({ message: 'Donee registered successfully', doneeId });
        });
    });
});

// 2. Login Donee
app.post('/api/donees/login', (req, res) => {
    const { email, passwd } = req.body;

    // Check if the email exists
    const checkEmailQuery = 'SELECT * FROM Donee WHERE email = ?';
    con.query(checkEmailQuery, [email], (err, donee) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (donee.length === 0) {
            return res.status(401).json({ error: 'Invalid email or passwd' });
        }

        // Compare passwords directly
        if (passwd !== donee[0].passwd) {
            return res.status(401).json({ error: 'Invalid email or passwd' });
        }

        res.json({ message: 'Login successful' });
    });
});

// 3. Get Donee Details by Donee ID
app.get('/api/donees/:id', (req, res) => {
    const doneeId = req.params.id;
    const getDoneeQuery = 'SELECT * FROM Donee WHERE doneeId = ?';

    con.query(getDoneeQuery, [doneeId], (err, donees) => {
        if (err) {
            console.error('Error getting donee details:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (donees.length === 0) {
            return res.status(404).json({ error: 'Donee not found' });
        }

        res.json(donees[0]);
    });
});

// 4. Get All Donees Details
app.get('/api/donees', (req, res) => {
    const getAllDoneesQuery = 'SELECT * FROM Donee';

    con.query(getAllDoneesQuery, (err, donees) => {
        if (err) {
            console.error('Error getting all donees:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.json(donees);
    });
});

// 5. Update Donee Details by Donee ID
app.put('/api/donees/:id', (req, res) => {
    const doneeId = req.params.id;
    const { doneeName, latitude, longitude, geohash } = req.body;

    const updateDoneeQuery = 'UPDATE Donee SET doneeName = ?, latitude = ?, longitude = ?, geohash = ? WHERE doneeId = ?';
    con.query(updateDoneeQuery, [doneeName, latitude, longitude, geohash, doneeId], (err, updateDoneeResult) => {
        if (err) {
            console.error('Error updating donee details:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (updateDoneeResult.affectedRows === 0) {
            return res.status(404).json({ error: 'Donee not found' });
        }

        res.json({ message: 'Donee updated successfully' });
    });
});

// =========DONEE API  END=============================

// =========DONATION API =============================
// 1. Add Donation
app.post('/api/donations', (req, res) => {
    const { donorId, donationName, donationType, noOfDonations, donationDescription, donationExpiry, donationPickupLatitude, donationPickupLongitude, donationPickupGeohash } = req.body;

    const addDonationQuery = 'INSERT INTO donation (donorId, donationName, donationType, noOfDonations, donationDescription, donationExpiry, donationPickupLatitude, donationPickupLongitude, donationPickupGeohash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    con.query(addDonationQuery, [donorId, donationName, donationType, noOfDonations, donationDescription, donationExpiry, donationPickupLatitude, donationPickupLongitude, donationPickupGeohash], (err, addDonationResult) => {
        if (err) {
            console.error('Error adding donation:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const donationId = addDonationResult.insertId;
        res.status(201).json({ message: 'Donation added successfully', donationId });
    });
});

// 2. Delete Donation
app.delete('/api/donations/:id', (req, res) => {
    const donationId = req.params.id;

    const deleteDonationQuery = 'DELETE FROM donation WHERE donationId = ?';

    con.query(deleteDonationQuery, [donationId], (err, deleteDonationResult) => {
        if (err) {
            console.error('Error deleting donation:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (deleteDonationResult.affectedRows === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }

        res.json({ message: 'Donation deleted successfully' });
    });
});

// 3. Update Donation
app.put('/api/donations/:id', (req, res) => {
    const donationId = req.params.id;
    const { donorId, donationName, donationType, noOfDonations, donationDescription, donationExpiry, donationPickupLatitude, donationPickupLongitude, donationPickupGeohash } = req.body;

    const updateDonationQuery = 'UPDATE Donation SET donorId = ?, donationName = ?, donationType = ?, noOfDonations = ?, donationDescription = ?, donationExpiry = ?, donationPickupLatitude = ?, donationPickupLongitude = ?, donationPickupGeohash = ? WHERE donationId = ?';

    con.query(updateDonationQuery, [donorId, donationName, donationType, noOfDonations, donationDescription, donationExpiry, donationPickupLatitude, donationPickupLongitude, donationPickupGeohash, donationId], (err, updateDonationResult) => {
        if (err) {
            console.error('Error updating donation:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (updateDonationResult.affectedRows === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }

        res.json({ message: 'Donation updated successfully' });
    });
});

// 4. Get Single Donation
app.get('/api/donations/:id', (req, res) => {
    const donationId = req.params.id;

    const getDonationQuery = 'SELECT * FROM Donation WHERE donationId = ?';

    con.query(getDonationQuery, [donationId], (err, donations) => {
        if (err) {
            console.error('Error getting donation details:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (donations.length === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }

        res.json(donations[0]);
    });
});

// 5. Get All Donations
app.get('/api/donations', (req, res) => {
    const getAllDonationsQuery = 'SELECT * FROM Donation';

    con.query(getAllDonationsQuery, (err, donations) => {
        if (err) {
            console.error('Error getting all donations:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.json(donations);
    });
});
// =========DONATION API  END=============================

// =========FEEDBACK API =============================

// 1. Add Feedback
app.post('/api/feedbacks', (req, res) => {
    const { donationId, feedbackTitle, feedbackDescription, doneeId } = req.body;

    const addFeedbackQuery = 'INSERT INTO feedback (donationId, feedbackTitle, feedbackDescription, doneeId) VALUES (?, ?, ?, ?)';

    con.query(addFeedbackQuery, [donationId, feedbackTitle, feedbackDescription, doneeId], (err, addFeedbackResult) => {
        if (err) {
            console.error('Error adding feedback:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const feedbackId = addFeedbackResult.insertId;
        res.status(201).json({ message: 'Feedback added successfully', feedbackId });
    });
});

// 2. Get Feedback
app.get('/api/feedbacks/', (req, res) => {

    const getFeedbacksQuery = 'SELECT * FROM feedback';

    con.query(getFeedbacksQuery, (err, feedbacks) => {
        if (err) {
            console.error('Error getting feedbacks from donation ID:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.json(feedbacks);
    });
});

// 3. Get Feedback from Donation ID
app.get('/api/feedbacks/:id', (req, res) => {
    const donationId = req.params.id;

    const getFeedbacksQuery = 'SELECT * FROM feedback WHERE donationId = ?';

    con.query(getFeedbacksQuery, [donationId], (err, feedbacks) => {
        if (err) {
            console.error('Error getting feedbacks from donation ID:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.json(feedbacks);
    });
});


// =========FEEDBACK API  END=============================
// =========REVIEW API =============================

// 1. Add Review
app.post('/api/reviews', (req, res) => {
    const { doneeId, donorId, reviewTitle, reviewDescription, rating } = req.body;

    const addReviewQuery = 'INSERT INTO review (doneeId, donorId, reviewTitle, reviewDescription, rating) VALUES (?, ?, ?, ?, ?)';

    con.query(addReviewQuery, [doneeId, donorId, reviewTitle, reviewDescription, rating], (err, addReviewResult) => {
        if (err) {
            console.error('Error adding review:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const reviewId = addReviewResult.insertId;
        res.status(201).json({ message: 'Review added successfully', reviewId });
    });
});

// 2. Get All Reviews by Donor ID
app.get('/api/reviews/:id', (req, res) => {
    const donorId = req.params.id;

    const getReviewsQuery = 'SELECT * FROM review WHERE donorId = ?';

    con.query(getReviewsQuery, [donorId], (err, reviews) => {
        if (err) {
            console.error('Error getting reviews by donor ID:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.json(reviews);
    });
});


// =========REVIEW API  END=============================



app.listen(5000, () => {
    console.log("listening on port 5000");
})
