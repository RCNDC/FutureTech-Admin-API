import { db } from "../util/config/db";

export class CompanyService {
    async createCompany(data: any) {
        return await (db as any).newCompanies.create({
            data: data
        });
    }

    async getCompaniesByType(type: string) {
        return await db.$queryRawUnsafe('SELECT * FROM `newCompanies` WHERE `type` = ? ORDER BY `createdAt` DESC', type);
    }

    async getCompanyById(id: number) {
        const companies: any[] = await db.$queryRawUnsafe('SELECT * FROM `newCompanies` WHERE `Id` = ?', id);
        return companies[0];
    }

    async deleteCompany(id: number) {
        const manualArr: any[] = await db.$queryRawUnsafe('SELECT * FROM `newCompanies` WHERE `Id` = ?', id);
        if (manualArr && manualArr.length > 0) {
            return await db.$executeRawUnsafe('DELETE FROM `newCompanies` WHERE `Id` = ?', id);
        }
    }
}
