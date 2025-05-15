import { Router } from "express";
import userRoute from "./user.route";
import settingsRoute from "./settings.route";
import subAgentRoute from "./subAgent.route";

const routes = Router();

routes.get("/", (req: any, res: any) => {
    res.send("Hello from Wijekoon Distributors API Endpoints");
});
routes.use("/users", userRoute);
routes.use("/settings", settingsRoute);
routes.use("/sub-agents", subAgentRoute);

export default routes;
