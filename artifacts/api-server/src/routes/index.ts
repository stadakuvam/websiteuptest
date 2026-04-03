import { Router, type IRouter } from "express";
import healthRouter from "./health";
import checksRouter from "./checks";

const router: IRouter = Router();

router.use(healthRouter);
router.use(checksRouter);

export default router;
