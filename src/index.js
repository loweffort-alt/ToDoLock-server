import app from "./app.js";
//import { connectDB } from "./dbLocal.js";
import "dotenv/config.js";
import { run } from "./dbRemote.js";

const port = process.env.PORT || 3000;

//connectDB();
run();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
