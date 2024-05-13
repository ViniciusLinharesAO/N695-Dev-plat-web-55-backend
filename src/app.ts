import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes"

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(helmet())
    .use(cors())
    .use(express.json())
    .use(routes)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
