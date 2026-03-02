import { db } from "../util/config/db";
import { genSaltSync, hashSync } from "bcrypt";
import logger from "../util/logger";

// Role IDs
const ADMIN_ROLE = 3;
const LOCAL_SALES_ROLE = 25;
const INT_SALES_ROLE = 29;

export class SalesDashboardService {

    /**
     * Returns sales records based on role:
     *   - Admin (3): sees every sales record, optionally filtered by roleId or query
     *   - Local Sales (25): sees ONLY their own record (no peer data, no international data)
     *   - International Sales (29): sees ONLY their own record (no peer data, no local data)
     */
    async getAllSales(userId: string, roleId: number, query?: string) {
        const where: any = {};

        if (roleId === ADMIN_ROLE) {
            // Admins can filter by sub-type and search query
            if (query) {
                where.OR = [
                    { salesPersonName: { contains: query } },
                    { email: { contains: query } },
                ];
            }
        } else if (roleId === LOCAL_SALES_ROLE) {
            // Local sales: only their own profile, cannot see international sales
            where.salesId = !isNaN(Number(userId)) ? Number(userId) : -1;
            where.roleId = LOCAL_SALES_ROLE;
        } else if (roleId === INT_SALES_ROLE) {
            // International sales: only their own profile, cannot see local sales
            where.salesId = !isNaN(Number(userId)) ? Number(userId) : -1;
            where.roleId = INT_SALES_ROLE;
        } else {
            // Any other unrecognised role: see nothing
            return [];
        }

        return await db.sales_dashboard.findMany({ where });
    }

    /**
     * Returns the profile of the currently logged-in sales person.
     * Admin can use this too but primarily intended for sales users.
     */
    async getSalesProfile(userId: string, roleId: number) {
        if (roleId === ADMIN_ROLE) {
            // Admins use getAllSales, but we support this call too
            return null;
        }
        const salesId = Number(userId);
        if (isNaN(salesId)) return null;
        return await db.sales_dashboard.findUnique({ where: { salesId } });
    }

    async createSales(data: any, creatorId: string) {
        const hashedPassword = hashSync(data.password, genSaltSync(10));
        return await db.sales_dashboard.create({
            data: {
                salesPersonName: data.fullName || data.salesPersonName,
                email: data.email,
                password: hashedPassword,
                roleId: Number(data.roleId),
                salaryAmount: data.salaryAmount || 0,
                companyId: data.companyId || null,
                createdBy: creatorId,
                isActive: true,
            },
        });
    }

    async getSalesById(id: number) {
        return await db.sales_dashboard.findUnique({
            where: { salesId: id },
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
                companyId: data.companyId,
            },
        });
    }

    /**
     * ADMIN-ONLY soft-deactivate: sets isActive=false.
     * Password is preserved so the account can be reactivated later.
     * Profile and all registered companies remain intact.
     */
    async adminDeactivateSales(id: number) {
        return await db.sales_dashboard.update({
            where: { salesId: id },
            data: {
                isActive: false,
                // Do NOT touch password — reactivation restores login with same credentials
            },
        });
    }

    /**
     * Self-deactivation: a sales person deletes their own account.
     * Only the password is scrambled and isActive set to false.
     * All profile data and registered companies remain intact for admin view.
     */
    async selfDeactivate(salesId: number) {
        return await db.sales_dashboard.update({
            where: { salesId },
            data: {
                isActive: false,
                password: "DEACTIVATED_" + Date.now(),
            },
        });
    }

    /**
     * ADMIN-ONLY: Re-activates a previously deactivated account.
     * Password is untouched — the sales person logs in with their original credentials.
     */
    async reactivateSales(id: number) {
        return await db.sales_dashboard.update({
            where: { salesId: id },
            data: {
                isActive: true,
                // Password is left intact so user can log back in immediately
            },
        });
    }

    /**
     * ADMIN-ONLY hard delete: permanently removes the sales record.
     * Companies registered by this sales person are NOT deleted
     * (createdById becomes orphaned but data stays).
     */
    async hardDeleteSales(id: number) {
        return await db.sales_dashboard.delete({
            where: { salesId: id },
        });
    }
}
