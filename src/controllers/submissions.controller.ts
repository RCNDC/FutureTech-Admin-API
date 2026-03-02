import { Request, Response } from "express";
import { SubmissionService } from "../services/submission.service";
import { calculateChange } from "../util/calculateStat";

export class SubmissionsController {

    private submissionService: SubmissionService;
    constructor() {
        this.submissionService = new SubmissionService();
    }

    async getNGOSubmissions(req: Request, res: Response) {
        const roleId = Number(req.user?.role) || 0;
        const submissions = await this.submissionService.getNGOSubmissions(roleId);
        res.status(200).json({ message: 'Submission fetched', data: submissions });
    }


    async getNGOSubmissionById(req: Request, res: Response) {
        const { id } = req.params;
        const roleId = Number(req.user?.role) || 0;
        if (id) {
            const submission = await this.submissionService.getNGOSubmissionsById(BigInt(id as string), roleId);
            res.status(200).json({ message: 'fetched successful', data: submission });
            return;
        }
        res.status(400).json({ message: 'missing ID' });

    }


    async getLocalCompanySubmissions(req: Request, res: Response) {
        const userId = req.user?.userId || "";
        const roleId = Number(req.user?.role) || 0;

        if (roleId === 29) { // International Sales trying to access Local
            return res.status(403).json({ message: 'International Sales representatives cannot access Local company data.' });
        }

        const submissions = await this.submissionService.getLocalCompanySubmissions(userId, roleId);
        res.status(200).json({ message: 'Submission fetched', data: submissions });
    }


    async getLocalCompanySubmissionById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'missing Id' });
            return;
        }
        const userId = req.user?.userId || "";
        const roleId = Number(req.user?.role) || 0;
        const submission = await this.submissionService.getLocalCompanySubmissionById(BigInt(id), userId, roleId);
        res.status(200).json({ message: 'Submission fetched', data: submission });
    }


    async getEmbassySubmissions(req: Request, res: Response) {
        const roleId = Number(req.user?.role) || 0;
        const submissions = await this.submissionService.getEmabassySubmissions(roleId);
        res.status(200).json({ message: 'Submission fetched', data: submissions });
    }


    async getEmbassySubmissionsById(req: Request, res: Response) {
        const { id } = req.params;
        const roleId = Number(req.user?.role) || 0;
        if (!id) {
            res.status(400).json({ message: 'missing Id' });
            return;
        }
        const submission = await this.submissionService.getEmabassySubmissionsById(BigInt(id), roleId);
        res.status(200).json({ message: 'Submission fetched', data: submission });
    }


    async getInternationalCompanySubmissions(req: Request, res: Response) {
        const userId = req.user?.userId || "";
        const roleId = Number(req.user?.role) || 0;

        if (roleId === 25) { // Local Sales trying to access International
            return res.status(403).json({ message: 'Local Sales representatives cannot access International company data.' });
        }

        const submissions = await this.submissionService.getInternationalCompanySubmissions(userId, roleId);
        res.status(200).json({ message: 'Submission fetched', data: submissions });
    }


    async getInternationalCompanySubmissionById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'missing Id' });
            return;
        }
        const userId = req.user?.userId || "";
        const roleId = Number(req.user?.role) || 0;
        const submission = await this.submissionService.getInternationalCompanySubmission(BigInt(id), userId, roleId);
        res.status(200).json({ message: 'Submission fetched', data: submission });
    }


    async getStartupSubmissions(req: Request, res: Response) {
        const roleId = Number(req.user?.role) || 0;
        const submissions = await this.submissionService.getStartupSubmissions(roleId);
        res.status(200).json({ message: 'Submission fetched', data: submissions });
    }


    async getStartupSubmissionsById(req: Request, res: Response) {
        const { id } = req.params;
        const roleId = Number(req.user?.role) || 0;
        if (!id) {
            res.status(400).json({ message: 'missing Id' });
            return;
        }
        const submissions = await this.submissionService.getStartupSubmissionsById(BigInt(id), roleId);
        res.status(200).json({ message: 'Submission fetched', data: submissions });
    }

    async getEventSubmissions(req: Request, res: Response) {
        const submissions = await this.submissionService.getEventAttendeeSubmissions();
        res.status(200).json({ message: 'Submission fetched', data: submissions });
    }
    async getConferenceSubmissions(req: Request, res: Response) {
        const submissions = await this.submissionService.getConferenceAttendeeSubmissions();
        res.status(200).json({ message: 'Submission fetched', data: submissions });
    }

    async deleteNGOSubmission(req: Request, res: Response) {
        if (Number(req.user?.role) !== 3) {
            return res.status(403).json({ message: 'Only administrators can delete submissions' });
        }
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Missing ID' });
        }
        try {
            await this.submissionService.deleteNGOSubmission(BigInt(id));
            res.status(200).json({ message: 'Submission deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete submission' });
        }
    }

    async deleteLocalCompanySubmission(req: Request, res: Response) {
        if (Number(req.user?.role) !== 3) {
            return res.status(403).json({ message: 'Only administrators can delete submissions' });
        }
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Missing ID' });
        }
        try {
            await this.submissionService.deleteLocalCompanySubmission(BigInt(id));
            res.status(200).json({ message: 'Submission deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete submission' });
        }
    }

    async deleteEmbassySubmission(req: Request, res: Response) {
        if (Number(req.user?.role) !== 3) {
            return res.status(403).json({ message: 'Only administrators can delete submissions' });
        }
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Missing ID' });
        }
        try {
            await this.submissionService.deleteEmbassySubmission(BigInt(id));
            res.status(200).json({ message: 'Submission deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete submission' });
        }
    }

    async deleteInternationalCompanySubmission(req: Request, res: Response) {
        if (Number(req.user?.role) !== 3) {
            return res.status(403).json({ message: 'Only administrators can delete submissions' });
        }
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Missing ID' });
        }
        try {
            await this.submissionService.deleteInternationalCompanySubmission(BigInt(id));
            res.status(200).json({ message: 'Submission deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete submission' });
        }
    }

    async deleteStartupSubmission(req: Request, res: Response) {
        if (Number(req.user?.role) !== 3) {
            return res.status(403).json({ message: 'Only administrators can delete submissions' });
        }
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Missing ID' });
        }
        try {
            await this.submissionService.deleteStartupSubmission(BigInt(id));
            res.status(200).json({ message: 'Submission deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete submission' });
        }
    }

    async deleteEventSubmission(req: Request, res: Response) {
        if (Number(req.user?.role) !== 3) {
            return res.status(403).json({ message: 'Only administrators can delete submissions' });
        }
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Missing ID' });
        }
        try {
            await this.submissionService.deleteEventSubmission(BigInt(id));
            res.status(200).json({ message: 'Submission deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete submission' });
        }
    }

    async deleteConferenceSubmission(req: Request, res: Response) {
        if (Number(req.user?.role) !== 3) {
            return res.status(403).json({ message: 'Only administrators can delete submissions' });
        }
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Missing ID' });
        }
        try {
            await this.submissionService.deleteConferenceSubmission(BigInt(id));
            res.status(200).json({ message: 'Submission deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete submission' });
        }
    }


    async getSubmissionStat(req: Request, res: Response) {
        const userId = req.user?.userId || "";
        const roleId = Number(req.user?.role) || 0;
        const { startDate, endDate } = req.query as { startDate?: string; endDate?: string };

        const filterByDate = (data: any[]) => {
            if (!startDate && !endDate) return data;
            return data.filter((d) => {
                const date = new Date(d.registeredDate);
                if (startDate && date < new Date(startDate)) return false;
                if (endDate) {
                    // Make endDate inclusive by extending to end of day
                    const end = new Date(endDate);
                    end.setHours(23, 59, 59, 999);
                    if (date > end) return false;
                }
                return true;
            });
        };

        const [rawNGO, rawLocal, rawIntl, rawStartup, rawEmbassy, rawEvent, rawConf] = await Promise.all([
            this.submissionService.getNGOSubmissions(roleId),
            this.submissionService.getLocalCompanySubmissions(userId, roleId),
            this.submissionService.getInternationalCompanySubmissions(userId, roleId),
            this.submissionService.getStartupSubmissions(roleId),
            this.submissionService.getEmabassySubmissions(roleId),
            this.submissionService.getEventAttendeeSubmissions(),
            this.submissionService.getConferenceAttendeeSubmissions(),
        ]);

        const totalNGOSubmission = filterByDate(rawNGO || []);
        const totalLocalCompanySubmission = filterByDate(rawLocal || []);
        const totalInternationCompanySubmission = filterByDate(rawIntl || []);
        const totalStartupSubmission = filterByDate(rawStartup || []);
        const totalEmbassySubmission = filterByDate(rawEmbassy || []);
        const totalEventAttendeeSubmission = filterByDate(rawEvent || []);
        const totalConferenceAttendeeSubmission = filterByDate(rawConf || []);

        const ngoChange = calculateChange(totalNGOSubmission);
        const localCompanyChange = calculateChange(totalLocalCompanySubmission);
        const internationalCompanyChange = calculateChange(totalInternationCompanySubmission);
        const startupChange = calculateChange(totalStartupSubmission);
        const embassyChange = calculateChange(totalEmbassySubmission);
        const eventAttendeeChange = calculateChange(totalEventAttendeeSubmission);
        const conferenceAttendeeChange = calculateChange(totalConferenceAttendeeSubmission);

        res.status(200).json({
            message: 'fetched successfull', data: {
                'totalNgoSubmission': totalNGOSubmission.length,
                'totalLocalCompanySubmission': roleId === 29 ? 0 : totalLocalCompanySubmission.length,
                'totalInternationCompanySubmission': roleId === 25 ? 0 : totalInternationCompanySubmission.length,
                'totalStartupSubmission': totalStartupSubmission.length,
                'totalEmbassySubmission': totalEmbassySubmission.length,
                'totalEventAttendeeSubmission': totalEventAttendeeSubmission.length,
                'totalConferenceAttendeeSubmission': totalConferenceAttendeeSubmission.length,
                'ngoChange': ngoChange,
                'internationCompanyChange': roleId === 25 ? 0 : internationalCompanyChange,
                'localCompanyChange': roleId === 29 ? 0 : localCompanyChange,
                'startupChange': startupChange,
                'embassyChange': embassyChange,
                'eventAttendeeChange': eventAttendeeChange,
                'conferenceAttendeeChange': conferenceAttendeeChange
            }
        })
    }


    async getSubmissionChart(req: Request, res: Response) {
        const userId = req.user?.userId || "";
        const roleId = Number(req.user?.role) || 0;
        const { type, startDate, endDate } = req.query as { type?: string; startDate?: string; endDate?: string };

        const chartData = await this.submissionService.getChartData(
            userId,
            roleId,
            type || 'participants',
            startDate,
            endDate
        );

        if (!chartData) {
            return res.status(500).json({ message: 'Failed to fetch chart data' });
        }

        res.status(200).json({ message: 'fetched successfully', data: chartData });
    }
}

