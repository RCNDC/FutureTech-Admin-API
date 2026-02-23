import { Request, Response } from "express";
import { SalesDashboardService } from "../services/salesDashboard.service";
import logger from "../util/logger";

export class SalesDashboardController {
    private salesService: SalesDashboardService;

    constructor() {
        this.salesService = new SalesDashboardService();
    }

    async getAllSales(req: Request, res: Response) {
        try {
            const { query } = req.query;
            logger.info('Fetching all sales', { query });
            const sales = await this.salesService.getAllSales(query as string);
            logger.info('Sales fetched', { count: sales.length });
            res.status(200).json({ message: 'Fetched successfully', data: sales });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async createSales(req: Request, res: Response) {
        try {
            const newSales = await this.salesService.createSales(req.body);
            res.status(201).json({ message: 'Sales representative created successfully', data: newSales });
        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async updateSales(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedSales = await this.salesService.updateSales(Number(id), req.body);
            res.status(200).json({ message: 'Sales representative updated successfully', data: updatedSales });
        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async deleteSales(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedSales = await this.salesService.deleteSales(Number(id));
            res.status(200).json({ message: 'Sales representative deleted successfully', data: deletedSales });
        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }
}
