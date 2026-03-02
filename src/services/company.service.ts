import { db } from "../util/config/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import logger from "../util/logger";

export class CompanyService {
    async createCompany(data: any, creatorId: string) {
        const { type, ...rawCompanyData } = data;
        const companyData = Object.fromEntries(
            Object.entries(rawCompanyData).map(([key, value]) => [
                key,
                typeof value === "string" ? value.trim() : value,
            ]),
        ) as Record<string, any>;

        // Coerce uploadLicense: if it's an object (e.g. empty {} from file input) or empty, set to null
        if (
            companyData.uploadLicense === null ||
            companyData.uploadLicense === undefined ||
            companyData.uploadLicense === "" ||
            (typeof companyData.uploadLicense === "object")
        ) {
            companyData.uploadLicense = null;
        }

        if (!companyData.companyName) {
            throw new Error("Company name is required.");
        }
        if (!companyData.primaryEmail) {
            throw new Error("Primary email is required.");
        }
        if (!companyData.secondaryEmail) {
            throw new Error("Secondary email is required.");
        }

        try {
            // Check for duplicates in both tables
            const [existingLocal, existingInt] = await Promise.all([
                db.newLocalCompanies.findFirst({
                    where: {
                        OR: [
                            { companyName: { equals: companyData.companyName } },
                            { primaryEmail: { equals: companyData.primaryEmail } }
                        ]
                    }
                }),
                db.newInternationalCompanies.findFirst({
                    where: {
                        OR: [
                            { companyName: { equals: companyData.companyName } },
                            { primaryEmail: { equals: companyData.primaryEmail } }
                        ]
                    }
                })
            ]);

            if (existingLocal || existingInt) {
                const dup = existingLocal || existingInt;
                const reason = dup?.companyName.toLowerCase() === String(companyData.companyName).toLowerCase()
                    ? `Company "${companyData.companyName}" is already registered.`
                    : `Email "${companyData.primaryEmail}" is already registered.`;
                throw new Error(reason);
            }

            if (type === 'local') {
                return await db.newLocalCompanies.create({
                    data: {
                        companyName: companyData.companyName,
                        fullName: companyData.fullName || "",
                        position: companyData.position || "",
                        primaryEmail: companyData.primaryEmail,
                        secondaryEmail: companyData.secondaryEmail || "",
                        phoneNumber: companyData.phoneNumber || "",
                        sector: companyData.sector || "",
                        companyWebsite: companyData.companyWebsite || null,
                        socialLinks: companyData.socialLinks || null,
                        uploadLicense: companyData.uploadLicense || null,
                        createdById: creatorId,
                        type: 'local',
                    }
                });
            } else if (type === 'international') {
                return await db.newInternationalCompanies.create({
                    data: {
                        companyName: companyData.companyName,
                        fullName: companyData.fullName || "",
                        position: companyData.position || "",
                        primaryEmail: companyData.primaryEmail,
                        secondaryEmail: companyData.secondaryEmail || "",
                        phoneNumber: companyData.phoneNumber || "",
                        sector: companyData.sector || "",
                        companyWebsite: companyData.companyWebsite || null,
                        socialLinks: companyData.socialLinks || null,
                        uploadLicense: companyData.uploadLicense || null,
                        createdById: creatorId,
                        type: 'international',
                    }
                });
            } else {
                throw new Error(`Invalid company type: "${type}". Must be "local" or "international".`);
            }
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new Error("Company name or email is already registered.");
            }

            logger.error("Error in createCompany service", {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
                companyName: companyData.companyName,
                primaryEmail: companyData.primaryEmail,
                type,
                createdById: creatorId,
            });

            throw error;
        }
    }

    async getCompaniesByType(type: string) {
        if (type === 'local') {
            return await db.newLocalCompanies.findMany({
                orderBy: { createdAt: 'desc' }
            });
        } else if (type === 'international') {
            return await db.newInternationalCompanies.findMany({
                orderBy: { createdAt: 'desc' }
            });
        }
        return [];
    }

    async getCompanyById(id: number) {
        // Try local first, then international
        const localCompany = await db.newLocalCompanies.findUnique({ where: { Id: id } });
        if (localCompany) return localCompany;
        return await db.newInternationalCompanies.findUnique({ where: { Id: id } });
    }

    async deleteCompany(id: number, type?: string) {
        if (type === 'local') {
            return await db.newLocalCompanies.delete({ where: { Id: id } });
        } else if (type === 'international') {
            return await db.newInternationalCompanies.delete({ where: { Id: id } });
        }
        // Fallback: try both
        const local = await db.newLocalCompanies.findUnique({ where: { Id: id } });
        if (local) return await db.newLocalCompanies.delete({ where: { Id: id } });
        return await db.newInternationalCompanies.delete({ where: { Id: id } });
    }
}
