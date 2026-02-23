import { Request, Response, Router } from "express";
import { SalesDashboardController } from "../../controllers/salesDashboard.controller";
import AuthAPIKey from "../../middlewares/authAPIKey";
import AuthGuard from "../../middlewares/authGuard";

const salesController = new SalesDashboardController();
const salesDashboardRoutes = Router();

// GET — All sales (admin sees everyone, sales sees only themselves)
salesDashboardRoutes.get(
    "/getAllSales",
    [AuthAPIKey, AuthGuard],
    (req: Request, res: Response) => salesController.getAllSales(req, res)
);

// POST — Create sales account (admin-only, enforced in controller)
salesDashboardRoutes.post(
    "/createSales",
    [AuthAPIKey, AuthGuard],
    (req: Request, res: Response) => salesController.createSales(req, res)
);

// PATCH — Update a sales account (admin-only, enforced in controller)
salesDashboardRoutes.patch(
    "/update/:id",
    [AuthAPIKey, AuthGuard],
    (req: Request, res: Response) => salesController.updateSales(req, res)
);

// DELETE — Admin deactivates a sales account (profile + companies preserved)
salesDashboardRoutes.delete(
    "/delete/:id",
    [AuthAPIKey, AuthGuard],
    (req: Request, res: Response) => salesController.deleteSales(req, res)
);

// DELETE — Sales person self-deactivates their OWN account (profile + companies preserved for admin)
salesDashboardRoutes.delete(
    "/leave",
    [AuthAPIKey, AuthGuard],
    (req: Request, res: Response) => salesController.selfDeactivate(req, res)
);

export default salesDashboardRoutes;
