WITH
    cte_submissions as (
        SELECT meta.meta_id, meta.meta_value, meta.meta_key, meta.entry_id, meta.date_created, entry.form_id
        FROM
            wpjm_frmt_form_entry_meta as meta
            INNER JOIN wpjm_frmt_form_entry as entry ON meta.entry_id = entry.entry_id
        WHERE
            entry.form_id = 4783
    )
SELECT t1.entry_id, 
       t1.meta_value as 'fullName', 
       t2.meta_value as email, 
       t3.meta_value as 'phoneNo', 
       t5.meta_value as 'startupName', 
       t1.date_created as 'registeredDate'
FROM
    cte_submissions as t1
    LEFT JOIN cte_submissions as t2 ON t1.entry_id = t2.entry_id
    and t2.meta_key = 'email-1'
    LEFT JOIN cte_submissions as t3 ON t1.entry_id = t3.entry_id
    and t3.meta_key = 'phone-1'
    LEFT JOIN cte_submissions as t4 ON t1.entry_id = t4.entry_id
    and t4.meta_key = 'select-7'
    LEFT JOIN cte_submissions as t5 ON t1.entry_id = t5.entry_id
    and t5.meta_key = 'name-2'
WHERE
    t1.meta_key = 'name-1' AND (t4.meta_value = 'Local Startup')
GROUP BY
    t1.entry_id;