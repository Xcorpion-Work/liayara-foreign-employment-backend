import { Router } from "express";
import userRoute from "./user.route";
import settingsRoute from "./settings.route";

const routes = Router();

routes.get("/", (req: any, res: any) => {
    res.send("Hello from Wijekoon Distributors API Endpoints");
});
routes.use("/users", userRoute);
routes.use("/settings", settingsRoute);

export default routes;
