import { Router } from "express";

const routes = Router();

routes.get("/", (req: any, res: any) => {
    res.send("Hello from Liyara Foreign Employment API Endpoints");
});

export default routes;
