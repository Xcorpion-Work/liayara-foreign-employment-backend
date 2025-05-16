import { Router } from "express";
import userRoute from "./user.route";
import settingsRoute from "./settings.route";
import subAgentRoute from "./subAgent.route";
import foreignAgentRoute from "./foreignAgent.route";

const routes = Router();

routes.get("/", (req: any, res: any) => {
    res.send("Hello from Liyara Foreign Employment API Endpoints");
});
routes.use("/users", userRoute);
routes.use("/settings", settingsRoute);
routes.use("/sub-agents", subAgentRoute);
routes.use("/foreign-agents", foreignAgentRoute);

export default routes;
