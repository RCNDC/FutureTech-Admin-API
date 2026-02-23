import { Request, Response, Router } from "express";
import { SalesDashboardController } from "../../controllers/salesDashboard.controller";
import AuthAPIKey from "../../middlewares/authAPIKey";
import AuthGuard from "../../middlewares/authGuard";

const salesController = new SalesDashboardController();
const salesDashboardRoutes = Router();

salesDashboardRoutes.get('/getAllSales', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => salesController.getAllSales(req, res));
salesDashboardRoutes.post('/createSales', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => salesController.createSales(req, res));
salesDashboardRoutes.patch('/update/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => salesController.updateSales(req, res));
salesDashboardRoutes.delete('/delete/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => salesController.deleteSales(req, res));

export default salesDashboardRoutes;
