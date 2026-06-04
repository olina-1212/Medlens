const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRoutes);

const documentRoutes = require("./routes/documentRoutes");
app.use("/api/documents", documentRoutes);

const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("MedLens Backend Running");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});