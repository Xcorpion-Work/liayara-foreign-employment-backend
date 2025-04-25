import { Router } from "express";
import userRoute from "./user.route";

const routes = Router();

routes.get("/", (req: any, res: any) => {
    res.send("Hello from Wijekoon Distributors API Endpoints");
});
routes.use("/users", userRoute);

export default routes;
