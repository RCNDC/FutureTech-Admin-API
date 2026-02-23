import { db } from "../util/config/db";

export class CompanyService {
    async createCompany(data: any, creatorId: string) {
        console.log("Creating company with data:", JSON.stringify(data, null, 2));
        const { type, ...companyData } = data;
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
                const reason = dup?.companyName.toLowerCase() === companyData.companyName.toLowerCase()
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
        } catch (error) {
            console.error("Error in createCompany service:", error);
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
