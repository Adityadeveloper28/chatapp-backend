// index.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username, password } = req.body;

  console.log("Received request:", { username, password });

  try {
    const response = await axios.put(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: password,
        first_name: username,
        // No avatar here since we're testing without it
      },
      { headers: { "private-key": "17fb35ac-d242-4c72-a226-a83fdb37bb9c" } }
    );

    console.log("ChatEngine API response:", response.data);
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error from ChatEngine API:", error.response.data);
    return res.status(error.response.status).json(error.response.data);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
