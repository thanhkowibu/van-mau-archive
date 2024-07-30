import express from "express";
import cors from "cors";
import routes from "./routes/index";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    exposedHeaders: ["authorization"],
  })
);

app.get("/", (req, res) => {
  res.json("Welcome to van mau archive");
});

app.use(routes);

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
