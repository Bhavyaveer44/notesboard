import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT=process.env.PORT || 5001;
const __dirname=path.resolve();

if(process.env.NODE_ENV !== "production"){
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());//middleware parses the JSON bodies - req.body
app.use(rateLimiter);

// simple custom middleware
// app.use((req,res,next)=>{
//   console.log(`Req method is ${req.method} & req url is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  });
}
//connect db then start server - better 
//if db fails then whats the point of connecting to server therefore db then server

connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log("Server started on PORT: ",PORT);
  });
});


//mongodb+srv://bhavyaveer:Bhavya10@cluster0.h0hdflo.mongodb.net/?appName=Cluster0
