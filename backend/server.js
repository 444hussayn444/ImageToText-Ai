import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import router from "./routes/router.js"

// initilazing the server 

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "*"
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "../public")))

app.use("/", router);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));

})

app.listen(PORT, () => {

    console.log(`App is running on port http://localhost:${PORT}`);

})
