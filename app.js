const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const token = "Bearer " + process.env.GH_TOKEN;
const reposList = require("./repos.json");

const PORT = process.env.PORT || 4444;
const pageSize = process.env.pageSize || 5;

app.use(cors());

app.get("/repositories", (req, res) => {
    res.json(reposList);
});

// http://localhost:3001/repositories/sushilshinde
app.get("/repositories/:userHandle", async (req, res) => {
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
app.get("/events/:userHandle", async (req, res) => {
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
app.get("/starred/:userHandle", async (req, res) => {
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
