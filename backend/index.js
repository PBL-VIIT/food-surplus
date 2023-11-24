const express = require('express')
const app = express()
const con = require('./config')

// =========DONATION API =============================

// 1. Register Donor
app.post('/api/donors/register', async (req, res) => {
    try {
        const { name, orgName, email, password, latitude, longitude, geohash, avgRatings } = req.body;

        // Check if the email already exists
        const emailExistsQuery = 'SELECT * FROM Donor WHERE email = ?';
        const emailExistsResult = await con.query(emailExistsQuery, [email]);

        if (emailExistsResult.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new donor
        const insertDonorQuery = 'INSERT INTO Donor (name, orgName, email, password, latitude, longitude, geohash, avgRatings) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const insertDonorResult = await con.query(insertDonorQuery, [name, orgName, email, hashedPassword, latitude, longitude, geohash, avgRatings]);

        const donorId = insertDonorResult.insertId;
        res.status(201).json({ message: 'Donor registered successfully', donorId });
    } catch (error) {
        console.error('Error registering donor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. Login Donor
app.post('/api/donors/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email exists
        const checkEmailQuery = 'SELECT * FROM Donor WHERE email = ?';
        const donor = await con.query(checkEmailQuery, [email]);

        if (donor.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, donor[0].password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in donor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3. Get Donor Details by Donor ID
app.get('/api/donors/:id', async (req, res) => {
    try {
        const donorId = req.params.id;
        const getDonorQuery = 'SELECT * FROM Donor WHERE donorId = ?';
        const donors = await con.query(getDonorQuery, [donorId]);

        if (donors.length === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        res.json(donors[0]);
    } catch (error) {
        console.error('Error getting donor details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 4. Get All Donors Details
app.get('/api/donors', async (req, res) => {
    try {
        const getAllDonorsQuery = 'SELECT * FROM Donor';
        const donors = await con.query(getAllDonorsQuery);

        res.json(donors);
    } catch (error) {
        console.error('Error getting all donors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 5. Update Donor Details by Donor ID
app.put('/api/donors/:id', async (req, res) => {
    try {
        const donorId = req.params.id;
        const { name, orgName, latitude, longitude, geohash, avgRatings } = req.body;

        const updateDonorQuery = 'UPDATE Donor SET name = ?, orgName = ?, latitude = ?, longitude = ?, geohash = ?, avgRatings = ? WHERE donorId = ?';
        const updateDonorResult = await con.query(updateDonorQuery, [name, orgName, latitude, longitude, geohash, avgRatings, donorId]);

        if (updateDonorResult.affectedRows === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        res.json({ message: 'Donor updated successfully' });
    } catch (error) {
        console.error('Error updating donor details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =========DONATION API  END=============================

// =========DONEE API =============================

// 1. Register Donee
app.post('/api/donees/register', async (req, res) => {
    try {
        const { doneeName, latitude, longitude, geohash, email, password } = req.body;

        // Check if the email already exists
        const emailExistsQuery = 'SELECT * FROM Donee WHERE email = ?';
        const emailExistsResult = await con.query(emailExistsQuery, [email]);

        if (emailExistsResult.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new donee
        const insertDoneeQuery = 'INSERT INTO Donee (doneeName, latitude, longitude, geohash, email, password) VALUES (?, ?, ?, ?, ?, ?)';
        const insertDoneeResult = await con.query(insertDoneeQuery, [doneeName, latitude, longitude, geohash, email, hashedPassword]);

        const doneeId = insertDoneeResult.insertId;
        res.status(201).json({ message: 'Donee registered successfully', doneeId });
    } catch (error) {
        console.error('Error registering donee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. Login Donee
app.post('/api/donees/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email exists
        const checkEmailQuery = 'SELECT * FROM Donee WHERE email = ?';
        const donee = await con.query(checkEmailQuery, [email]);

        if (donee.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, donee[0].password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in donee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3. Get Donee Details by Donee ID
app.get('/api/donees/:id', async (req, res) => {
    try {
        const doneeId = req.params.id;
        const getDoneeQuery = 'SELECT * FROM Donee WHERE doneeId = ?';
        const donees = await con.query(getDoneeQuery, [doneeId]);

        if (donees.length === 0) {
            return res.status(404).json({ error: 'Donee not found' });
        }

        res.json(donees[0]);
    } catch (error) {
        console.error('Error getting donee details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 4. Get All Donees Details
app.get('/api/donees', async (req, res) => {
    try {
        const getAllDoneesQuery = 'SELECT * FROM Donee';
        const donees = await con.query(getAllDoneesQuery);

        res.json(donees);
    } catch (error) {
        console.error('Error getting all donees:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 5. Update Donee Details by Donee ID
app.put('/api/donees/:id', async (req, res) => {
    try {
        const doneeId = req.params.id;
        const { doneeName, latitude, longitude, geohash } = req.body;

        const updateDoneeQuery = 'UPDATE Donee SET doneeName = ?, latitude = ?, longitude = ?, geohash = ? WHERE doneeId = ?';
        const updateDoneeResult = await con.query(updateDoneeQuery, [doneeName, latitude, longitude, geohash, doneeId]);

        if (updateDoneeResult.affectedRows === 0) {
            return res.status(404).json({ error: 'Donee not found' });
        }

        res.json({ message: 'Donee updated successfully' });
    } catch (error) {
        console.error('Error updating donee details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// =========DONEE API  END=============================
// =========DONATION API =============================
// 1. Add Donation
app.post('/api/donations', async (req, res) => {
    try {
        const { donorId, donationName, donationType, noOfDonations, donationDescription, donationExpiry, donationPickupLatitude, donationPickupLongitude, donationPickupGeohash } = req.body;

        const addDonationQuery = 'INSERT INTO Donation (donorId, donationName, donationType, noOfDonations, donationDescription, donationExpiry, donationPickupLatitude, donationPickupLongitude, donationPickupGeohash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const addDonationResult = await con.query(addDonationQuery, [donorId, donationName, donationType, noOfDonations, donationDescription, donationExpiry, donationPickupLatitude, donationPickupLongitude, donationPickupGeohash]);

        const donationId = addDonationResult.insertId;
        res.status(201).json({ message: 'Donation added successfully', donationId });
    } catch (error) {
        console.error('Error adding donation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. Delete Donation
app.delete('/api/donations/:id', async (req, res) => {
    try {
        const donationId = req.params.id;

        const deleteDonationQuery = 'DELETE FROM Donation WHERE donationId = ?';
        const deleteDonationResult = await con.query(deleteDonationQuery, [donationId]);

        if (deleteDonationResult.affectedRows === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }

        res.json({ message: 'Donation deleted successfully' });
    } catch (error) {
        console.error('Error deleting donation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3. Update Donation
app.put('/api/donations/:id', async (req, res) => {
    try {
        const donationId = req.params.id;
        const { donorId, donationName, donationType, noOfDonations, donationDescription, donationExpiry, donationPickupLatitude, donationPickupLongitude, donationPickupGeohash } = req.body;

        const updateDonationQuery = 'UPDATE Donation SET donorId = ?, donationName = ?, donationType = ?, noOfDonations = ?, donationDescription = ?, donationExpiry = ?, donationPickupLatitude = ?, donationPickupLongitude = ?, donationPickupGeohash = ? WHERE donationId = ?';
        const updateDonationResult = await con.query(updateDonationQuery, [donorId, donationName, donationType, noOfDonations, donationDescription, donationExpiry, donationPickupLatitude, donationPickupLongitude, donationPickupGeohash, donationId]);

        if (updateDonationResult.affectedRows === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }

        res.json({ message: 'Donation updated successfully' });
    } catch (error) {
        console.error('Error updating donation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 4. Get Single Donation
app.get('/api/donations/:id', async (req, res) => {
    try {
        const donationId = req.params.id;

        const getDonationQuery = 'SELECT * FROM Donation WHERE donationId = ?';
        const donations = await con.query(getDonationQuery, [donationId]);

        if (donations.length === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }

        res.json(donations[0]);
    } catch (error) {
        console.error('Error getting donation details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 5. Get All Donations
app.get('/api/donations', async (req, res) => {
    try {
        const getAllDonationsQuery = 'SELECT * FROM Donation';
        const donations = await con.query(getAllDonationsQuery);

        res.json(donations);
    } catch (error) {
        console.error('Error getting all donations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// =========DONATION API  END=============================

// =========FEEDBACK API =============================

// 1. Add Feedback
app.post('/api/feedbacks', async (req, res) => {
    try {
        const { donationId, feedbackTitle, feedbackDescription, doneeId } = req.body;

        const addFeedbackQuery = 'INSERT INTO Feedback (donationId, feedbackTitle, feedbackDescription, doneeId) VALUES (?, ?, ?, ?)';
        const addFeedbackResult = await con.query(addFeedbackQuery, [donationId, feedbackTitle, feedbackDescription, doneeId]);

        const feedbackId = addFeedbackResult.insertId;
        res.status(201).json({ message: 'Feedback added successfully', feedbackId });
    } catch (error) {
        console.error('Error adding feedback:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. Get All Feedback from Donation ID
app.get('/api/feedbacks/donation/:id', async (req, res) => {
    try {
        const donationId = req.params.id;

        const getFeedbacksQuery = 'SELECT * FROM Feedback WHERE donationId = ?';
        const feedbacks = await con.query(getFeedbacksQuery, [donationId]);

        res.json(feedbacks);
    } catch (error) {
        console.error('Error getting feedbacks from donation ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =========FEEDBACK API  END=============================
// =========REVIEW API =============================

// 1. Add Review
app.post('/api/reviews', async (req, res) => {
    try {
        const { doneeId, donorId, reviewTitle, reviewDescription, rating } = req.body;

        const addReviewQuery = 'INSERT INTO Review (doneeId, donorId, reviewTitle, reviewDescription, rating) VALUES (?, ?, ?, ?, ?)';
        const addReviewResult = await con.query(addReviewQuery, [doneeId, donorId, reviewTitle, reviewDescription, rating]);

        const reviewId = addReviewResult.insertId;
        res.status(201).json({ message: 'Review added successfully', reviewId });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. Get All Reviews by Donor ID
app.get('/api/reviews/donor/:id', async (req, res) => {
    try {
        const donorId = req.params.id;

        const getReviewsQuery = 'SELECT * FROM Review WHERE donorId = ?';
        const reviews = await con.query(getReviewsQuery, [donorId]);

        res.json(reviews);
    } catch (error) {
        console.error('Error getting reviews by donor ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =========REVIEW API  END=============================




app.listen(5000, () => {
    console.log("listening on port 5000");
})
