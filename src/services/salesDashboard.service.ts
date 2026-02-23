import { db } from "../util/config/db";
import { genSaltSync, hashSync } from "bcrypt";
import logger from "../util/logger";

export class SalesDashboardService {
    async getAllSales(query?: string) {
        const where: any = {};
        if (query) {
            where.OR = [
                { salesPersonName: { contains: query } },
                { email: { contains: query } }
            ];
        }
        return await db.sales_dashboard.findMany({
            where
        });
    }

    async createSales(data: any) {
        const hashedPassword = hashSync(data.password, genSaltSync(10));
        return await db.sales_dashboard.create({
            data: {
                salesPersonName: data.fullName || data.salesPersonName,
                email: data.email,
                password: hashedPassword,
                roleId: Number(data.roleId),
                salaryAmount: data.salaryAmount || 0,
                companyId: data.companyId || null
            }
        });
    }

    async getSalesById(id: number) {
        return await db.sales_dashboard.findUnique({
            where: { salesId: id }
        });
    }

    async updateSales(id: number, data: any) {
        if (data.password) {
            data.password = hashSync(data.password, genSaltSync(10));
        }
        return await db.sales_dashboard.update({
            where: { salesId: id },
            data: {
                salesPersonName: data.fullName || data.salesPersonName,
                email: data.email,
                password: data.password,
                roleId: data.roleId ? Number(data.roleId) : undefined,
                salaryAmount: data.salaryAmount,
                companyId: data.companyId
            }
        });
    }

    async deleteSales(id: number) {
        return await db.sales_dashboard.delete({
            where: { salesId: id }
        });
    }
}
