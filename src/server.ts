import App from "./app";
import "dotenv/config";
import { routes } from "./routes/routes";

const app = new App(routes, Number(process.env.SERVER_PORT));

app.listen();

export default app;
