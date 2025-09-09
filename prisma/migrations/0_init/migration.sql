-- CreateTable
CREATE TABLE `wpjm_actionscheduler_actions` (
    `action_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `hook` VARCHAR(191) NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `scheduled_date_gmt` DATETIME(0) NULL DEFAULT ('0000-00-00 00:00:00'),
    `scheduled_date_local` DATETIME(0) NULL DEFAULT ('0000-00-00 00:00:00'),
    `priority` TINYINT UNSIGNED NOT NULL DEFAULT 10,
    `args` VARCHAR(191) NULL,
    `schedule` LONGTEXT NULL,
    `group_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `attempts` INTEGER NOT NULL DEFAULT 0,
    `last_attempt_gmt` DATETIME(0) NULL DEFAULT ('0000-00-00 00:00:00'),
    `last_attempt_local` DATETIME(0) NULL DEFAULT ('0000-00-00 00:00:00'),
    `claim_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `extended_args` VARCHAR(8000) NULL,

    INDEX `args`(`args`),
    INDEX `claim_id_status_scheduled_date_gmt`(`claim_id`, `status`, `scheduled_date_gmt`),
    INDEX `group_id`(`group_id`),
    INDEX `hook_status_scheduled_date_gmt`(`hook`(163), `status`, `scheduled_date_gmt`),
    INDEX `last_attempt_gmt`(`last_attempt_gmt`),
    INDEX `scheduled_date_gmt`(`scheduled_date_gmt`),
    INDEX `status_scheduled_date_gmt`(`status`, `scheduled_date_gmt`),
    PRIMARY KEY (`action_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_actionscheduler_claims` (
    `claim_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `date_created_gmt` DATETIME(0) NULL DEFAULT ('0000-00-00 00:00:00'),

    INDEX `date_created_gmt`(`date_created_gmt`),
    PRIMARY KEY (`claim_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_actionscheduler_groups` (
    `group_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(255) NOT NULL,

    INDEX `slug`(`slug`(191)),
    PRIMARY KEY (`group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_actionscheduler_logs` (
    `log_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `action_id` BIGINT UNSIGNED NOT NULL,
    `message` TEXT NOT NULL,
    `log_date_gmt` DATETIME(0) NULL DEFAULT ('0000-00-00 00:00:00'),
    `log_date_local` DATETIME(0) NULL DEFAULT ('0000-00-00 00:00:00'),

    INDEX `action_id`(`action_id`),
    INDEX `log_date_gmt`(`log_date_gmt`),
    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_addonlibrary_addons` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `name` VARCHAR(128) NULL,
    `alias` VARCHAR(128) NULL,
    `addontype` VARCHAR(128) NULL,
    `description` TEXT NULL,
    `ordering` INTEGER NOT NULL,
    `templates` MEDIUMTEXT NULL,
    `config` MEDIUMTEXT NULL,
    `catid` INTEGER NULL,
    `is_active` TINYINT NULL,
    `test_slot1` TEXT NULL,
    `test_slot2` TEXT NULL,
    `test_slot3` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_addonlibrary_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `alias` VARCHAR(255) NULL,
    `ordering` INTEGER NOT NULL,
    `params` TEXT NOT NULL,
    `type` TINYTEXT NULL,
    `parent_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_betterlinkmeta` (
    `meta_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `link_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NOT NULL DEFAULT '',
    `meta_value` LONGTEXT NOT NULL DEFAULT '',

    INDEX `link_id`(`link_id`),
    INDEX `meta_key`(`meta_key`),
    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_betterlinks` (
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `link_author` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `link_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `link_date_gmt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `link_title` TEXT NOT NULL,
    `link_slug` VARCHAR(200) NOT NULL DEFAULT '',
    `link_note` TEXT NOT NULL,
    `link_status` VARCHAR(20) NOT NULL DEFAULT 'publish',
    `nofollow` VARCHAR(10) NULL,
    `sponsored` VARCHAR(10) NULL,
    `track_me` VARCHAR(10) NULL,
    `param_forwarding` VARCHAR(10) NULL,
    `param_struct` VARCHAR(255) NULL,
    `redirect_type` VARCHAR(255) NULL DEFAULT '307',
    `target_url` TEXT NULL,
    `short_url` VARCHAR(255) NULL,
    `link_order` TINYINT NULL DEFAULT 0,
    `link_modified` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `link_modified_gmt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `wildcards` BOOLEAN NOT NULL DEFAULT false,
    `expire` TEXT NULL,
    `dynamic_redirect` TEXT NULL,
    `favorite` VARCHAR(255) NULL,
    `uncloaked` VARCHAR(10) NULL DEFAULT '',

    INDEX `link_author`(`link_author`),
    INDEX `link_order`(`link_order`),
    INDEX `link_slug`(`link_slug`(191)),
    INDEX `type_status_date`(`link_status`, `link_date`, `ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_betterlinks_clicks` (
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `link_id` BIGINT NOT NULL,
    `ip` VARCHAR(255) NULL,
    `browser` VARCHAR(255) NULL,
    `os` VARCHAR(255) NULL,
    `device` VARCHAR(20) NULL,
    `brand_name` VARCHAR(20) NULL,
    `model` VARCHAR(20) NULL,
    `bot_name` VARCHAR(20) NULL,
    `browser_type` VARCHAR(20) NULL,
    `os_version` VARCHAR(20) NULL,
    `browser_version` VARCHAR(20) NULL,
    `language` VARCHAR(10) NULL,
    `query_params` TEXT NULL,
    `referer` VARCHAR(255) NULL,
    `host` VARCHAR(255) NULL,
    `uri` VARCHAR(255) NULL,
    `click_count` TINYINT NOT NULL DEFAULT 0,
    `visitor_id` VARCHAR(25) NULL,
    `click_order` TINYINT NULL DEFAULT 0,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at_gmt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `rotation_target_url` VARCHAR(255) NULL,

    INDEX `click_order`(`click_order`),
    INDEX `created_at_idx`(`created_at`),
    INDEX `ip`(`ip`),
    INDEX `link_id`(`link_id`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_betterlinks_password` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `link_id` BIGINT UNSIGNED NOT NULL,
    `password` VARCHAR(255) NULL,
    `status` BOOLEAN NULL,
    `allow_contact` BOOLEAN NULL DEFAULT false,

    INDEX `link_id`(`link_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_betterlinks_terms` (
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `term_name` TEXT NOT NULL,
    `term_slug` VARCHAR(200) NOT NULL DEFAULT '',
    `term_type` VARCHAR(15) NOT NULL,
    `term_order` TINYINT NULL DEFAULT 0,

    INDEX `term_order`(`term_order`),
    INDEX `term_slug`(`term_slug`(191)),
    INDEX `term_type`(`term_type`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_betterlinks_terms_relationships` (
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `term_id` BIGINT NULL DEFAULT 0,
    `link_id` BIGINT NULL DEFAULT 0,

    INDEX `link_id`(`link_id`),
    INDEX `term_id`(`term_id`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_blpwp_links` (
    `id_link` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_post` INTEGER UNSIGNED NOT NULL,
    `de_url` VARCHAR(1024) NOT NULL,
    `hover` INTEGER NOT NULL,
    `click` INTEGER NOT NULL,
    `error` TINYINT NOT NULL,
    `fl_internal` BOOLEAN NOT NULL DEFAULT false,
    `de_domain` VARCHAR(150) NOT NULL DEFAULT '',
    `de_rel` VARCHAR(50) NOT NULL DEFAULT '',

    PRIMARY KEY (`id_link`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_blpwp_stats` (
    `cd_link` INTEGER NOT NULL,
    `thedate` DATE NOT NULL,
    `action` ENUM('click', 'hover') NOT NULL,
    `count` INTEGER NOT NULL,

    UNIQUE INDEX `cd_link`(`cd_link`, `thedate`, `action`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_commentmeta` (
    `meta_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `comment_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `comment_id`(`comment_id`),
    INDEX `meta_key`(`meta_key`(191)),
    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_comments` (
    `comment_ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `comment_post_ID` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `comment_author` TINYTEXT NOT NULL,
    `comment_author_email` VARCHAR(100) NOT NULL DEFAULT '',
    `comment_author_url` VARCHAR(200) NOT NULL DEFAULT '',
    `comment_author_IP` VARCHAR(100) NOT NULL DEFAULT '',
    `comment_date` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `comment_date_gmt` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `comment_content` TEXT NOT NULL,
    `comment_karma` INTEGER NOT NULL DEFAULT 0,
    `comment_approved` VARCHAR(20) NOT NULL DEFAULT '1',
    `comment_agent` VARCHAR(255) NOT NULL DEFAULT '',
    `comment_type` VARCHAR(20) NOT NULL DEFAULT 'comment',
    `comment_parent` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `user_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,

    INDEX `comment_approved_date_gmt`(`comment_approved`, `comment_date_gmt`),
    INDEX `comment_author_email`(`comment_author_email`(10)),
    INDEX `comment_date_gmt`(`comment_date_gmt`),
    INDEX `comment_parent`(`comment_parent`),
    INDEX `comment_post_ID`(`comment_post_ID`),
    PRIMARY KEY (`comment_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_cookieadmin_consents` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `consent_id` VARCHAR(128) NOT NULL,
    `user_ip` VARBINARY(16) NULL,
    `consent_time` INTEGER NOT NULL,
    `country` VARCHAR(150) NULL,
    `browser` TEXT NULL,
    `domain` VARCHAR(255) NULL,
    `consent_status` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `consent_id`(`consent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_cookieadmin_cookies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cookie_name` VARCHAR(100) NOT NULL,
    `category` VARCHAR(50) NULL,
    `description` VARCHAR(500) NULL,
    `domain` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NULL DEFAULT '/',
    `expires` DATETIME(0) NULL,
    `max_age` INTEGER NULL,
    `samesite` VARCHAR(10) NULL,
    `secure` BOOLEAN NOT NULL DEFAULT false,
    `httponly` BOOLEAN NOT NULL DEFAULT false,
    `raw_name` VARCHAR(255) NULL,
    `edited` BOOLEAN NULL DEFAULT false,
    `patterns` VARCHAR(255) NOT NULL DEFAULT '[]',
    `scan_timestamp` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_duplicator_packages` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `hash` VARCHAR(50) NOT NULL,
    `status` INTEGER NOT NULL,
    `created` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `owner` VARCHAR(60) NOT NULL,
    `package` LONGTEXT NOT NULL,

    INDEX `hash`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_e_events` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `event_data` TEXT NULL,
    `created_at` DATETIME(0) NOT NULL,

    INDEX `created_at_index`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_eb_form_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `block_id` VARCHAR(24) NOT NULL,
    `title` TEXT NOT NULL,
    `fields` TEXT NOT NULL,
    `form_options` TEXT NOT NULL,
    `settings` TEXT NOT NULL,
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `block_id`(`block_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_frmt_form_entry` (
    `entry_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entry_type` VARCHAR(191) NOT NULL,
    `draft_id` VARCHAR(12) NULL,
    `form_id` BIGINT UNSIGNED NOT NULL,
    `is_spam` BOOLEAN NOT NULL DEFAULT false,
    `date_created` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),

    INDEX `entry_form_id`(`form_id`),
    INDEX `entry_is_spam`(`is_spam`),
    INDEX `entry_type`(`entry_type`),
    PRIMARY KEY (`entry_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_frmt_form_entry_meta` (
    `meta_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entry_id` BIGINT UNSIGNED NOT NULL,
    `meta_key` VARCHAR(191) NULL,
    `meta_value` LONGTEXT NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `date_updated` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),

    INDEX `meta_entry_id`(`entry_id`),
    INDEX `meta_key`(`meta_key`),
    INDEX `meta_key_object`(`entry_id`, `meta_key`),
    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_frmt_form_reports` (
    `report_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `report_value` LONGTEXT NOT NULL,
    `status` VARCHAR(200) NOT NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `date_updated` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),

    PRIMARY KEY (`report_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_frmt_form_views` (
    `view_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `form_id` BIGINT UNSIGNED NOT NULL,
    `page_id` BIGINT UNSIGNED NOT NULL,
    `ip` VARCHAR(191) NULL,
    `count` MEDIUMINT UNSIGNED NOT NULL DEFAULT 1,
    `date_created` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `date_updated` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),

    INDEX `view_form_id`(`form_id`),
    INDEX `view_form_object`(`form_id`, `view_id`),
    INDEX `view_form_object_ip`(`form_id`, `view_id`, `ip`),
    INDEX `view_ip`(`ip`),
    PRIMARY KEY (`view_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_imagify_files` (
    `file_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `folder_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `file_date` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `path` VARCHAR(191) NOT NULL DEFAULT '',
    `hash` VARCHAR(32) NOT NULL DEFAULT '',
    `mime_type` VARCHAR(100) NOT NULL DEFAULT '',
    `modified` BOOLEAN NOT NULL DEFAULT false,
    `width` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `height` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `original_size` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `optimized_size` INTEGER UNSIGNED NULL,
    `percent` SMALLINT UNSIGNED NULL,
    `optimization_level` BOOLEAN NULL,
    `status` VARCHAR(20) NULL,
    `error` VARCHAR(255) NULL,
    `data` LONGTEXT NULL,

    UNIQUE INDEX `path`(`path`),
    INDEX `folder_id`(`folder_id`),
    INDEX `modified`(`modified`),
    INDEX `optimization_level`(`optimization_level`),
    INDEX `status`(`status`),
    PRIMARY KEY (`file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_imagify_folders` (
    `folder_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL DEFAULT '',
    `active` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `path`(`path`),
    INDEX `active`(`active`),
    PRIMARY KEY (`folder_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_links` (
    `link_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `link_url` VARCHAR(255) NOT NULL DEFAULT '',
    `link_name` VARCHAR(255) NOT NULL DEFAULT '',
    `link_image` VARCHAR(255) NOT NULL DEFAULT '',
    `link_target` VARCHAR(25) NOT NULL DEFAULT '',
    `link_description` VARCHAR(255) NOT NULL DEFAULT '',
    `link_visible` VARCHAR(20) NOT NULL DEFAULT 'Y',
    `link_owner` BIGINT UNSIGNED NOT NULL DEFAULT 1,
    `link_rating` INTEGER NOT NULL DEFAULT 0,
    `link_updated` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `link_rel` VARCHAR(255) NOT NULL DEFAULT '',
    `link_notes` MEDIUMTEXT NOT NULL,
    `link_rss` VARCHAR(255) NOT NULL DEFAULT '',

    INDEX `link_visible`(`link_visible`),
    PRIMARY KEY (`link_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_loginizer_logs` (
    `username` VARCHAR(255) NOT NULL DEFAULT '',
    `time` INTEGER NOT NULL DEFAULT 0,
    `count` INTEGER NOT NULL DEFAULT 0,
    `lockout` INTEGER NOT NULL DEFAULT 0,
    `ip` VARCHAR(255) NOT NULL DEFAULT '',
    `url` VARCHAR(255) NOT NULL DEFAULT '',

    UNIQUE INDEX `ip`(`ip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_options` (
    `option_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `option_name` VARCHAR(191) NOT NULL DEFAULT '',
    `option_value` LONGTEXT NOT NULL,
    `autoload` VARCHAR(20) NOT NULL DEFAULT 'yes',

    UNIQUE INDEX `option_name`(`option_name`),
    INDEX `autoload`(`autoload`),
    PRIMARY KEY (`option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_postmeta` (
    `meta_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `post_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `meta_key`(`meta_key`(191)),
    INDEX `post_id`(`post_id`),
    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_posts` (
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `post_author` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `post_date` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `post_date_gmt` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `post_content` LONGTEXT NOT NULL,
    `post_title` TEXT NOT NULL,
    `post_excerpt` TEXT NOT NULL,
    `post_status` VARCHAR(20) NOT NULL DEFAULT 'publish',
    `comment_status` VARCHAR(20) NOT NULL DEFAULT 'open',
    `ping_status` VARCHAR(20) NOT NULL DEFAULT 'open',
    `post_password` VARCHAR(255) NOT NULL DEFAULT '',
    `post_name` VARCHAR(200) NOT NULL DEFAULT '',
    `to_ping` TEXT NOT NULL,
    `pinged` TEXT NOT NULL,
    `post_modified` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `post_modified_gmt` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `post_content_filtered` LONGTEXT NOT NULL,
    `post_parent` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `guid` VARCHAR(255) NOT NULL DEFAULT '',
    `menu_order` INTEGER NOT NULL DEFAULT 0,
    `post_type` VARCHAR(20) NOT NULL DEFAULT 'post',
    `post_mime_type` VARCHAR(100) NOT NULL DEFAULT '',
    `comment_count` BIGINT NOT NULL DEFAULT 0,

    INDEX `post_author`(`post_author`),
    INDEX `post_name`(`post_name`(191)),
    INDEX `post_parent`(`post_parent`),
    INDEX `type_status_date`(`post_type`, `post_status`, `post_date`, `ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_seopress_content_analysis` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `post_id` BIGINT NULL,
    `title` LONGTEXT NULL,
    `description` LONGTEXT NULL,
    `og_title` LONGTEXT NULL,
    `og_description` LONGTEXT NULL,
    `og_image` LONGTEXT NULL,
    `og_url` LONGTEXT NULL,
    `og_site_name` LONGTEXT NULL,
    `twitter_title` LONGTEXT NULL,
    `twitter_description` LONGTEXT NULL,
    `twitter_image` LONGTEXT NULL,
    `twitter_image_src` LONGTEXT NULL,
    `canonical` LONGTEXT NULL,
    `h1` LONGTEXT NULL,
    `h2` LONGTEXT NULL,
    `h3` LONGTEXT NULL,
    `images` LONGTEXT NULL,
    `meta_robots` LONGTEXT NULL,
    `meta_google` LONGTEXT NULL,
    `links_no_follow` LONGTEXT NULL,
    `outbound_links` LONGTEXT NULL,
    `internal_links` LONGTEXT NULL,
    `json_schemas` LONGTEXT NULL,
    `keywords` TEXT NULL,
    `permalink` TEXT NULL,
    `score` TEXT NULL,
    `analysis_date` DATETIME(0) NULL,

    INDEX `idx_post_id`(`post_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_snippets` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` TINYTEXT NOT NULL,
    `description` TEXT NOT NULL,
    `code` LONGTEXT NOT NULL,
    `tags` LONGTEXT NOT NULL,
    `scope` VARCHAR(15) NOT NULL DEFAULT 'global',
    `priority` SMALLINT NOT NULL DEFAULT 10,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `modified` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `revision` BIGINT NOT NULL DEFAULT 1,
    `cloud_id` VARCHAR(255) NULL,

    INDEX `active`(`active`),
    INDEX `scope`(`scope`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_term_relationships` (
    `object_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `term_taxonomy_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `term_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `term_taxonomy_id`(`term_taxonomy_id`),
    PRIMARY KEY (`object_id`, `term_taxonomy_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_term_taxonomy` (
    `term_taxonomy_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `term_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `taxonomy` VARCHAR(32) NOT NULL DEFAULT '',
    `description` LONGTEXT NOT NULL,
    `parent` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `count` BIGINT NOT NULL DEFAULT 0,

    INDEX `taxonomy`(`taxonomy`),
    UNIQUE INDEX `term_id_taxonomy`(`term_id`, `taxonomy`),
    PRIMARY KEY (`term_taxonomy_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_termmeta` (
    `meta_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `term_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `meta_key`(`meta_key`(191)),
    INDEX `term_id`(`term_id`),
    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_terms` (
    `term_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL DEFAULT '',
    `slug` VARCHAR(200) NOT NULL DEFAULT '',
    `term_group` BIGINT NOT NULL DEFAULT 0,

    INDEX `name`(`name`(191)),
    INDEX `slug`(`slug`(191)),
    PRIMARY KEY (`term_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_tm_taskmeta` (
    `meta_id` BIGINT NOT NULL AUTO_INCREMENT,
    `task_id` BIGINT NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `meta_key`(`meta_key`(191)),
    INDEX `task_id`(`task_id`),
    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_tm_tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `type` VARCHAR(300) NOT NULL,
    `class_identifier` VARCHAR(300) NULL DEFAULT '0',
    `attempts` INTEGER NULL DEFAULT 0,
    `description` VARCHAR(300) NULL,
    `time_created` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `last_locked_at` BIGINT NULL DEFAULT 0,
    `status` VARCHAR(300) NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_usermeta` (
    `umeta_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `meta_key`(`meta_key`(191)),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`umeta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_users` (
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_login` VARCHAR(60) NOT NULL DEFAULT '',
    `user_pass` VARCHAR(255) NOT NULL DEFAULT '',
    `user_nicename` VARCHAR(50) NOT NULL DEFAULT '',
    `user_email` VARCHAR(100) NOT NULL DEFAULT '',
    `user_url` VARCHAR(100) NOT NULL DEFAULT '',
    `user_registered` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `user_activation_key` VARCHAR(255) NOT NULL DEFAULT '',
    `user_status` INTEGER NOT NULL DEFAULT 0,
    `display_name` VARCHAR(250) NOT NULL DEFAULT '',

    INDEX `user_email`(`user_email`),
    INDEX `user_login_key`(`user_login`),
    INDEX `user_nicename`(`user_nicename`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfauditevents` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL DEFAULT '',
    `data` TEXT NOT NULL,
    `event_time` DOUBLE NOT NULL,
    `request_id` BIGINT UNSIGNED NOT NULL,
    `state` ENUM('new', 'sending', 'sent') NOT NULL DEFAULT 'new',
    `state_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfblockediplog` (
    `IP` BINARY(16) NOT NULL DEFAULT ('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),
    `countryCode` VARCHAR(2) NOT NULL,
    `blockCount` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `unixday` INTEGER UNSIGNED NOT NULL,
    `blockType` VARCHAR(50) NOT NULL DEFAULT 'generic',

    PRIMARY KEY (`IP`, `unixday`, `blockType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfblocks7` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `IP` BINARY(16) NOT NULL DEFAULT ('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),
    `blockedTime` BIGINT NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `lastAttempt` INTEGER UNSIGNED NULL DEFAULT 0,
    `blockedHits` INTEGER UNSIGNED NULL DEFAULT 0,
    `expiration` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `parameters` TEXT NULL,

    INDEX `IP`(`IP`),
    INDEX `expiration`(`expiration`),
    INDEX `type`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfconfig` (
    `name` VARCHAR(100) NOT NULL,
    `val` LONGBLOB NULL,
    `autoload` ENUM('no', 'yes') NOT NULL DEFAULT 'yes',

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfcrawlers` (
    `IP` BINARY(16) NOT NULL DEFAULT ('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),
    `patternSig` BINARY(16) NOT NULL,
    `status` CHAR(8) NOT NULL,
    `lastUpdate` INTEGER UNSIGNED NOT NULL,
    `PTR` VARCHAR(255) NULL DEFAULT '',

    PRIMARY KEY (`IP`, `patternSig`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wffilechanges` (
    `filenameHash` CHAR(64) NOT NULL,
    `file` VARCHAR(1000) NOT NULL,
    `md5` CHAR(32) NOT NULL,

    PRIMARY KEY (`filenameHash`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wffilemods` (
    `filenameMD5` BINARY(16) NOT NULL,
    `filename` VARCHAR(1000) NOT NULL,
    `real_path` TEXT NOT NULL,
    `knownFile` TINYINT UNSIGNED NOT NULL,
    `oldMD5` BINARY(16) NOT NULL DEFAULT ('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),
    `newMD5` BINARY(16) NOT NULL,
    `SHAC` BINARY(32) NOT NULL DEFAULT ('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),
    `stoppedOnSignature` VARCHAR(255) NOT NULL DEFAULT '',
    `stoppedOnPosition` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `isSafeFile` VARCHAR(1) NOT NULL DEFAULT '?',

    PRIMARY KEY (`filenameMD5`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfhits` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `attackLogTime` DOUBLE NOT NULL,
    `ctime` DOUBLE NOT NULL,
    `IP` BINARY(16) NULL,
    `jsRun` TINYINT NULL DEFAULT 0,
    `statusCode` INTEGER NOT NULL DEFAULT 200,
    `isGoogle` TINYINT NOT NULL,
    `userID` INTEGER UNSIGNED NOT NULL,
    `newVisit` TINYINT UNSIGNED NOT NULL,
    `URL` TEXT NULL,
    `referer` TEXT NULL,
    `UA` TEXT NULL,
    `action` VARCHAR(64) NOT NULL DEFAULT '',
    `actionDescription` TEXT NULL,
    `actionData` TEXT NULL,

    INDEX `attackLogTime`(`attackLogTime`),
    INDEX `k1`(`ctime`),
    INDEX `k2`(`IP`, `ctime`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfhoover` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `owner` TEXT NULL,
    `host` TEXT NULL,
    `path` TEXT NULL,
    `hostKey` VARBINARY(124) NULL,

    INDEX `k2`(`hostKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfissues` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `time` INTEGER UNSIGNED NOT NULL,
    `lastUpdated` INTEGER UNSIGNED NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `severity` TINYINT UNSIGNED NOT NULL,
    `ignoreP` CHAR(32) NOT NULL,
    `ignoreC` CHAR(32) NOT NULL,
    `shortMsg` VARCHAR(255) NOT NULL,
    `longMsg` TEXT NULL,
    `data` TEXT NULL,

    INDEX `ignoreC`(`ignoreC`),
    INDEX `ignoreP`(`ignoreP`),
    INDEX `lastUpdated`(`lastUpdated`),
    INDEX `status`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfknownfilelist` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `path` TEXT NOT NULL,
    `wordpress_path` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wflivetraffichuman` (
    `IP` BINARY(16) NOT NULL DEFAULT ('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),
    `identifier` BINARY(32) NOT NULL DEFAULT ('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),
    `expiration` INTEGER UNSIGNED NOT NULL,

    INDEX `expiration`(`expiration`),
    PRIMARY KEY (`IP`, `identifier`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wflocs` (
    `IP` BINARY(16) NOT NULL DEFAULT ('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),
    `ctime` INTEGER UNSIGNED NOT NULL,
    `failed` TINYINT UNSIGNED NOT NULL,
    `city` VARCHAR(255) NULL DEFAULT '',
    `region` VARCHAR(255) NULL DEFAULT '',
    `countryName` VARCHAR(255) NULL DEFAULT '',
    `countryCode` CHAR(2) NULL DEFAULT '',
    `lat` FLOAT NULL DEFAULT 0.0000000,
    `lon` FLOAT NULL DEFAULT 0.0000000,

    PRIMARY KEY (`IP`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wflogins` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `hitID` INTEGER NULL,
    `ctime` DOUBLE NOT NULL,
    `fail` TINYINT UNSIGNED NOT NULL,
    `action` VARCHAR(40) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `userID` INTEGER UNSIGNED NOT NULL,
    `IP` BINARY(16) NULL,
    `UA` TEXT NULL,

    INDEX `hitID`(`hitID`),
    INDEX `k1`(`IP`, `fail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfls_2fa_secrets` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `secret` TINYBLOB NOT NULL,
    `recovery` BLOB NOT NULL,
    `ctime` INTEGER UNSIGNED NOT NULL,
    `vtime` INTEGER UNSIGNED NOT NULL,
    `mode` ENUM('authenticator') NOT NULL DEFAULT 'authenticator',

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfls_role_counts` (
    `serialized_roles` VARBINARY(255) NOT NULL,
    `two_factor_inactive` BOOLEAN NOT NULL,
    `user_count` BIGINT UNSIGNED NOT NULL DEFAULT 0,

    PRIMARY KEY (`serialized_roles`, `two_factor_inactive`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfls_settings` (
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `value` LONGBLOB NULL,
    `autoload` ENUM('no', 'yes') NOT NULL DEFAULT 'yes',

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfnotifications` (
    `id` VARCHAR(32) NOT NULL DEFAULT '',
    `new` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `category` VARCHAR(255) NOT NULL,
    `priority` INTEGER NOT NULL DEFAULT 1000,
    `ctime` INTEGER UNSIGNED NOT NULL,
    `html` TEXT NOT NULL,
    `links` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfpendingissues` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `time` INTEGER UNSIGNED NOT NULL,
    `lastUpdated` INTEGER UNSIGNED NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `severity` TINYINT UNSIGNED NOT NULL,
    `ignoreP` CHAR(32) NOT NULL,
    `ignoreC` CHAR(32) NOT NULL,
    `shortMsg` VARCHAR(255) NOT NULL,
    `longMsg` TEXT NULL,
    `data` TEXT NULL,

    INDEX `ignoreC`(`ignoreC`),
    INDEX `ignoreP`(`ignoreP`),
    INDEX `lastUpdated`(`lastUpdated`),
    INDEX `status`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfreversecache` (
    `IP` BINARY(16) NOT NULL DEFAULT ('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),
    `host` VARCHAR(255) NOT NULL,
    `lastUpdate` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`IP`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfsecurityevents` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL DEFAULT '',
    `data` TEXT NOT NULL,
    `event_time` DOUBLE NOT NULL,
    `state` ENUM('new', 'sending', 'sent') NOT NULL DEFAULT 'new',
    `state_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfsnipcache` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `IP` VARCHAR(45) NOT NULL DEFAULT '',
    `expiration` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `body` VARCHAR(255) NOT NULL DEFAULT '',
    `count` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `type` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    INDEX `IP`(`IP`),
    INDEX `expiration`(`expiration`),
    INDEX `type`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfstatus` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `ctime` DOUBLE NOT NULL,
    `level` TINYINT UNSIGNED NOT NULL,
    `type` CHAR(5) NOT NULL,
    `msg` VARCHAR(1000) NOT NULL,

    INDEX `k1`(`ctime`),
    INDEX `k2`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wftrafficrates` (
    `eMin` INTEGER UNSIGNED NOT NULL,
    `IP` BINARY(16) NOT NULL DEFAULT ('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),
    `hitType` ENUM('hit') NOT NULL DEFAULT 'hit',
    `hits` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`eMin`, `IP`, `hitType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wfwaffailures` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `throwable` TEXT NOT NULL,
    `rule_id` INTEGER UNSIGNED NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wpforms_logs` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `message` LONGTEXT NOT NULL,
    `types` VARCHAR(255) NOT NULL,
    `create_at` DATETIME(0) NOT NULL,
    `form_id` BIGINT NULL,
    `entry_id` BIGINT NULL,
    `user_id` BIGINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wpforms_payment_meta` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `payment_id` BIGINT NOT NULL,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `meta_key`(`meta_key`(191)),
    INDEX `meta_value`(`meta_value`(191)),
    INDEX `payment_id`(`payment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wpforms_payments` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `form_id` BIGINT NOT NULL,
    `status` VARCHAR(10) NOT NULL DEFAULT '',
    `subtotal_amount` DECIMAL(26, 8) NOT NULL DEFAULT 0.00000000,
    `discount_amount` DECIMAL(26, 8) NOT NULL DEFAULT 0.00000000,
    `total_amount` DECIMAL(26, 8) NOT NULL DEFAULT 0.00000000,
    `currency` VARCHAR(3) NOT NULL DEFAULT '',
    `entry_id` BIGINT NOT NULL DEFAULT 0,
    `gateway` VARCHAR(20) NOT NULL DEFAULT '',
    `type` VARCHAR(12) NOT NULL DEFAULT '',
    `mode` VARCHAR(4) NOT NULL DEFAULT '',
    `transaction_id` VARCHAR(40) NOT NULL DEFAULT '',
    `customer_id` VARCHAR(40) NOT NULL DEFAULT '',
    `subscription_id` VARCHAR(40) NOT NULL DEFAULT '',
    `subscription_status` VARCHAR(10) NOT NULL DEFAULT '',
    `title` VARCHAR(255) NOT NULL DEFAULT '',
    `date_created_gmt` DATETIME(0) NOT NULL,
    `date_updated_gmt` DATETIME(0) NOT NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT true,

    INDEX `customer_id`(`customer_id`(32)),
    INDEX `form_id`(`form_id`),
    INDEX `status`(`status`(8)),
    INDEX `subscription_id`(`subscription_id`(32)),
    INDEX `subscription_status`(`subscription_status`(8)),
    INDEX `title`(`title`(64)),
    INDEX `total_amount`(`total_amount`),
    INDEX `transaction_id`(`transaction_id`(32)),
    INDEX `type`(`type`(8)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wpforms_tasks_meta` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(255) NOT NULL,
    `data` LONGTEXT NOT NULL,
    `date` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wpmailsmtp_debug_events` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `content` TEXT NULL,
    `initiator` TEXT NULL,
    `event_type` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wpmailsmtp_tasks_meta` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(255) NOT NULL,
    `data` LONGTEXT NOT NULL,
    `date` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wpjm_wpo_404_detector` (
    `ID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `url` TEXT NOT NULL,
    `request_timestamp` BIGINT UNSIGNED NOT NULL,
    `request_count` BIGINT UNSIGNED NOT NULL,
    `referrer` TEXT NOT NULL,

    INDEX `timestamp_count`(`request_timestamp`, `request_count`),
    INDEX `url_timestamp_referrer`(`url`(75), `request_timestamp`, `referrer`(75)),
    UNIQUE INDEX `url`(`url`(75), `request_timestamp`, `referrer`(75)),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wpjm_betterlinks_password` ADD CONSTRAINT `wpjm_betterlinks_password_ibfk_1` FOREIGN KEY (`link_id`) REFERENCES `wpjm_betterlinks`(`ID`) ON DELETE CASCADE ON UPDATE RESTRICT;

