const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const token = "Bearer " + process.env.GH_TOKEN;
const SECRET_KEY = process.env.SECRET_KEY;
const reposList = require("./repos.json");
const { protectRoute } = require("./middleware/protectRoute");

const PORT = process.env.PORT || 4444;
const pageSize = process.env.pageSize || 5;

app.use(cors());
app.use(express.json())

app.get("/repositories", (req, res) => {
    res.json(reposList);
});

// Login API
app.post('/login', (req, res) => {
    if(req.body.username === 'admin' && req.body.password === 'admin'){
        let token = jwt.sign({ username: 'admin' }, SECRET_KEY)
        res.status(200).json({ token });
    }else {
        res.status(400).json({ message: 'Login Failed' })
    }
})

app.post('/verify', (req, res) => {
    try {
        // KEY TO BE IN ENV
        const token = req.headers['authorization'].split(' ')[1];
        var decoded = jwt.verify(token, SECRET_KEY);
        res.status(200).json({ message: 'SUCCESS', details: decoded });
      } catch(err) {
        res.status(400).json({ message: 'Verification failed Failed' })
      }
})

// http://localhost:3001/repositories/sushilshinde
// ADD middleware to check token
app.get("/repositories/:userHandle", protectRoute, async (req, res) => {
    try {
        const userHandle = req.params.userHandle;
        const response = await axios.get(
            `https://api.github.com/users/${userHandle}/repos?per_page=${pageSize}`,
            {
                headers: {
                    Authorization: token,
                    "Accept-Encoding": "application/json",
                },
            }
        );
        return res.status(200).json({ data: response.data });
    } catch (error) {
        return res.status(400).json({ data: error });
    }
});

// http://localhost:3001/events/sushilshinde
app.get("/events/:userHandle", protectRoute, async (req, res) => {
    try {
        const userHandle = req.params.userHandle;
        const response = await axios.get(
            `https://api.github.com/users/${userHandle}/events?per_page=${pageSize}`,
            {
                headers: {
                    Authorization: token,
                    "Accept-Encoding": "application/json",
                },
            }
        );
        return res.status(200).json({ data: response.data });
    } catch (error) {
        return res.status(400).json({ data: error });
    }
});

// http://localhost:3001/events/sushilshinde
app.get("/starred/:userHandle", protectRoute, async (req, res) => {
    try {
        const userHandle = req.params.userHandle;
        const response = await axios.get(
            `https://api.github.com/users/${userHandle}/starred?per_page=${pageSize}`,
            {
                headers: {
                    Authorization: token,
                    "Accept-Encoding": "application/json",
                },
            }
        );
        return res.status(200).json({ data: response.data });
    } catch (error) {
        return res.status(400).json({ data: error });
    }
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
