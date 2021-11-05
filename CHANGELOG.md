# Change history for ui-circulation

## [7.0.0] (IN PROGRESS)

* Add RTL/Jest testing for `RenewalsSection` component in `LoanPolicy/components/ViewSections`. Refs UICIRC-695.
* Add RTL/Jest testing for `StaffSlipForm` component in `settings/StaffSlips`. Refs UICIRC-650.
* Add RTL/Jest testing for `RequestManagementSection` component in `LoanPolicy/components/EditSections`. Refs UICIRC-615.
* Add RTL/Jest testing for `SchedulesList` component in `FixedDueDateSchedule/components/EditSections/components`. Refs UICIRC-603.
* Add RTL/Jest testing for `NoticeCard` component in `settings/NoticePolicy/components/DetailSections/components/NoticeCard`. Refs UICIRC-635.
* Add RTL/Jest testing for `TokensList` component in `PatronNotices/TokensList/TokensList.js`. Refs UICIRC-645.
* Add Title Level Request permission. Refs UICIRC-699.
* Add RTL/Jest testing for `LostItemFeeSection` component in `LostItemFeePolicy/components/EditSections`. Refs UICIRC-623.
* Create new setting for title level requests. Refs UICIRC-698.
* UI tests replacement with RTL/Jest for component `NoticesList` (EditSections). Refs UICIRC-641.
* Locations display as `{code} {name}` and thus should be sorted by code, name. Refs UICIRC-703.
* Add RTL/Jest testing for `PatronNoticeDetail` component in `settings/PatronNotices`. Refs UICIRC-643.
* Title level request setting cannot be disabled when there is an active title level request in the system. Refs UICIRC-708.
* Add possible for resizing panel in circulation rules editor. Refs UICIRC-709.

## [6.0.0] (https://github.com/folio-org/ui-circulation/tree/v6.0.0) (2021-09-30)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v5.1.1...v6.0.0)

* Fix a typo in the word Year(s) in the Period interval. Refs UICIRC-662.
* Update `codemirror` and `react-codemirror2`. Refs UICIRC-576.
* Update `folio/stripes-template-editor` to `3.0.0`. Refs UICIRC-575
* Fix bug causing incorrect validation in lost item fee policies. Fixes UICIRC-667, UICIRC-668.
* Add RTL/Jest testing for `ScedulesList` component. Refs UICIRC-601.
* Add RTL/Jest testing for `OverdueAboutSection` component in `FinePolicy/components/EditSections`. Refs UICIRC-595.
* Add RTL/Jest testing for `normalize` function in `FinePolicy/utils`. Refs UICIRC-599.
* Add RTL/Jest testing for `normalize` function in `LostItemFeePolicy/utils`. Refs UICIRC-628.
* Add RTL/Jest testing for `FeeFineNoticesSection` component. Refs UICIRC-631.
* Add RTL/Jest testing for `normalize` function in `LoanHistory/utils`. Refs UICIRC-607.
* Add RTL/Jest testing for `normalize` function in `LoanPolicy/utils`. Refs UICIRC-620.
* Add RTL/Jest testing for `OverdueAboutSection` component in `FinePolicy/components/ViewSections`. Refs UICIRC-598.
* Add RTL/Jest testing for `LostItemFeeAboutSection` component in `LostItemFeePolicy/components/ViewSections`. Refs UICIRC-625.
* Add RTL/Jest testing for `AboutSection` component in `LoanPolicy/components/ViewSections`. Refs UICIRC-616.
* Add RTL/Jest testing for all functions in `NoticePolicy/utils`. Refs UICIRC-642.
* Support `feesfines` interface version `17.0`. Refs UICIRC-671.
* Investigate possibility to run tests successfully. Refs UICIRC-681.
* Add RTL/Jest testing for `AboutSection` component in `LoanPolicy/components/EditSections`. Refs UICIRC-612.
* Add RTL/Jest testing for `LostItemFeeAboutSection` component in `LostItemFeePolicy/components/EditSections`. Refs UICIRC-622.
* Add RTL/Jest testing for `RequestNoticesSection` component in `NoticePolicy/components/DetailSections`. Refs UICIRC-634.
* Add RTL/Jest testing for functions in `settings/utils/rules-string-convertors.js`. Refs UICIRC-682.
* Add RTL/Jest testing for `FinesSection` component in `FinePolicy/components/ViewSections`. Refs UICIRC-597.
* Add RTL/Jest testing for `GeneralSection` component in `NoticePolicy/components/DetailSections`. Refs UICIRC-632.
* Add RTL/Jest testing for `AnonymizingTypeSelect` component in `settings/components/AnonymizingTypeSelect`. Refs UICIRC-653.
* Add RTL/Jest testing for `Metadata` component in `settings/components`. Refs UICIRC-652.
* Add RTL/Jest testing for `LoanNoticesSection` component in `NoticePolicy/components/DetailSections`. Refs UICIRC-633.
* Add RTL/Jest testing for `LoanNoticesSection` component in `NoticePolicy/components/EditSections`. Refs UICIRC-639.
* Add RTL/Jest testing for `convertNamesToIdsInLine` function in `settings/utils/rules-string-convertors.js`. Refs UICIRC-686.
* Add RTL/Jest testing for functions in `settings/utils`. Refs UICIRC-656.
* Add RTL/Jest testing for `LoansSection` component in `LoanPolicy/components/ViewSections`. Refs UICIRC-617.
* Add RTL/Jest testing for `RequestManagementSection` component in `LoanPolicy/components/ViewSections`. Refs UICIRC-618.
* Add RTL/Jest testing for `RadioGroup` component in `LostItemFeePolicy/components/EditSections`. Refs UICIRC-624.
* Increment `stripes` to `v7`, `react` to `v17`. Refs UICIRC-676.
* Add RTL/Jest testing for `RequestNoticesSection` component in `NoticePolicy/components/EditSections`. Refs UICIRC-640.
* Add RTL/Jest testing for `OverdueFinesSection` and `OverdueFinesSectionColumn` components in `FinePolicy/components/EditSections/RangeSection`. Refs UICIRC-596.
* Add RTL/Jest testing for `Period` component in `settings/components/Period`. Refs UICIRC-655.
* Improve circ rules location list display, at least a tiny bit. Refs UICIRC-430.
* Add RTL/Jest testing for `FinesSection` component in `FinePolicy/components/EditSections`. Refs UICIRC-594.
* Add RTL/Jest testing for `RenewalsSection` component in `LoanPolicy/components/EditSections`. Refs UICIRC-614.
* Add RTL/Jest testing for `GeneralSection` component in `NoticePolicy/components/EditSections`. Refs UICIRC-638.
* Add RTL/Jest testing for `GeneralSection` component in `RequestPolicy/components/EditSections`. Refs UICIRC-648.
* Add RTL/Jest testing for `LostItemFeeSection` component in `LostItemFeePolicy/components/ViewSections/LostItemFeeSection`. Refs UICIRC-627.
* Add RTL/Jest testing for `TokensList` component in `settings/StaffSlips/TokensList`. Refs UICIRC-651.
* Add RTL/Jest testing for `ScheduleCard` component in `FixedDueDateSchedule/components/EditSections/components`. Refs UICIRC-602.
* Add RTL/Jest testing for `ExceptionsList` component in `settings/LoanHistory`. Refs UICIRC-605.

## [5.1.1] (https://github.com/folio-org/ui-circulation/tree/v5.1.1) (2021-08-06)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v5.1.0...v5.1.1)

* Fix bug causing incorrect validation in lost item fee policies. Fixes UICIRC-667, UICIRC-668.

## [5.1.0] (https://github.com/folio-org/ui-circulation/tree/v5.1.0) (2021-06-14)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v5.0.1...v5.1.0)

* Update the .gitignore file. Refs UICIRC-550.
* Add pull request template. Refs UICIRC-551.
* Added ability to use user Custom Fields as patron IDs during checkout. Refs UICIRC-549
* Add settings up for Jest/RTL tests. Refs UICIRC-557.
* Also support `circulation` `10.0`. Refs UICIRC-563.
* Support configurable audio themes. Refs UICIRC-556.
* Fix limit in policy settings. Fixes UICIRC-568.
* Larger query limits for circulation-rules related queries. Fixes UICIRC-568.
* Also support `inventory` `11.0`. Refs UICIRC-578.
* Checked out an item with due date/time in the past. Refs UICIRC-565.
* Fix failed build on ui-circulation. Fixes UICIRC-657.

## 5.0.1 (https://github.com/folio-org/ui-circulation/tree/v5.0.1) (2021-04-21)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v5.0.0...v5.0.1)
* Shown notice template name on notice policy for fees/fines notices (view mode). Refs UICIRC-566.

## 5.0.0 (https://github.com/folio-org/ui-circulation/tree/v5.0.0) (2021-03-09)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v4.0.2...v5.0.0)

* Keyword all - allowed by backend. Refs UICIRC-506.
* Update version of `feesfines` okapi interface to `v16.0`.
* Modifier ! (not) - preceding value entered for a criteria, means any value except. Refs UICIRC-507.
* Add `Allow recalls to extend overdue loans` setting. Refs UICIRC-525.
* Duplicate patron notice template names allowed - case is not considered in validation. Refs UICIRC-528.
* Circ rules editor does not generate space as expected when adding criteria to multiple criteria rule. Refs UICIRC-488.
* Add aged to lost triggers to notice policy. Refs UICIRC-515.
* Add a staff slips token for patron comments. Refs UICIRC-523.
* Add fee/fine action tokens to template with fee/fine charge or adjustment. Refs UICIRC-537.
* Add separate aged to lost settings for recalled items in lost item fee policies. Refs UICIRC-529.
* First field should be in focus for all forms in circulation settings. Refs UICIRC-541.
* Consistent UI for circulation settings. Refs UICIRC-542.
* Update to stripes v6. Refs UICIRC-543.
* Move moment from a regular to a peer and dev dependencies. Refs UICIRC-513.
* Order of settings when viewing Lost Item Fee Policy not same as new/edit order. Refs UICIRC-531.
* Update to `stripes-cli v2.0.0`. Refs UICIRC-547.

## 4.0.2 (https://github.com/folio-org/ui-circulation/tree/v4.0.2) (2020-11-24)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v4.0.1...v4.0.2)

* Incorrect validation blocking user from saving overdue fine policy. Refs UICIRC-533.

## 4.0.1 (https://github.com/folio-org/ui-circulation/tree/v4.0.1) (2020-11-05)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v4.0.0...v4.0.1)

* Errors with new validation for 'Lost item fee policy' page. Refs UICIRC-512.
* Unable to enter decimal places on Overdue Fines Policy on Honeysuckle and Snapshot Dev. Refs UICIRC-514.
* Validation and other issues with patron notice template names. Refs UICIRC-518.

## 4.0.0 (https://github.com/folio-org/ui-circulation/tree/v4.0.0) (2020-10-13)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v3.0.0...v4.0.0)

* Accessibility work with color contrast. Refs UICIRC-463.
* Able to set Overdue Fine Max to value less than Overdue Fine. Refs UICIRC-475.
* Fee/Fine Overdue Fine Policies: Additional validation not in original user story. Refs UICIRC-476.
* Adjust UI for fee/fine notice token options on templates. Refs UICIRC-479.
* Lost item fee policy: Additional validation not in original user story. Refs UICIRC-478.
* Lost item fee policy: Handle processing fees same as fee amount. Refs UICIRC-482.
* Fix of accessibility errors. Refs UICIRC-464.
* Increment `@folio/stripes` to `v5`, `react-router` to `v5.2`.
* Refactor `bigtest/mirage` to `miragejs`.
* Display loans section when `loanable` is set to `No`. Fixes UICIRC-392.
* Localized permission names. Refs UICIRC-504.
* Fix of Lost item fee displays as `Set cost of NaN`. Refs UICIRC-500.
* Incorrect error validation for 'Patron billed after aged to lost' on Lost Item Fee Policy. Refs UICIRC-499.
* In circulation rule editor last line cannot be seen. Refs UICIRC-456.
* Migrate Request policy form to react-final-form. Refs UICIRC-438.
* Migrate Staff slips form to react-final-form. Refs UICIRC-446.
* Migrate Patron notice template form to react-final-form. Refs UICIRC-439.
* Change "...close the loan after" to "...scrub the loan after" in Lost Item Fee Policy. Refs UICIRC-485.
* Migrate fixed due date schedule form to react-final-form. Refs UICIRC-445.
* Migrate patron notice policy form to react-final-form. Refs UICIRC-440.
* Migrate Loan policy form to react-final-form. Refs UICIRC-443.
* Move circulation rules form to react-final-from. UICIRC-448.
* Migrate other settings form to react-final-from. UICIRC-447.
* Loan tokens should be unavailable (and greyed out) for manual fee/fine charge category. Refs UICIRC-494.
* Move Overdue fine policy form to react-final-form. Refs UICIRC-442.
* Move Lost item fee policy form to react-final-form. Refs UICIRC-441.
* Move Loan history form to react-final-form. Refs UICIRC-444.
* Modify default values and validation for 'Lost item fee policy. Refs UICIRC-502.

## 3.0.0 (https://github.com/folio-org/ui-circulation/tree/v3.0.0) (2020-06-10)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v2.0.0...v3.0.0)

* New/Edit Patron notice policy: do not display inactive loan and request notice templates in the dropdown. Refs UICIRC-418.
* Overdue fee/fine notices. Refs UICIRC-451.
* Update `moment` to `^2.25.3` to avoid `2.25.x` bugs. Refs STRIPES-678.
* Purge `intlShape` in prep for `react-intl` `v4` migration. Refs STRIPES-672.
* Upgrade to `stripes` `4.0`, `react-intl` `4.5`. Refs STRIPES-672.
* Extend fee/fine tokens available for notices. Refs UICIRC-458.
* Grey out unavailable tokens on patron notice template token modal. Refs UICIRC-459.
* Use `UNSAFE_` prefix for deprecated React methods. We know, we know. Refs UICIRC-431.
* Fixed Due Date Schedule - Dates on Edit/Create and View out of sync. Refs UICIRC-460.
* Incorrect footer displaying for circulation settings. Refs UICIRC-469.

## 2.0.0 (https://github.com/folio-org/ui-circulation/tree/v2.0.0) (2020-03-13)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.12.0...v2.0.0)

* Provide two options for barcode tokens on staff slips. Refs UICIRC-393.
* Add hold shelf exp and request exp date/time tokens to patron notice templates. UICIRC-396.
* Provide two options for barcode tokens on patron notices. Refs UICIRC-400.
* Settings > Circulation > Other Settings | Move Save button to the footer. Refs UICIRC-374.
* Settings > Circulation > Loan history | Move Save button to the footer. Refs UICIRC-375.
* Settings > Circulation > Lost item fee policy | increase fee fields box width. Refs UICIRC-402.
* Update circulation okapiInterface to version `9.0`. Part of UICIRC-411.
* Add translations for aria-label values in EditorToolbar(WYSIWYG). Refs UICIRC-421.
* Migrate to `stripes` `v3.0.0` and move `react-intl` to peerDependencies.
* Remove extraneous accordion styling from lost-item fee-fine form.
* Loan policy: Data silently fails to save when interval is missing. Refs UICIRC-327.
* Security update eslint to >= 6.2.1 or eslint-util >= 1.4.1. Refs UICIRC-414.
* Should use Integer not String for checkout timeout value. Refs UICIRC-435.

## [1.12.0](https://github.com/folio-org/ui-circulation/tree/v1.12.0) (2019-12-06)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.11.0...v1.12.0)

* Add location items filtering into the circulation rules editor menu. Refs UICIRC-314.
* Validate for closed loans and fines/fees in loan history settings. Refs UITEN-42.
* Fix incorrect save button behavior in Circulation Rules Editor. Refs UICIRC-296.
* Add handling of the special item Any for intermediate menus. Refs UICIRC-334.
* Add full hierarchial path to location codes that are used in the input field of the circulation rules editor. Refs UICIRC-333.
* Fix loan policy holds section. Refs UICIRC-349.
* Clean up Loan history model. Refs UITEN-57.
* Clean up unused dependencies.
* Fix data replacement issues in the circulation rules editor. Refs UICIRC-305.
* Add BigTest and CRUD Fee/Fine Lost Item Fee Policies. Refs UIU-1156.
* Add filter value match highlighting to the location menu of the circulation rules editor. Refs UICIRC-318.
* Fix validation error message display in the circulation rules editor. Refs UICIRC-377.
* Validate the creation of the settings in the Anonymize closed loans section. Refs UITEN-58.
* Create/Edit loan policy | Move Save/Cancel buttons to the footer Refs UICIRC-372.
* Lost item fee policies |  Create/Edit Request policies | Move Save/Cancel buttons to the footer UICIRC-370
* Add the overdue fine policies menu to the circulation rules editor. Refs UICIRC-353.
* Add minutes and hours support to the loan history form. Refs UICIRC-388.
* Update structure of the circulation rules editor tests. Refs UICIRC-382.
* Add the lost item fee policies menu to the circulation rules editor. Refs UICIRC-341.
* Add "lastCheckedInDateTime" and remove "lastScannedServicePoint" tokens for staff slips. Refs UICIRC-291.
* View/edit request delivery slip. Refs UICIRC-316.
* Tokens for request delivery slip. Refs UICIRC-319.
* Request delivery slip preview. Refs UICIRC-320.
* Recall notice trigger update. Refs UICIRC-279.
* Update the circulation API to support changes to the rule editor. Refs UICIRC-336.
* Allow user to resize text area for notice and staff slip templates. Refs UICIRC-295.
* Fix the impact of the API change as per MODINVSTOR-315 for ui-circulation. Refs UICIRC-348.
* Staff slip preview for token item.callNumberSuffix isn't working. Refs UICIRC-355.
* Create/Edit Patron notice policies | Move Save/Cancel buttons to the footer. Refs UICIRC-367.
* Create/Edit Patron notice templates| Move Save/Cancel buttons to the footer. Refs UICIRC-368.
* Create/Edit Request policies | Move Save/Cancel buttons to the footer. Refs UICIRC-369.
* Lost item fee policies |  Create/Edit Request policies | Move Save/Cancel buttons to the footer. Refs UICIRC-370.
* Create/Edit Overdue fine policy| Move Save/Cancel buttons to the footer. Refs UICIRC-371.
* Create/Edit loan policy | Move Save/Cancel buttons to the footer. Refs UICIRC-372.
* Loan policy: Renewals section not displaying in view when Renewable = N. Refs UICIRC-350.
* Add date/time tokens to patron notice templates. Refs UICIRC-384.
* Add Item Limit to Loan Policy. Refs UICIRC-390.
* Overdue fine policy: Validation field incorrect for overdue recall fine. Refs UIU-1232.
* Lost item fee policy: Words "late" and "Set cost" missing on entry of new policy. Refs UIU-1315.
* Remove periods values from default config in `<LoanHistory>`, handle CSS issue when the loan history form is being submitted and add tests for anonymizing intervals. Refs UICIRC-405.

## [1.11.0](https://github.com/folio-org/ui-circulation/tree/v1.11.0) (2019-09-13)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.10.0...v1.11.0)

* CRUD for overdue fine policies. Refs UICIRC-1146
* Rearrange settings page. Refs UICIRC-1146

## [1.10.0](https://github.com/folio-org/ui-circulation/tree/v1.10.0) (2019-09-11)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.9.0...v1.10.0)

* Retrieve 1000 elements on Settings pages instead of 10. Refs UICIRC-302.
* Add missing tests for request policy. Part of UICIRC-293.
* Integrate campus and library menus to circulation rules editor. Refs UICIRC-283.
* Update `react-to-print` to accept React via `peerDependencies`. UIIN-678.
* Normalize a non alpha-numeric characters from Location Codes in circulation rules editor. Refs UICIRC-260.
* Add backward moving feature to organization hierarchy menus in circulation rules editor. Refs UICIRC-285.
* Integrate location menu into circulation rules editor. Refs UICIRC-259.
* Add CRUD and BigTest Fee/Fine Overdue Fine Policies. Refs UIU-1146.

## [1.9.0](https://github.com/folio-org/ui-circulation/tree/v1.9.0) (2019-07-25)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.8.0...v1.9.0)

* Remove unnecessary permissions. Refs UIORG-150.
* Fix display position of autocompletion popup in circulation rules editor. UICIRC-209
* Create settings in UI for users to anonymize closed loans with fees/fines. UIORG-175.
* Add location data fetching to circulation rules editor. UICIRC-272
* Create settings in UI for users to anonymize closed loans with fees/fines and exception for payment method. UIORG-176.
* Refine list of tokens available for staff slip templates. UICIRC-189.
* Expand location-specific token list for patron notice templates. UICIRC-250.
* Integrate institution menu to circulation rules editor. UICIRC-282.
* Other bug fixes. UICIRC-96, UICIRC-269, UICIRC-271.

## [1.8.0](https://github.com/folio-org/ui-circulation/tree/v1.8.0) (2019-06-10)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.7.0...v1.8.0)

* Anonymize closed loans. UIORG-169.
* Clearer select options for recall triggering events. UICIRC-252.
* Fix localization in fixed due date schedule form. UICIRC-254.
* Prevent deletion of patron notice template in use. UICIRC-185
* Modal consistency for staff slips and patron notices. UICIRC-262
* Expand user-specific token list for patron notice templates. UICIRC-247
* Move tokens to modal to accommodate growing list of tokens. UICIRC-253.
* Bug fix. UICIRC-255.
* Test coverage. UICIRC-235.

## [1.7.0](https://github.com/folio-org/ui-circulation/tree/v1.7.0) (2019-05-10)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.6.0...v1.7.0)

* Eject from deprecated Settings component and demonstrate new routing guidelines. UICIRC-201.
* Provide IDs for loan-policy's actionmenu buttons. Refs UICIRC-237.
* Sort settings entries. Fixes UICIRC-196.
* Disallow deletion of request policies used in circ rules. Part of UICIRC-228.
* Disallow deletion of patron notice policy in use. UICIRC-184.
* Update to pane header to include dropdown menu for notice templates. UICIRC-143.
* Update to pane header to include dropdown menu for loan policies. UICIRC-226.
* Update to pane header to include "Cancel" option in dropdown menu for notice policy. UICIRC-229.
* Bug fixes: UICIRC-159, UICIRC-160, UICIRC-171, UICIRC-172, UICIRC-175, UICIRC-208, UICIRC-210, UICIRC-216, UICIRC-223, UICIRC-231, UICIRC-232.

## [1.6.0](https://github.com/folio-org/ui-circulation/tree/v1.6.0) (2019-03-17)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.5.0...v1.6.0)

* Support `circulation` interface 7.0. UICIRC-192.
* Support `loan-policy-storage` interface 2.0. CIRCSTORE-96.
* Add new policy types to policy menu in rules editor. Fixes UICIRC-164.
* Add new policy types to 'fallback policy' section. Fixes UICIRC-165.
* Remove `Pages` section from loan policy editor. UICIRC-188.
* Add loan policy fields, request management. UICIRC-139.
* Add request management configurations to loan policy preview. UICIRC-186.
* Add request policy CRU v1. Fixes UIREQ-181.
* Permission set for request policy CRUD. UICIRC-163.
* Add notice policy view. UICIRC-108.
* Add request notices to notice policy. UICRIC-157.
* Refine notice policy forms. UICIRC-203, UICIRC-206.
* Constrain patron notices to one per notice policy. UICIRC-106.
* Add permission set for staff slips. Fixes UICIRC-194.
* Do not show unsaved changes popup when policy form is not dirty. Fixes UICIRC-104.
* Add permission set for other settings. Fixes UICIRC-193.
* Add test coverage. UICIRC-190, UICIRC-191.
* Convert source to standard reposity structure. UICIRC-146.
* Change output format for patron notices to 'text/html'.
* Bug fixes. UICIRC-207, UICIRC-213, UICIRC-134, UICIRC-170, UICIRC-205, UICIRC-211

## [1.5.0](https://github.com/folio-org/ui-circulation/tree/v1.5.0) (2019-01-25)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.4.0...v1.5.0)

* Upgrade to stripes v2.0.0.

## [1.4.0](https://github.com/folio-org/ui-circulation/tree/v1.4.0) (2018-12-13)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.3.0...v1.4.0)

* Provide `sortby` prop to `<ControlledVocab>`. Refs STSMACOM-139.
* Provide `type` prop to `<Field>`. Refs PR #697.
* Support circulation v5.0, requiring service-point information on loans. Refs UICIRC-100.
* Use documented react-intl patterns instead of stripes.intl, UICIRC-91.
* Apply internationalization to all hardcodded strings, UICIRC-97.
* Fix invalid dates. Fixes UICIRC-102.
* Implement settings for patron notices. Completes UICIRC-70, -73, -74, -85, -86, -87.
* Add Patron Barcode token to CRUD staff slip templates. UICIRC-95.
* Change From/To Location Tokens in Transit Slip to From/To Service Point. UICIRC-119.
* Loan Policy Editor - Context-based behavior for Closed Library Due Date Management. UICIRC-107.
* Loan Policy: Add "Opening Time Offset". UICIRC-64.

## [1.3.0](https://github.com/folio-org/ui-circulation/tree/v1.3.0) (2018-10-04)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.2.0...v1.3.0)

* Update `stripes-form` dependency to v1.0.0
* Use `stripes` 1.0 framework

## [1.2.0](https://github.com/folio-org/ui-circulation/tree/v1.2.0) (2017-09-12)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.1.1...v1.2.0)

* Setup Loan Rules crud v1. For UICIRC-5.
* Add Scan ID setting. UICIRC-12.
* Create/Edit Loan Policy Form in Full-Page Overlay UICIRC-15.
* Add Real Loan Rule Params. Fixes UICIRC-17.
* Support permission for loan-policy maintenance. Fixes UICIRC-21.
* Replace `data` with `resources` Fixes UICIRC-25.
* Focus on name field for a newly-created loan policy. Fixes UICIRC-19.
* Get `<EntrySelector>` from stripes-components v1.9.0 (and delete the local copy). Fixes UICIRC-26.
* Use `<EntryManager>` to manage fixed-due-date-schedules. Fixes UICIRC-20, UICIRC-22.
* Use `<EntryManager>` to manage loan policies. Fixes UICIRC-32.
* Include fixed due date schedule list in loan-policy form. Fixes UICIRC-27.
* Show empty schedules in new Fixed Due Date Schedule form. Fixes UICIRC-30.
* Add empty schedule rows to top of list. Fixes UICIRC-29.
* Setup Callout component for loan policy settings. UICIRC-31.
* Fix loan policy form. Fixes UICIRC-34.
* Store and dereference UUID in loan rules. Fixes UICIRC-35.
* Use more-current stripes-components. Refs STRIPES-495.
* Update dependencies. Refs STRIPES-501.
* Provide ID for Scan-ID form for easy access by tests. Refs UITEST-20. Available from v1.1.2.
* Add setting for audio alerts in circulation. Fixes UICIRC-47.
* Ignore yarn-error.log file. Refs STRIPES-517.
* Match periodId and profileId values with the values on the server. Fixes UICIRC-53.
* Fix creating loan policy with fixed due date schedule. Fixes UICIRC-56.
* Remove "Indefinite" loan profile. Fixes UICIRC-55.
* Refined fixed due date schedule settings. UICIRC-40
* Add Record Metadata to Fixed Due Date Schedules. UICIRC-41.
* Favor metadata over metaData. One case to rule them all. Refs UICIRC-57.
* Show chosen Fixed due date schedule on loan policy details. Fixes UICIRC-58.
* Add checkout session timeout settings in circulation->otherSettings. Fixes UICIRC-48
* Hide "Renew from" option for loan policies with a fixed loan profile. Fixes UICIRC-60.
* Relocate language files. UICIRC-62.
* Replace int values with string representations for renewFromOptions. Fixes UICIRC-66.
* Loan policy intervals should display on read only view. Fixes UICIRC-65.
* Add last updated record metadata to loan policy form. Fixes UICIRC-63.
* Add view/edit hold staff strip. Fixes UICIRC-52.
* View/Edit Transit Slip. UICIRC-76.
* Update to stripes-components 3 for Pane/Paneset compatibility.
* Checkout scanning checkboxes sometimes would not display. They should ALWAYS display. Refs UICIRC-75.
* Refine View Mode for Hold Slip Template. UICIRC-79.
* Fix holding slip template to use a proper mustache. UICIRC-83.
* Depend on v3.0 or v4.0 of `circulation` interface. UICIRC-84.
* Bug fixes without separate change log entry: UICIRC-14, UICIRC-28, UICIRC-33, UICIRC-37, UICIRC-42, UICIRC-43, UICIRC-45, UICIRC-51, UICIRC-69, UICIRC-78, UICIRC-82


## [1.1.1](https://github.com/folio-org/ui-circulation/tree/v1.1.1) (2017-09-02)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.1.0...v1.1.1)

* Add new permissions, `settings.loan-rules.all` and `settings.circulation.enabled`. Towards UICIRC-10.

## [1.1.0](https://github.com/folio-org/ui-circulation/tree/v1.1.0) (2017-08-30)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.0.0...v1.1.0)

* Add loan rules scaffolding. UICIRC-6.
* Make settings.loan-policies.all permission visible. For UIS-50.
* Align test stub with v4.0.0 of ui-testing. FOLIO-800.

## [1.0.0](https://github.com/folio-org/ui-circulation/tree/v1.0.0) (2017-08-25)

* Initial circulation module. UICIRC-2
* Contains loan policy settings carried over from ui-checkout. UICIRC-3.
* Contains a single test to confirm if loan policy settings open.
