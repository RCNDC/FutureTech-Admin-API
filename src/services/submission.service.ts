import { db } from "../util/config/db";
import { CastBigIntFromJson } from "../util/parsejson";
import logger from "../util/logger";
import { FollowUpService } from "./followup.service";

export class SubmissionService {
  private followUpService;
  constructor() {
    this.followUpService = new FollowUpService();
  }
  async sortByCompletedSubmissions(submissions: any[]) {
    const followUps = await this.followUpService.getAllFollowUp();
    if (followUps?.length === 0 || !followUps) {
      return submissions;
    }
    const completedFollowUps = followUps.filter(
      (f) => f.status === "Completed",
    );
    // Create a Set of entry_ids with completed followups for quick lookup
    const completedEntryIds = new Set(
      completedFollowUps.map((f) => f.entry_id),
    );
    // Sort submissions: those with completed followups come last
    return submissions.sort((a, b) => {
      const aCompleted = completedEntryIds.has(parseInt(a.entry_id.toString()));
      const bCompleted = completedEntryIds.has(parseInt(b.entry_id.toString()));

      if (aCompleted === bCompleted) return 0;
      return aCompleted ? 1 : -1;
    });
  }

  private mapNewCompanies(companies: any[]) {
    return companies.map((c) => ({
      entry_id: (c.Id || c.id || "").toString(),
      fullName: c.fullName || "",
      email: c.primaryEmail,
      secondaryEmail: c.secondaryEmail || "",
      phoneNo: c.phoneNumber || "",
      companyName: c.companyName,
      registeredDate: c.createdAt,
      position: c.position || "",
      companyWebsite: c.companyWebsite || "",
      companyLicense: c.uploadLicense || "",
      isManual: true,
      salesPersonName: c.salesPersonName || "",
      createdById: c.createdById,
    }));
  }
  async getNGOSubmissions(roleId: number) {
    if (roleId !== 3) return [];
    try {
      const submissions: any[] = await db.$queryRawUnsafe(`
        WITH cte_submissions as (
            SELECT meta.meta_id, meta.meta_value, meta.meta_key, meta.entry_id, meta.date_created, entry.form_id
            FROM wpjm_frmt_form_entry_meta as meta
            INNER JOIN wpjm_frmt_form_entry as entry ON meta.entry_id = entry.entry_id
            WHERE entry.form_id = 4783
        )
        SELECT t1.entry_id, t1.meta_value as 'fullName', t2.meta_value as email, t3.meta_value as 'phoneNo', t5.meta_value as 'orgName', t1.date_created as 'registeredDate', t6.meta_value as 'mission', t7.meta_value as 'orgFile', t8.meta_value as 'address', t9.meta_value as 'collaborate', t10.meta_value as 'requestSpeaking'
        FROM cte_submissions as t1
        LEFT JOIN cte_submissions as t2 ON t1.entry_id = t2.entry_id and t2.meta_key = 'email-1'
        LEFT JOIN cte_submissions as t3 ON t1.entry_id = t3.entry_id and t3.meta_key = 'phone-1'
        LEFT JOIN cte_submissions as t4 ON t1.entry_id = t4.entry_id and t4.meta_key = 'select-7'
        LEFT JOIN cte_submissions as t5 ON t1.entry_id = t5.entry_id and t5.meta_key = 'name-3'
        LEFT JOIN cte_submissions as t6 ON t1.entry_id = t6.entry_id and t6.meta_key = 'text-8'
        LEFT JOIN cte_submissions as t7 ON t1.entry_id = t7.entry_id and t7.meta_key = 'upload-6'
        LEFT JOIN cte_submissions as t8 ON t1.entry_id = t8.entry_id and t8.meta_key = 'address-1'
        LEFT JOIN cte_submissions as t9 ON t1.entry_id = t9.entry_id and t9.meta_key = 'radio-13'
        LEFT JOIN cte_submissions as t10 ON t1.entry_id = t10.entry_id and t10.meta_key = 'radio-11'
        WHERE t1.meta_key = 'name-1' AND (t4.meta_value = 'NGO or Foundation')
        GROUP BY t1.entry_id;
      `);
      const sortedSub = await this.sortByCompletedSubmissions(submissions);
      return CastBigIntFromJson(sortedSub);
    } catch (err) {
      logger.error(err + "");
    }
  }

  async getNGOSubmissionsById(entry_id: bigint, roleId: number) {
    if (roleId !== 3) return [];
    try {
      const submission: any[] = await db.$queryRawUnsafe(`
        WITH cte_submissions as (
            SELECT meta.meta_id, meta.meta_value, meta.meta_key, meta.entry_id, meta.date_created, entry.form_id
            FROM wpjm_frmt_form_entry_meta as meta
            INNER JOIN wpjm_frmt_form_entry as entry ON meta.entry_id = entry.entry_id
            WHERE entry.form_id = 4783
        )
        SELECT t1.entry_id, t1.meta_value as 'fullName', t2.meta_value as email, t3.meta_value as 'phoneNo', t5.meta_value as 'orgName', t1.date_created as 'registeredDate', t6.meta_value as 'mission', t7.meta_value as 'orgFile', t8.meta_value as 'address', t9.meta_value as 'collaborate', t10.meta_value as 'requestSpeaking'
        FROM cte_submissions as t1
        LEFT JOIN cte_submissions as t2 ON t1.entry_id = t2.entry_id and t2.meta_key = 'email-1'
        LEFT JOIN cte_submissions as t3 ON t1.entry_id = t3.entry_id and t3.meta_key = 'phone-1'
        LEFT JOIN cte_submissions as t4 ON t1.entry_id = t4.entry_id and t4.meta_key = 'select-7'
        LEFT JOIN cte_submissions as t5 ON t1.entry_id = t5.entry_id and t5.meta_key = 'name-3'
        LEFT JOIN cte_submissions as t6 ON t1.entry_id = t6.entry_id and t6.meta_key = 'text-8'
        LEFT JOIN cte_submissions as t7 ON t1.entry_id = t7.entry_id and t7.meta_key = 'upload-6'
        LEFT JOIN cte_submissions as t8 ON t1.entry_id = t8.entry_id and t8.meta_key = 'address-1'
        LEFT JOIN cte_submissions as t9 ON t1.entry_id = t9.entry_id and t9.meta_key = 'radio-13'
        LEFT JOIN cte_submissions as t10 ON t1.entry_id = t10.entry_id and t10.meta_key = 'radio-11'
        WHERE t1.meta_key = 'name-1' AND (t4.meta_value = 'NGO or Foundation') AND t1.entry_id = ?
        GROUP BY t1.entry_id;
      `, entry_id);
      return CastBigIntFromJson(submission);
    } catch (err) {
      logger.error(err + "");
    }
  }

  async getLocalCompanySubmissions(userId: string, roleId: number) {
    if (roleId === 29) return []; // International Sales cannot access Local
    try {
      const submissions: any[] = await db.$queryRawUnsafe(`
        WITH cte_submissions as (
            SELECT meta.meta_id, meta.meta_value, meta.meta_key, meta.entry_id, meta.date_created, entry.form_id
            FROM wpjm_frmt_form_entry_meta as meta
            INNER JOIN wpjm_frmt_form_entry as entry ON meta.entry_id = entry.entry_id
            WHERE entry.form_id = 4783
        )
        SELECT t1.entry_id, t1.meta_value as 'fullName', t2.meta_value as email, t3.meta_value as 'phoneNo', t5.meta_value as 'companyName', t1.date_created as 'registeredDate', t4.meta_value as 'position', t6.meta_value as 'companyWebsite', t7.meta_value as 'companyProfile', t10.meta_value as 'uploadLicense', t11.meta_value as 'address', t12.meta_value as 'pitchProduct', t13.meta_value as 'areaOfInterest', t14.meta_value as 'b2Schedule', t15.meta_value as 'sponsorshipTier'
        FROM cte_submissions as t1
        LEFT JOIN cte_submissions as t2 ON t1.entry_id = t2.entry_id and t2.meta_key = 'email-1'
        LEFT JOIN cte_submissions as t3 ON t1.entry_id = t3.entry_id and t3.meta_key = 'phone-1'
        LEFT JOIN cte_submissions as t4 ON t1.entry_id = t4.entry_id and t4.meta_key = 'text-4'
        LEFT JOIN cte_submissions as t5 ON t1.entry_id = t5.entry_id and t5.meta_key = 'text-7'
        LEFT JOIN cte_submissions as t6 ON t1.entry_id = t6.entry_id and t6.meta_key = 'url-2'
        LEFT JOIN cte_submissions as t7 ON t1.entry_id = t7.entry_id and t7.meta_key = 'upload-9'
        LEFT JOIN cte_submissions as t8 ON t1.entry_id = t8.entry_id and t8.meta_key = 'select-7'
        LEFT JOIN cte_submissions as t10 ON t1.entry_id = t10.entry_id and t10.meta_key = 'upload-8'
        LEFT JOIN cte_submissions as t11 ON t1.entry_id = t11.entry_id and t11.meta_key = 'address-2'
        LEFT JOIN cte_submissions as t12 ON t1.entry_id = t12.entry_id and t12.meta_key = 'text-9'
        LEFT JOIN cte_submissions as t13 ON t1.entry_id = t13.entry_id and t13.meta_key = 'select-1'
        LEFT JOIN cte_submissions as t14 ON t1.entry_id = t14.entry_id and t14.meta_key = 'radio-6'
        LEFT JOIN cte_submissions as t15 ON t1.entry_id = t15.entry_id and t15.meta_key = 'radio-7'
        WHERE t1.meta_key = 'name-1' AND (t8.meta_value = 'Local Company')
        GROUP BY t1.entry_id;
      `);

      let manualCompanies: any[];
      if (roleId === 3) { // Admin
        manualCompanies = await db.$queryRawUnsafe(
          "SELECT c.*, s.salesPersonName FROM `newLocalCompanies` c LEFT JOIN `sales_dashboard` s ON CONVERT(c.createdById USING utf8mb4) = CONVERT(CAST(s.salesId AS CHAR) USING utf8mb4) WHERE c.`type` = ?",
          "local",
        );
      } else {
        manualCompanies = await db.$queryRawUnsafe(
          "SELECT c.*, s.salesPersonName FROM `newLocalCompanies` c LEFT JOIN `sales_dashboard` s ON CONVERT(c.createdById USING utf8mb4) = CONVERT(CAST(s.salesId AS CHAR) USING utf8mb4) WHERE c.`type` = ? AND c.`createdById` = ?",
          "local",
          userId
        );
      }

      const mappedManual = this.mapNewCompanies(manualCompanies);

      // Isolation: For sales roles, only show their manual entries. Forminator data is for admins.
      const dataToProcess = roleId === 3 ? [...submissions, ...mappedManual] : mappedManual;

      const sortedSub = await this.sortByCompletedSubmissions(dataToProcess);
      return CastBigIntFromJson(sortedSub);
    } catch (err) {
      logger.error(err + "");
    }
  }

  async getLocalCompanySubmissionById(entry_id: bigint, userId: string, roleId: number) {
    try {
      const submission: any[] = await db.$queryRawUnsafe(`
        WITH cte_submissions as (
            SELECT meta.meta_id, meta.meta_value, meta.meta_key, meta.entry_id, meta.date_created, entry.form_id
            FROM wpjm_frmt_form_entry_meta as meta
            INNER JOIN wpjm_frmt_form_entry as entry ON meta.entry_id = entry.entry_id
            WHERE entry.form_id = 4783
        )
        SELECT t1.entry_id, t1.meta_value as 'fullName', t2.meta_value as email, t3.meta_value as 'phoneNo', t5.meta_value as 'companyName', t1.date_created as 'registeredDate', t4.meta_value as 'position', t6.meta_value as 'companyWebsite', t7.meta_value as 'companyProfile', t10.meta_value as 'uploadLicense', t11.meta_value as 'address', t12.meta_value as 'pitchProduct', t13.meta_value as 'areaOfInterest', t14.meta_value as 'b2Schedule', t15.meta_value as 'sponsorshipTier'
        FROM cte_submissions as t1
        LEFT JOIN cte_submissions as t2 ON t1.entry_id = t2.entry_id and t2.meta_key = 'email-1'
        LEFT JOIN cte_submissions as t3 ON t1.entry_id = t3.entry_id and t3.meta_key = 'phone-1'
        LEFT JOIN cte_submissions as t4 ON t1.entry_id = t4.entry_id and t4.meta_key = 'text-4'
        LEFT JOIN cte_submissions as t5 ON t1.entry_id = t5.entry_id and t5.meta_key = 'text-7'
        LEFT JOIN cte_submissions as t6 ON t1.entry_id = t6.entry_id and t6.meta_key = 'url-2'
        LEFT JOIN cte_submissions as t7 ON t1.entry_id = t7.entry_id and t7.meta_key = 'upload-9'
        LEFT JOIN cte_submissions as t8 ON t1.entry_id = t8.entry_id and t8.meta_key = 'select-7'
        LEFT JOIN cte_submissions as t10 ON t1.entry_id = t10.entry_id and t10.meta_key = 'upload-8'
        LEFT JOIN cte_submissions as t11 ON t1.entry_id = t11.entry_id and t11.meta_key = 'address-2'
        LEFT JOIN cte_submissions as t12 ON t1.entry_id = t12.entry_id and t12.meta_key = 'text-9'
        LEFT JOIN cte_submissions as t13 ON t1.entry_id = t13.entry_id and t13.meta_key = 'checkbox-1'
        LEFT JOIN cte_submissions as t14 ON t1.entry_id = t14.entry_id and t14.meta_key = 'radio-6'
        LEFT JOIN cte_submissions as t15 ON t1.entry_id = t15.entry_id and t15.meta_key = 'radio-7'
        WHERE t1.meta_key = 'name-1' AND (t8.meta_value = 'Local Company') AND t1.entry_id = ?
        GROUP BY t1.entry_id;
      `, entry_id);

      if (submission && submission.length > 0) {
        return CastBigIntFromJson(submission);
      }

      // Try manual
      const manualArr: any[] = await db.$queryRawUnsafe(
        "SELECT c.*, s.salesPersonName FROM `newLocalCompanies` c LEFT JOIN `sales_dashboard` s ON CONVERT(c.createdById USING utf8mb4) = CONVERT(CAST(s.salesId AS CHAR) USING utf8mb4) WHERE c.`Id` = ?",
        Number(entry_id),
      );

      if (manualArr && manualArr.length > 0) {
        const company = manualArr[0];
        // Isolation check for manual entries
        if (roleId !== 3 && company.createdById !== userId) {
          return []; // Not authorized
        }
        return CastBigIntFromJson(this.mapNewCompanies([company]));
      }

      const manualIntArr: any[] = await db.$queryRawUnsafe(
        "SELECT c.*, s.salesPersonName FROM `newInternationalCompanies` c LEFT JOIN `sales_dashboard` s ON CONVERT(c.createdById USING utf8mb4) = CONVERT(CAST(s.salesId AS CHAR) USING utf8mb4) WHERE c.`Id` = ?",
        Number(entry_id),
      );
      if (manualIntArr && manualIntArr.length > 0) {
        const company = manualIntArr[0];
        if (roleId !== 3 && company.createdById !== userId) {
          return [];
        }
        return CastBigIntFromJson(this.mapNewCompanies([company]));
      }
      return [];
    } catch (err) {
      logger.error(err + "");
    }
  }

  async getInternationalCompanySubmissions(userId: string, roleId: number) {
    if (roleId === 25) return []; // Local Sales cannot access International
    try {
      const submissions: any[] = await db.$queryRawUnsafe(`
        WITH cte_submissions as (
            SELECT meta.meta_id, meta.meta_value, meta.meta_key, meta.entry_id, meta.date_created, entry.form_id
            FROM wpjm_frmt_form_entry_meta as meta
            INNER JOIN wpjm_frmt_form_entry as entry ON meta.entry_id = entry.entry_id
            WHERE entry.form_id = 4783
        )
        SELECT t1.entry_id, t1.meta_value as 'fullName', t2.meta_value as email, t3.meta_value as 'phoneNo', t5.meta_value as 'companyName', t1.date_created as 'registeredDate', t4.meta_value as 'position', t6.meta_value as 'companyWebsite', t7.meta_value as 'companyProfile', t10.meta_value as 'passport', t11.meta_value as 'address', t12.meta_value as 'pitchProduct', t13.meta_value as 'areaOfInterest', t14.meta_value as 'b2Schedule', t15.meta_value as 'sponsorshipTier'
        FROM cte_submissions as t1
        LEFT JOIN cte_submissions as t2 ON t1.entry_id = t2.entry_id and t2.meta_key = 'email-1'
        LEFT JOIN cte_submissions as t3 ON t1.entry_id = t3.entry_id and t3.meta_key = 'phone-1'
        LEFT JOIN cte_submissions as t4 ON t1.entry_id = t4.entry_id and t4.meta_key = 'text-4'
        LEFT JOIN cte_submissions as t5 ON t1.entry_id = t5.entry_id and t5.meta_key = 'text-7'
        LEFT JOIN cte_submissions as t6 ON t1.entry_id = t6.entry_id and t6.meta_key = 'url-2'
        LEFT JOIN cte_submissions as t7 ON t1.entry_id = t7.entry_id and t7.meta_key = 'upload-9'
        LEFT JOIN cte_submissions as t8 ON t1.entry_id = t8.entry_id and t8.meta_key = 'select-7'
        LEFT JOIN cte_submissions as t10 ON t1.entry_id = t10.entry_id and t10.meta_key = 'upload-2'
        LEFT JOIN cte_submissions as t11 ON t1.entry_id = t11.entry_id and t11.meta_key = 'address-2'
        LEFT JOIN cte_submissions as t12 ON t1.entry_id = t12.entry_id and t12.meta_key = 'text-9'
        LEFT JOIN cte_submissions as t13 ON t1.entry_id = t13.entry_id and t13.meta_key = 'select-1'
        LEFT JOIN cte_submissions as t14 ON t1.entry_id = t14.entry_id and t14.meta_key = 'radio-4'
        LEFT JOIN cte_submissions as t15 ON t1.entry_id = t15.entry_id and t15.meta_key = 'radio-5'
        WHERE t1.meta_key = 'name-1' AND (t8.meta_value LIKE 'International Company%')
        GROUP BY t1.entry_id;
      `);

      let manualCompanies: any[];
      if (roleId === 3) { // Admin
        manualCompanies = await db.$queryRawUnsafe(
          "SELECT c.*, s.salesPersonName FROM `newInternationalCompanies` c LEFT JOIN `sales_dashboard` s ON CONVERT(c.createdById USING utf8mb4) = CONVERT(CAST(s.salesId AS CHAR) USING utf8mb4) WHERE c.`type` = ?",
          "international",
        );
      } else {
        manualCompanies = await db.$queryRawUnsafe(
          "SELECT c.*, s.salesPersonName FROM `newInternationalCompanies` c LEFT JOIN `sales_dashboard` s ON CONVERT(c.createdById USING utf8mb4) = CONVERT(CAST(s.salesId AS CHAR) USING utf8mb4) WHERE c.`type` = ? AND c.`createdById` = ?",
          "international",
          userId
        );
      }

      const mappedManual = this.mapNewCompanies(manualCompanies);

      // Isolation: For sales roles, only show their manual entries. Forminator data is for admins.
      const dataToProcess = roleId === 3 ? [...submissions, ...mappedManual] : mappedManual;

      const sortedSub = await this.sortByCompletedSubmissions(dataToProcess);
      return CastBigIntFromJson(sortedSub);
    } catch (err) {
      logger.error(err + "");
    }
  }

  async getInternationalCompanySubmission(entry_id: bigint, userId: string, roleId: number) {
    try {
      const submission: any[] = await db.$queryRawUnsafe(`
        WITH cte_submissions as (
            SELECT meta.meta_id, meta.meta_value, meta.meta_key, meta.entry_id, meta.date_created, entry.form_id
            FROM wpjm_frmt_form_entry_meta as meta
            INNER JOIN wpjm_frmt_form_entry as entry ON meta.entry_id = entry.entry_id
            WHERE entry.form_id = 4783
        )
        SELECT t1.entry_id, t1.meta_value as 'fullName', t2.meta_value as email, t3.meta_value as 'phoneNo', t5.meta_value as 'companyName', t1.date_created as 'registeredDate', t4.meta_value as 'position', t6.meta_value as 'companyWebsite', t7.meta_value as 'companyProfile', t10.meta_value as 'passport', t11.meta_value as 'address', t12.meta_value as 'pitchProduct', t13.meta_value as 'areaOfInterest', t14.meta_value as 'b2Schedule', t15.meta_value as 'sponsorshipTier'
        FROM cte_submissions as t1
        LEFT JOIN cte_submissions as t2 ON t1.entry_id = t2.entry_id and t2.meta_key = 'email-1'
        LEFT JOIN cte_submissions as t3 ON t1.entry_id = t3.entry_id and t3.meta_key = 'phone-1'
        LEFT JOIN cte_submissions as t4 ON t1.entry_id = t4.entry_id and t4.meta_key = 'text-4'
        LEFT JOIN cte_submissions as t5 ON t1.entry_id = t5.entry_id and t5.meta_key = 'text-7'
        LEFT JOIN cte_submissions as t6 ON t1.entry_id = t6.entry_id and t6.meta_key = 'url-2'
        LEFT JOIN cte_submissions as t7 ON t1.entry_id = t7.entry_id and t7.meta_key = 'upload-9'
        LEFT JOIN cte_submissions as t8 ON t1.entry_id = t8.entry_id and t8.meta_key = 'select-7'
        LEFT JOIN cte_submissions as t10 ON t1.entry_id = t10.entry_id and t10.meta_key = 'upload-2'
        LEFT JOIN cte_submissions as t11 ON t1.entry_id = t11.entry_id and t11.meta_key = 'address-2'
        LEFT JOIN cte_submissions as t12 ON t1.entry_id = t12.entry_id and t12.meta_key = 'text-9'
        LEFT JOIN cte_submissions as t13 ON t1.entry_id = t13.entry_id and t13.meta_key = 'select-1'
        LEFT JOIN cte_submissions as t14 ON t1.entry_id = t14.entry_id and t14.meta_key = 'radio-4'
        LEFT JOIN cte_submissions as t15 ON t1.entry_id = t15.entry_id and t15.meta_key = 'radio-5'
        WHERE t1.meta_key = 'name-1' AND (t8.meta_value LIKE 'International Company%') AND t1.entry_id = ?
        GROUP BY t1.entry_id;
      `, entry_id);

      if (submission && submission.length > 0) {
        return CastBigIntFromJson(submission);
      }

      const manualArr: any[] = await db.$queryRawUnsafe(
        "SELECT c.*, s.salesPersonName FROM `newInternationalCompanies` c LEFT JOIN `sales_dashboard` s ON CONVERT(c.createdById USING utf8mb4) = CONVERT(CAST(s.salesId AS CHAR) USING utf8mb4) WHERE c.`Id` = ?",
        Number(entry_id),
      );
      if (manualArr && manualArr.length > 0) {
        const company = manualArr[0];
        if (roleId !== 3 && company.createdById !== userId) {
          return [];
        }
        return CastBigIntFromJson(this.mapNewCompanies([company]));
      }

      const manualLocArr: any[] = await db.$queryRawUnsafe(
        "SELECT c.*, s.salesPersonName FROM `newLocalCompanies` c LEFT JOIN `sales_dashboard` s ON CONVERT(c.createdById USING utf8mb4) = CONVERT(CAST(s.salesId AS CHAR) USING utf8mb4) WHERE c.`Id` = ?",
        Number(entry_id),
      );
      if (manualLocArr && manualLocArr.length > 0) {
        const company = manualLocArr[0];
        if (roleId !== 3 && company.createdById !== userId) {
          return [];
        }
        return CastBigIntFromJson(this.mapNewCompanies([company]));
      }
      return [];
    } catch (err) {
      logger.error(err + "");
    }
  }

  async getEventAttendeeSubmissions() {
    try {
      const submissions: any[] = await db.$queryRawUnsafe(`
        WITH cte_submissions as (
            SELECT meta.meta_id, meta.meta_value, meta.meta_key, meta.entry_id, meta.date_created, entry.form_id
            FROM wpjm_frmt_form_entry_meta as meta
            INNER JOIN wpjm_frmt_form_entry as entry ON meta.entry_id = entry.entry_id
            WHERE entry.form_id = 4817
        )
        SELECT t1.entry_id, t1.meta_value as 'fullName', t2.meta_value as email, t3.meta_value as 'phoneNo', t1.date_created as 'registeredDate', t4.meta_value as 'ticketType', t5.meta_value as 'interest'
        FROM cte_submissions as t1
        LEFT JOIN cte_submissions as t2 ON t1.entry_id = t2.entry_id and t2.meta_key = 'email-1'
        LEFT JOIN cte_submissions as t3 ON t1.entry_id = t3.entry_id and t3.meta_key = 'phone-1'
        LEFT JOIN cte_submissions as t4 ON t1.entry_id = t4.entry_id and t4.meta_key = 'select-2'
        LEFT JOIN cte_submissions as t5 ON t1.entry_id = t5.entry_id and t5.meta_key = 'select-1'
        LEFT JOIN cte_submissions as t6 ON t1.entry_id = t6.entry_id and t6.meta_key = 'select-3'
        WHERE t1.meta_key = 'name-1' AND t6.meta_value = 'Event'
        GROUP BY t1.entry_id;
      `);
      return CastBigIntFromJson(submissions);
    } catch (err) {
      logger.error(err + "");
    }
  }

  async getConferenceAttendeeSubmissions() {
    try {
      const submissions: any[] = await db.$queryRawUnsafe(`
        WITH cte_submissions as (
            SELECT meta.meta_id, meta.meta_value, meta.meta_key, meta.entry_id, meta.date_created, entry.form_id
            FROM wpjm_frmt_form_entry_meta as meta
            INNER JOIN wpjm_frmt_form_entry as entry ON meta.entry_id = entry.entry_id
            WHERE entry.form_id = 4817
        )
        SELECT t1.entry_id, t1.meta_value as 'fullName', t2.meta_value as email, t3.meta_value as 'phoneNo', t5.meta_value as 'profession', t1.date_created as 'registeredDate', t4.meta_value as 'wantInvestementOpportunity', t9.meta_value as 'attendWorkshop', t6.meta_value as 'interest', t7.meta_value as 'ticketType'
        FROM cte_submissions as t1
        LEFT JOIN cte_submissions as t2 ON t1.entry_id = t2.entry_id and t2.meta_key = 'email-1'
        LEFT JOIN cte_submissions as t3 ON t1.entry_id = t3.entry_id and t3.meta_key = 'phone-1'
        LEFT JOIN cte_submissions as t4 ON t1.entry_id = t4.entry_id and t4.meta_key = 'radio-2'
        LEFT JOIN cte_submissions as t5 ON t1.entry_id = t5.entry_id and t5.meta_key = 'radio-1'
        LEFT JOIN cte_submissions as t6 ON t1.entry_id = t6.entry_id and t6.meta_key = 'select-1'
        LEFT JOIN cte_submissions as t7 ON t1.entry_id = t7.entry_id and t7.meta_key = 'select-2'
        LEFT JOIN cte_submissions as t8 ON t1.entry_id = t8.entry_id and t8.meta_key = 'select-3'
        LEFT JOIN cte_submissions as t9 ON t1.entry_id = t9.entry_id and t9.meta_key = 'radio-3'
        WHERE t1.meta_key = 'name-1' AND t8.meta_value = 'Conference'
        GROUP BY t1.entry_id;
      `);

      return CastBigIntFromJson(submissions);
    } catch (err) {
      logger.error(err + "");
    }
  }

  async getEmabassySubmissions(roleId: number) {
    if (roleId !== 3) return [];
    try {
      const submissions: any[] = await db.$queryRawUnsafe(`
        WITH cte_submissions as (
            SELECT meta.meta_id, meta.meta_value, meta.meta_key, meta.entry_id, meta.date_created, entry.form_id
            FROM wpjm_frmt_form_entry_meta as meta
            INNER JOIN wpjm_frmt_form_entry as entry ON meta.entry_id = entry.entry_id
            WHERE entry.form_id = 4783
        )
        SELECT t1.entry_id, t1.meta_value as 'fullName', t2.meta_value as email, t3.meta_value as 'phoneNo', t5.meta_value as 'embassy', t1.date_created as 'registeredDate', t6.meta_value as 'address', t7.meta_value as 'passport', t8.meta_value as 'requestBilateral', t9.meta_value as 'attendPolicy', t10.meta_value as 'anyDelegation', t11.meta_value as 'numDelegation'
        FROM cte_submissions as t1
        LEFT JOIN cte_submissions as t2 ON t1.entry_id = t2.entry_id and t2.meta_key = 'email-1'
        LEFT JOIN cte_submissions as t3 ON t1.entry_id = t3.entry_id and t3.meta_key = 'phone-1'
        LEFT JOIN cte_submissions as t4 ON t1.entry_id = t4.entry_id and t4.meta_key = 'select-7'
        LEFT JOIN cte_submissions as t5 ON t1.entry_id = t5.entry_id and t5.meta_key = 'text-1'
        LEFT JOIN cte_submissions as t6 ON t1.entry_id = t6.entry_id and t6.meta_key = 'address-1'
        LEFT JOIN cte_submissions as t7 ON t1.entry_id = t7.entry_id and t7.meta_key = 'upload-1'
        LEFT JOIN cte_submissions as t8 ON t1.entry_id = t8.entry_id and t8.meta_key = 'radio-1'
        LEFT JOIN cte_submissions as t9 ON t1.entry_id = t9.entry_id and t9.meta_key = 'radio-3'
        LEFT JOIN cte_submissions as t10 ON t1.entry_id = t10.entry_id and t10.meta_key = 'radio-2'
        LEFT JOIN cte_submissions as t11 ON t1.entry_id = t11.entry_id and t11.meta_key = 'number-2'
        WHERE t1.meta_key = 'name-1' AND (t4.meta_value = 'Embassy Delegation')
        GROUP BY t1.entry_id;
      `);
      const sortedSub = await this.sortByCompletedSubmissions(submissions);
      return CastBigIntFromJson(sortedSub);
    } catch (err) {
      logger.error(err + "");
    }
  }

  async getEmabassySubmissionsById(entry_id: bigint, roleId: number) {
    if (roleId !== 3) return [];
    try {
      const submission: any[] = await db.$queryRawUnsafe(`
        WITH cte_submissions as (
            SELECT meta.meta_id, meta.meta_value, meta.meta_key, meta.entry_id, meta.date_created, entry.form_id
            FROM wpjm_frmt_form_entry_meta as meta
            INNER JOIN wpjm_frmt_form_entry as entry ON meta.entry_id = entry.entry_id
            WHERE entry.form_id = 4783
        )
        SELECT t1.entry_id, t1.meta_value as 'fullName', t2.meta_value as email, t3.meta_value as 'phoneNo', t5.meta_value as 'embassy', t1.date_created as 'registeredDate', t6.meta_value as 'address', t7.meta_value as 'passport', t8.meta_value as 'requestBilateral', t9.meta_value as 'attendPolicy', t10.meta_value as 'anyDelegation', t11.meta_value as 'numDelegation'
        FROM cte_submissions as t1
        LEFT JOIN cte_submissions as t2 ON t1.entry_id = t2.entry_id and t2.meta_key = 'email-1'
        LEFT JOIN cte_submissions as t3 ON t1.entry_id = t3.entry_id and t3.meta_key = 'phone-1'
        LEFT JOIN cte_submissions as t4 ON t1.entry_id = t4.entry_id and t4.meta_key = 'select-7'
        LEFT JOIN cte_submissions as t5 ON t1.entry_id = t5.entry_id and t5.meta_key = 'text-1'
        LEFT JOIN cte_submissions as t6 ON t1.entry_id = t6.entry_id and t6.meta_key = 'address-1'
        LEFT JOIN cte_submissions as t7 ON t1.entry_id = t7.entry_id and t7.meta_key = 'upload-1'
        LEFT JOIN cte_submissions as t8 ON t1.entry_id = t8.entry_id and t8.meta_key = 'radio-1'
        LEFT JOIN cte_submissions as t9 ON t1.entry_id = t9.entry_id and t9.meta_key = 'radio-3'
        LEFT JOIN cte_submissions as t10 ON t1.entry_id = t10.entry_id and t10.meta_key = 'radio-2'
        LEFT JOIN cte_submissions as t11 ON t1.entry_id = t11.entry_id and t11.meta_key = 'number-2'
        WHERE t1.meta_key = 'name-1' AND (t4.meta_value = 'Embassy Delegation') AND t1.entry_id = ?
        GROUP BY t1.entry_id;
      `, entry_id);
      return CastBigIntFromJson(submission);
    } catch (err) {
      logger.error(err + "");
    }
  }

  async getStartupSubmissions(roleId: number) {
    if (roleId !== 3) return [];
    try {
      const submissions: any[] = await db.$queryRawUnsafe(`
        WITH cte_submissions as (
            SELECT meta.meta_id, meta.meta_value, meta.meta_key, meta.entry_id, meta.date_created, entry.form_id
            FROM wpjm_frmt_form_entry_meta as meta
            INNER JOIN wpjm_frmt_form_entry as entry ON meta.entry_id = entry.entry_id
            WHERE entry.form_id = 4783
        )
        SELECT t1.entry_id, t1.meta_value as 'fullName', t2.meta_value as email, t3.meta_value as 'phoneNo', t5.meta_value as 'startupName', t1.date_created as 'registeredDate', t4.meta_value as 'position', t6.meta_value as 'industry', t7.meta_value as 'stage', t8.meta_value as 'startupWebsite', t9.meta_value as 'govId', t10.meta_value as 'pitchdeck', t11.meta_value as 'appliedPegasus', t12.meta_value as 'booth', t14.meta_value as 'reqMentorship'
        FROM cte_submissions as t1
        LEFT JOIN cte_submissions as t2 ON t1.entry_id = t2.entry_id and t2.meta_key = 'email-1'
        LEFT JOIN cte_submissions as t3 ON t1.entry_id = t3.entry_id and t3.meta_key = 'phone-1'
        LEFT JOIN cte_submissions as t4 ON t1.entry_id = t4.entry_id and t4.meta_key = 'text-4'
        LEFT JOIN cte_submissions as t5 ON t1.entry_id = t5.entry_id and t5.meta_key = 'name-2'
        LEFT JOIN cte_submissions as t6 ON t1.entry_id = t6.entry_id and t6.meta_key = 'checkbox-4'
        LEFT JOIN cte_submissions as t7 ON t1.entry_id = t7.entry_id and t7.meta_key = 'checkbox-3'
        LEFT JOIN cte_submissions as t8 ON t1.entry_id = t8.entry_id and t8.meta_key = 'url-3'
        LEFT JOIN cte_submissions as t9 ON t1.entry_id = t9.entry_id and t9.meta_key = 'upload-4'
        LEFT JOIN cte_submissions as t10 ON t1.entry_id = t10.entry_id and t10.meta_key = 'upload-5'
        LEFT JOIN cte_submissions as t11 ON t1.entry_id = t11.entry_id and t11.meta_key = 'radio-8'
        LEFT JOIN cte_submissions as t12 ON t1.entry_id = t12.entry_id and t12.meta_key = 'radio-9'
        LEFT JOIN cte_submissions as t13 ON t1.entry_id = t13.entry_id and t13.meta_key = 'select-7'
        LEFT JOIN cte_submissions as t14 ON t1.entry_id = t14.entry_id and t14.meta_key = 'radio-10'
        WHERE t1.meta_key = 'name-1' AND t13.meta_value = 'Local Startup'
        GROUP BY t1.entry_id;
      `);
      const sortedSub = await this.sortByCompletedSubmissions(submissions);
      return CastBigIntFromJson(sortedSub);
    } catch (err) {
      logger.error(err + "");
    }
  }

  async getStartupSubmissionsById(entry_id: bigint, roleId: number) {
    if (roleId !== 3) return [];
    try {
      const submissions: any[] = await db.$queryRawUnsafe(`
        WITH cte_submissions as (
            SELECT meta.meta_id, meta.meta_value, meta.meta_key, meta.entry_id, meta.date_created, entry.form_id
            FROM wpjm_frmt_form_entry_meta as meta
            INNER JOIN wpjm_frmt_form_entry as entry ON meta.entry_id = entry.entry_id
            WHERE entry.form_id = 4783
        )
        SELECT t1.entry_id, t1.meta_value as 'fullName', t2.meta_value as email, t3.meta_value as 'phoneNo', t5.meta_value as 'startupName', t1.date_created as 'registeredDate', t4.meta_value as 'position', t6.meta_value as 'industry', t7.meta_value as 'stage', t8.meta_value as 'startupWebsite', t9.meta_value as 'govId', t10.meta_value as 'pitchdeck', t11.meta_value as 'appliedPegasus', t12.meta_value as 'booth', t14.meta_value as 'reqMentorship'
        FROM cte_submissions as t1
        LEFT JOIN cte_submissions as t2 ON t1.entry_id = t2.entry_id and t2.meta_key = 'email-1'
        LEFT JOIN cte_submissions as t3 ON t1.entry_id = t3.entry_id and t3.meta_key = 'phone-1'
        LEFT JOIN cte_submissions as t4 ON t1.entry_id = t4.entry_id and t4.meta_key = 'text-4'
        LEFT JOIN cte_submissions as t5 ON t1.entry_id = t5.entry_id and t5.meta_key = 'name-2'
        LEFT JOIN cte_submissions as t6 ON t1.entry_id = t6.entry_id and t6.meta_key = 'checkbox-4'
        LEFT JOIN cte_submissions as t7 ON t1.entry_id = t7.entry_id and t7.meta_key = 'checkbox-3'
        LEFT JOIN cte_submissions as t8 ON t1.entry_id = t8.entry_id and t8.meta_key = 'url-3'
        LEFT JOIN cte_submissions as t9 ON t1.entry_id = t9.entry_id and t9.meta_key = 'upload-4'
        LEFT JOIN cte_submissions as t10 ON t1.entry_id = t10.entry_id and t10.meta_key = 'upload-5'
        LEFT JOIN cte_submissions as t11 ON t1.entry_id = t11.entry_id and t11.meta_key = 'radio-8'
        LEFT JOIN cte_submissions as t12 ON t1.entry_id = t12.entry_id and t12.meta_key = 'radio-9'
        LEFT JOIN cte_submissions as t13 ON t1.entry_id = t13.entry_id and t13.meta_key = 'select-7'
        LEFT JOIN cte_submissions as t14 ON t1.entry_id = t14.entry_id and t14.meta_key = 'radio-10'
        WHERE t1.meta_key = 'name-1' AND t13.meta_value = 'Local Startup' AND t1.entry_id = ?
        GROUP BY t1.entry_id;
      `, entry_id);
      return CastBigIntFromJson(submissions);
    } catch (err) {
      logger.error(err + "");
    }
  }

  async deleteNGOSubmission(entry_id: bigint) {
    try {
      return await db.$transaction([
        db.wpjm_frmt_form_entry_meta.deleteMany({ where: { entry_id } }),
        db.wpjm_frmt_form_entry.delete({ where: { entry_id } }),
      ]);
    } catch (err) {
      logger.error(err + "");
      throw err;
    }
  }

  async deleteLocalCompanySubmission(entry_id: bigint) {
    try {
      const exists = await db.wpjm_frmt_form_entry.findUnique({
        where: { entry_id },
      });
      if (exists) {
        return await db.$transaction([
          db.wpjm_frmt_form_entry_meta.deleteMany({ where: { entry_id } }),
          db.wpjm_frmt_form_entry.delete({ where: { entry_id } }),
        ]);
      }

      // Try manual
      const manualArr: any[] = await db.$queryRawUnsafe(
        "SELECT * FROM `newLocalCompanies` WHERE `Id` = ?",
        Number(entry_id),
      );
      if (manualArr && manualArr.length > 0) {
        return await db.$executeRawUnsafe(
          "DELETE FROM `newLocalCompanies` WHERE `Id` = ?",
          Number(entry_id),
        );
      }
      throw new Error("Submission not found");
    } catch (err) {
      logger.error(err + "");
      throw err;
    }
  }

  async deleteEmbassySubmission(entry_id: bigint) {
    try {
      return await db.$transaction([
        db.wpjm_frmt_form_entry_meta.deleteMany({ where: { entry_id } }),
        db.wpjm_frmt_form_entry.delete({ where: { entry_id } }),
      ]);
    } catch (err) {
      logger.error(err + "");
      throw err;
    }
  }

  async deleteInternationalCompanySubmission(entry_id: bigint) {
    try {
      const exists = await db.wpjm_frmt_form_entry.findUnique({
        where: { entry_id },
      });
      if (exists) {
        return await db.$transaction([
          db.wpjm_frmt_form_entry_meta.deleteMany({ where: { entry_id } }),
          db.wpjm_frmt_form_entry.delete({ where: { entry_id } }),
        ]);
      }

      const manualArr: any[] = await db.$queryRawUnsafe(
        "SELECT * FROM `newInternationalCompanies` WHERE `Id` = ?",
        Number(entry_id),
      );
      if (manualArr && manualArr.length > 0) {
        return await db.$executeRawUnsafe(
          "DELETE FROM `newInternationalCompanies` WHERE `Id` = ?",
          Number(entry_id),
        );
      }
      throw new Error("Submission not found");
    } catch (err) {
      logger.error(err + "");
      throw err;
    }
  }

  async deleteStartupSubmission(entry_id: bigint) {
    try {
      return await db.$transaction([
        db.wpjm_frmt_form_entry_meta.deleteMany({ where: { entry_id } }),
        db.wpjm_frmt_form_entry.delete({ where: { entry_id } }),
      ]);
    } catch (err) {
      logger.error(err + "");
      throw err;
    }
  }

  async deleteEventSubmission(entry_id: bigint) {
    try {
      return await db.$transaction([
        db.wpjm_frmt_form_entry_meta.deleteMany({ where: { entry_id } }),
        db.wpjm_frmt_form_entry.delete({ where: { entry_id } }),
      ]);
    } catch (err) {
      logger.error(err + "");
      throw err;
    }
  }

  async deleteConferenceSubmission(entry_id: bigint) {
    try {
      return await db.$transaction([
        db.wpjm_frmt_form_entry_meta.deleteMany({ where: { entry_id } }),
        db.wpjm_frmt_form_entry.delete({ where: { entry_id } }),
      ]);
    } catch (err) {
      logger.error(err + "");
      throw err;
    }
  }

  async getChartData(userId: string, roleId: number, type: string, startDate?: string, endDate?: string) {
    try {
      const applyDateFilter = (data: any[]) => {
        if (!startDate && !endDate) return data;
        return data.filter((d) => {
          const date = new Date(d.registeredDate);
          if (startDate && date < new Date(startDate)) return false;
          if (endDate && date > new Date(endDate)) return false;
          return true;
        });
      };

      const buildLineChart = (datasets: { label: string; data: any[] }[]) => {
        const allDates = new Set<string>();
        datasets.forEach(({ data }) => {
          data.forEach((d) => {
            const dateStr = new Date(d.registeredDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            allDates.add(dateStr);
          });
        });

        const sortedDates = Array.from(allDates).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

        return {
          labels: sortedDates,
          datasets: datasets.map(({ label, data }) => {
            const countByDate: Record<string, number> = {};
            data.forEach((d) => {
              const dateStr = new Date(d.registeredDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              countByDate[dateStr] = (countByDate[dateStr] || 0) + 1;
            });
            return {
              label,
              data: sortedDates.map((d) => countByDate[d] || 0),
            };
          }),
        };
      };

      if (type === 'attendees') {
        const [eventRaw, confRaw] = await Promise.all([
          this.getEventAttendeeSubmissions(),
          this.getConferenceAttendeeSubmissions(),
        ]);

        const events = applyDateFilter(eventRaw || []);
        const confs = applyDateFilter(confRaw || []);

        // Pie chart: event vs conference breakdown
        const pieChart = [
          { name: 'Event Attendees', value: events.length },
          { name: 'Conference Attendees', value: confs.length },
        ];

        // Line chart: registrations over time
        const lineChart = buildLineChart([
          { label: 'Event Attendees', data: events },
          { label: 'Conference Attendees', data: confs },
        ]);

        // Histogram: ticket type distribution
        const ticketCounts: Record<string, number> = {};
        events.forEach((e) => {
          const t = e.ticketType || 'Unknown';
          ticketCounts[t] = (ticketCounts[t] || 0) + 1;
        });
        const histogram = Object.entries(ticketCounts).map(([name, value]) => ({ name, value }));

        return { pieChart, lineChart, histogram };
      } else {
        // Participants
        const [ngo, local, intl, startup, embassy] = await Promise.all([
          this.getNGOSubmissions(roleId),
          this.getLocalCompanySubmissions(userId, roleId),
          this.getInternationalCompanySubmissions(userId, roleId),
          this.getStartupSubmissions(roleId),
          this.getEmabassySubmissions(roleId),
        ]);

        const ngoF = applyDateFilter(ngo || []);
        const localF = applyDateFilter(local || []);
        const intlF = applyDateFilter(intl || []);
        const startupF = applyDateFilter(startup || []);
        const embassyF = applyDateFilter(embassy || []);

        const pieChart = [
          { name: 'NGO', value: ngoF.length },
          { name: 'Local Company', value: localF.length },
          { name: 'International', value: intlF.length },
          { name: 'Startup', value: startupF.length },
          { name: 'Embassy', value: embassyF.length },
        ];

        const lineChart = buildLineChart([
          { label: 'NGO', data: ngoF },
          { label: 'Local Company', data: localF },
          { label: 'International', data: intlF },
          { label: 'Startup', data: startupF },
          { label: 'Embassy', data: embassyF },
        ]);

        const histogram = pieChart;

        return { pieChart, lineChart, histogram };
      }
    } catch (err) {
      logger.error(err + "");
      return null;
    }
  }
}

