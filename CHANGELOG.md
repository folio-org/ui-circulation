# Change history for ui-circulation

## [9.0.5](https://github.com/folio-org/ui-circulation/tree/v9.0.5) (2024-03-21)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v9.0.4...v9.0.5)

* Only certain HTML tags should be rendered when displaying staff slips. Refs UICIRC-1070, UICIRC-1060.

## [9.0.4](https://github.com/folio-org/ui-circulation/tree/v9.0.4) (2024-02-22)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v9.0.3...v9.0.4)

* Fix issue with 'Enter' key in circulation rules editor that adds indent to previous line. Refs UICIRC-1042.

## [9.0.3](https://github.com/folio-org/ui-circulation/tree/v9.0.3) (2023-11-09)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v9.0.2...v9.0.3)

* Fix problem with accordions on Circulation settings page. Refs UICIRC-1009.

## [9.0.2](https://github.com/folio-org/ui-circulation/tree/v9.0.2) (2023-11-08)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v9.0.1...v9.0.2)

* Fix permission error for Settings (Circ): Can create, edit and remove overdue fine policies. Refs UICIRC-1013.
* Fix wrong position of "Cancel" and "Save & close" button. Refs UICIRC-1014.
* Extend "Settings (Circ): Can create, edit and remove request policies" permission to be able to see service points. Refs UICIRC-1016.

## [9.0.1](https://github.com/folio-org/ui-circulation/tree/v9.0.1) (2023-11-02)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v9.0.0...v9.0.1)

* Remove `None` option from notice methods. Fixes UICIRC-995.

## [9.0.0](https://github.com/folio-org/ui-circulation/tree/v9.0.0) (2023-10-12)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v8.0.1...v9.0.0)

* Add metadata information to view of Staff Slips (Settings > Circulation > Staff Slips). Refs UICIRC-855.
* Implement General information accordion. Refs UICIRC-909
* Implement Template content accordion. Refs UICIRC-910
* Add "item.loanType" as notice token in Settings. Refs UICIRC-852
* Use camel case notation for all data-testid. Refs UICIRC-912.
* Replace `labelSingular` with `translations` in props to `ControlledVocab`. Refs UICIRC-849.
* Add metadata info to view of Patron Notice Templates (Settings > Circulation > Patron Notice Templates). Refs UICIRC-856.
* Add metadata info and accordion organization to Patron Notice Templates edit screen. REFs UICIRC-906.
* Create a new permission that grants View-only access to Settings > Circulation > Circulation rules. Refs UICIRC-843.
* Support `feesfines` interface version `18.0`. Refs UICIRC-920.
* Add "Discovery display name" as notice token in Settings. Refs UICIRC-792.
* Add "Departments" as staff slip token in Settings. Refs UICIRC-844.
* FE | Make the token "feeCharge.additionalInfo" selectable for automated f/f adjustment notice templates. Refs UICIRC-862.
* Changed translation for token section. Refs UICIRC-911.
* Fields use full use screen width (part 1). Refs UICIRC-917.
* Update patron notice policy: Multiples options for "Lost item fee(s) charged". Refs UICIRC-895.
* Make the token feeCharge.additionalInfo selectable for automated f/f charge notice templates. Refs UICIRC-838.
* Add new multiples token: Multiple fee/fine charges for the Fee/fine charge section. Refs UICIRC-904.
* Remove unnecessary `recordsRequired` manifest param. Refs UIREQ-858.
* Add "Current date/time" as staff slip token in Settings. Refs UICIRC-793.
* Add item.effectiveLocationPrimaryServicePointName as staff slip token in Settings. Ref CIRC-1785
* Leverage cookie-based authentication in all API requests. Refs UICIRC-881.
* Also support `circulation` `14.0`. Refs UICIRC-935.
* Add request.requestDate as staff slip token in Settings. Ref CIRC-1784
* Add new template token `loan.additionalInfo` for loan notifications. Fixes UICIRC-939.
* Add new template tokens for user addresses under patron notice templates Fixes UICIRC-938.
* Add "Reminder fees" sub-section to Overdue Fine Policy. Refs UICIRC-931.
* UI tests replacement with RTL/Jest for rules-show-hint (part 2). Refs UICIRC-845.
* Update record metadata object when saving circulation rules. Refs UICIRC-858.
* Add extra fields to reminder fees policy. Refs UICIRC-955.
* Add New setting to enable hold requests to fail. Refs UICIRC-949.
* Fix Circ rules editor crashes when certain special characters entered in filter box. Refs UICIRC-921.
* Prevent editing of shared settings from outside "Consortium manager". Refs UICIRC-962.
* Allowing Selection of Some Pickup Service Points as Optional When Creating a New Request Policy. Refs UICIRC-963.
* Upgrade babel config. Refs UICIRC-968.
* Add possible for run axe tests. Refs UICIRC-965.
* Update Node.js to v18 in GitHub Actions. Refs UICIRC-969.
* *BREAKING* Upgrade React to v18. Refs UICIRC-966.
* Make visible selected service points after page reloading. Refs UICIRC-972.
* Get rid of automatic alert after request failure. UICIRC-967.
* Change enums for notice method. UICIRC-973.
* *BREAKING* bump `react-intl` to `v6.4.4`. Refs UICIRC-977.
* Add informational message for Holds to New Request Policy page. Refs UICIRC-981.
* Restore previously deleted Jest/RTL tests that were failing. Refs UICIRC-971.
* Add "hour" to the time frequency for reminder fees. Fixes UICIRC-983.
* Freeze the first five selection menus for reminder fees. Refs UICIRC-982.
* Remove outdated imports. Refs UICIRC-987.

## [8.0.1](https://github.com/folio-org/ui-circulation/tree/v8.0.1) (2023-03-07)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v8.0.0...v8.0.1)

* Update `folio/stripes-template-editor` to `3.2.0`. Refs UICIRC-916.

## [8.0.0](https://github.com/folio-org/ui-circulation/tree/v8.0.0) (2023-02-22)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v7.2.1...v8.0.0)

* Make consistent view of delete functionality of "Fixed due date schedules". Refs UICIRC-874.
* Increase code coverage of "PatronNotices.js" file. Refs UICIRC-866.
* Add "Settings (Circ): Can edit staff slips" permission. Refs UICIRC-876.
* UI tests replacement with RTL/Jest for `notice-policy` folder in `Validation`. Refs UICIRC-811.
* Add "requester.preferredFirstName" as staff slip token in Settings. Refs UICIRC-819.
* Remove bigtest tests and associated dependencies. Refs UICIRC-591.
* Bump major versions of several @folio/stripes-* packages. Refs UICIRC-891.
* Add "user.preferredFirstName" as notice token in Settings. Refs UICIRC-462.
* Add "Patron Group" as staff slip token in Settings. Refs UICIRC-791.
* UI tests replacement with RTL/Jest for `normalize.js`. Refs UICIRC-864.
* UI tests replacement with RTL/Jest for `lost-item-fee-policy` folder in `Validation`. Refs UICIRC-810.
* Removed unused file. Refs UICIRC-865.
* UI tests replacement with RTL/Jest for `loan-policy` folder in `Validation`. Refs UICIRC-809.
* UI tests replacement with RTL/Jest for `CheckoutSettingsForm`. Refs UICIRC-867.
* An error for spacebar before symbols in "Subject" field when create Patron notice template. Fixes UICIRC-898.
* UI tests replacement with RTL/Jest for component `RulesEditor`. Refs UICIRC-827.
* UI tests replacement with RTL/Jest for `Rules-hint`. Refs UICIRC-831.

## [7.2.1](https://github.com/folio-org/ui-circulation/tree/v7.2.1) (2022-11-29)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v7.2.0...v7.2.1)
* Fix problem with saving Notice template. UICIRC-870.
* Fix problem with saving Due date schedules. UICIRC-872.
* Fix problem with saving Request policy. UICIRC-873.

## [7.2.0](https://github.com/folio-org/ui-circulation/tree/v7.2.0) (2022-10-20)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v7.1.0...v7.2.0)

* UI tests replacement with RTL/Jest for `src/settings/Validation/engine/handlers.js`. UICIRC-814.
* UI tests replacement with RTL/Jest for `src/settings/lib/RuleEditor/utils.js`. UICIRC-828.
* Add RTL/Jest testing for `initFoldRules` in `src/settings/lib/RuleEditor`. Refs UICIRC-829.
* UI tests replacement with RTL/Jest for `FormValidator.js` file in `Validation`. Refs UICIRC-813.
* UI tests replacement with RTL/Jest for hooks in `src/settings/lib/RuleEditor/initRulesCMM.js`. UICIRC-830.
* Correctly import components from @folio/stripes/* packages. UICIRC-839.
* Change setting "Loan history" setting to "Loan anonymization". UICIRC-685
* Split `rule-show-hint.js` into a few files and cover new files by RTL/Jest test. Refs UICIRC-823.
* Cover functions in `rule-show-hint.js` by RTL/jest tests. UICIRC-832.
* Do not allow only space characters in the notice template body. UICIRC-783
* Create a new permission "Settings (Circ): Can edit loan history". UICIRC-766.
* With the permission "Settings (Circ): Can view loan history", hide the Save button on the Loan history pane. UICIRC-767
* UI tests replacement with RTL/Jest for initRulesCMM. Refs UICIRC-837.

## [7.1.0](https://github.com/folio-org/ui-circulation/tree/v7.1.0) (2022-06-29)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v7.0.3...v7.1.0)

* Add RTL/Jest testing for `LostItemFeePolicySettings` component in `settings/LostItemFeePolicy`. Refs UICIRC-758.
* Add RTL/Jest testing for `PatronNotices` component in `settings/PatronNotices`. Refs UICIRC-760.
* Add RTL/Jest testing for `StaffSlipManager` component in `src/settings/StaffSlips`. Refs UICIRC-762.
* Add RTL/Jest testing for `LoanPolicySettings` component in `src/settings/LoanPolicy`. Refs UICIRC-757.
* Add RTL/Jest testing for `NoticePolicySettings` component in `settings/NoticePolicy`. Refs UICIRC-759.
* Add RTL/Jest testing for `RequestPolicySettings` component in `settings/RequestPolicy`. Refs UICIRC-761.
* Add RTL/Jest testing for `LoanHistorySettings` component in `src/settings/LoanHistory`. Refs UICIRC-763.
* Add RTL/Jest testing for `AnonymizingTypeSelectContainer` component in `src/settings/components/AnonymizingTypeSelect`. Refs UICIRC-654.
* Add id for Pane component. Refs UICIRC-756.
* Fix problem with module launch. Refs UICIRC-768.
* Cover LoansSection component by RTL/jest tests. Refs UICIRC-613.
* Add RTL/Jest testing for `RequestPolicyForm` component in `src/settings/RequestPolicy`. Refs UICIRC-647.
* Add RTL/Jest testing for `NoticeCard` component in `src\settings\NoticePolicy\components\EditSections\components`. Refs UICIRC-636.
* Cover FixedDueDateScheduleForm component by RTL/jest tests. Refs UICIRC-609.
* Add RTL/Jest testing for `PatronNoticeForm` component in `src/settings/PatronNotices`. Refs UICIRC-644.
* Cypress issue with circulation rules form. Refs UICIRC-776.
* User can save "Overdue fine" and "Overdue recall fine" with values less than 0. Refs UICIRC-784.
* Lost item processing fee can be saved with a value less than 0. Refs UICIRC-779.
* Fix tests fails. Refs UICIRC-816.
* Unable to delete fixed due date schedule with permission `ui-circulation.settings.fixed-due-date-schedules`. Refs UICIRC-715.
* Extract repeatable part of code from `Validation`. Refs UICIRC-804.
* Add RTL/Jest testing for `src\settings\Validation\fine-policy` folder. Refs UICIRC-806.
* Update NodeJS to v16 in GitHub Actions. Refs UICIRC-815.
* Add RTL/Jest testing for `src/settings/Models/common` folder. Refs UICIRC-795.
* UI tests replacement with RTL/Jest for `FinePolicy` folder in `Models`. Refs UICIRC-796.
* Add RTL/Jest testing for `src/settings/Models/FixedDueDateSchedule` folder. Refs UICIRC-797.
* Fix problems in `FixedDueDateScheduleForm` tests. Refs UICIRC-817.
* Replace babel-eslint with @babel/eslint-parser. Refs UICIRC-780.
* No validation for spacebar when create Patron notice template. Refs UICIRC-782.
* Fix eslint error. Refs UICIRC-820.
* Adjust `configuration.all` permission set. Refs UICIRC-697.
* Create common helper, cover it by RTL/jest tests. UICIRC-803.
* Cover `LoanPolicy` folder in `Models` by RTL/jest tests. Refs UICIRC-798.
* Add RTL/Jest testing for `LoanHistoryModel` in `src/settings/Models`. Refs UICIRC-802.
* Add RTL/Jest testing for `RulesField` component in `src/settings/lib/RuleEditor`. Refs UICIRC-826.
* Add RTL/Jest testing for `src/settings/Validation/checkout-settings` folder. Refs UICIRC-805.
* Cover `RequestPolicy` by RTL/jest tests. Refs UICIRC-801.
* Add RTL/Jest testing for `RulesForm` component in `src/settings/lib/RuleEditor`. Refs UICIRC-825.
* Add RTL/Jest testing for `src/settings/Models/LostItemFeePolicy` folder. Refs UICIRC-799.
* Add RTL/Jest testing for `patron-notice-template` and `request-policy` components in `src/settings/Validation`. Refs UICIRC-812.
* UI tests replacement with RTL/Jest for `NoticePolicy` folder in `Models`. UICIRC-800.
* Add RTL/Jest testing for `src/settings/Validation/loan-history` folder. Refs UICIRC-808.
* Add RTL/Jest testing for `src/settings/Validation/fixed-due-date-schedule` folder. Refs UICIRC-807.

## [7.0.3](https://github.com/folio-org/ui-circulation/tree/v7.0.3) (2022-04-11)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v7.0.2...v7.0.3)

* Hide title level requests settings. Refs UICIRC-777.

## [7.0.2](https://github.com/folio-org/ui-circulation/tree/v7.0.2) (2022-04-06)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v7.0.1...v7.0.2)

* Lost Item Policy validation error with aging only recalls to lost. Refs UICIRC-772.

## [7.0.1](https://github.com/folio-org/ui-circulation/tree/v7.0.1) (2022-03-31)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v7.0.0...v7.0.1)

* Add the possibility to select only active templates. Refs UICIRC-771.

## [7.0.0](https://github.com/folio-org/ui-circulation/tree/v7.0.0) (2022-02-24)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v6.0.1...v7.0.0)

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
* Use constants instead of hardcoded value for query limits. Refs UICIRC-724.
* Prevent deletion of policies if they're in use. Refs UICIRC-669.
* Add RTL/Jest testing for `FeeFineNoticesSection` component in `NoticePolicy/components/EditSections/FeeFineNoticesSection`. Refs UICIRC-637.
* Add RTL/Jest testing for `ExceptionCard` component in `settings/LoanHistory/ExceptionCard`. Refs UICIRC-604.
* Add RTL/Jest testing for `FixedDueDateScheduleDetail` component in `settings\FixedDueDateSchedule`. Refs UICIRC-608.
* Add RTL/Jest testing for `RequestPolicyDetail` component in `src\settings\RequestPolicy`. Refs UICIRC-646.
* UI fee/fine date/time token previews are hard-coded. Refs UICIRC-480.
* Also support `circulation` `12.0`. Refs UICIRC-729.
* Add RTL/Jest testing for `CheckoutSettings` component in `src/settings/CheckoutSettings`. Refs UICIRC-592.
* Add RTL/Jest testing for `NoticePolicyDetail` component in `src/settings/NoticePolicy`. Refs UICIRC-629.
* Add RTL/Jest testing for `LostItemFeePolicyForm` component in `src/settings/LostItemFeePolicy`. Refs UICIRC-619.
* Add RTL/Jest testing for `NoticePolicyForm` component in `src/settings/NoticePolicy`. Refs UICIRC-630.
* Add RTL/Jest testing for `FinePolicyForm` component in `src/settings/FinePolicy`. Refs UICIRC-737.
* Add RTL/Jest testing for `LoanPolicyForm` component in `src/settings/LoanPolicy`. Refs UICIRC-611.
* Add RTL/Jest testing for `StaffSlipDetail` component in `src/settings/StaffSlips`. Refs UICIRC-649.
* Add RTL/Jest testing for `LoanHistoryForm` component in `src/settings/LoanHistory`. Refs UICIRC-606.
* Add RTL/Jest testing for `FinePolicyDetail` component in `src/settings/FinePolicy`. Refs UICIRC-738.
* Add RTL/Jest testing for `FixedDueDateScheduleManager` component in `src/settings/FixedDueDateSchedule`. Refs UICIRC-600.
* Also support `circulation` `13.0`. Refs UICIRC-732.
* Date format in preview should change depending on localization in `Staff slips`. Refs UICIRC-734.
* `Preview of patron notice template` title is broken. `Preview of staff slips` title is broken. Refs UICIRC-735.
* Add RTL/Jest testing for `LostItemFeePolicyDetail` component in `src\settings\LostItemFeePolicy`. Refs UICIRC-621.
* Add RTL/Jest testing for `FinePolicySettings` component in `src/settings/FinePolicy`. Refs UICIRC-593.
* Permission errors with `ui-circulation.settings.notice-policies`. Refs UICIRC-717.
* Add setting to enable and disable wildcard barcode lookup. Refs UICIRC-712.
* Remove "Requests" from list of circulation apps to enable perform wildcard lookup of items by barcode in Circulation settings. Refs UICIRC-754.
* Permission errors with `ui-circulation.settings.view-loan-policies`. Refs UICIRC-747.
* Permission errors with `ui-circulation.settings.loan-history`. Refs UICIRC-748.
* Permission errors with `ui-circulation.settings.request-policies`. Refs UICIRC-742.
* Add `circulation.loans.collection.get` as subpermission for `ui-circulation.settings.view-lost-item-fees-policies`. Refs UICIRC-745.
* Add `circulation.loans.collection.get` as subpermission for `ui-circulation.settings.view-overdue-fines-policies`. Refs UICIRC-746.
* Permission errors with `ui-circulation.settings.notice-templates`. Refs UICIRC-744.
* Add `user-settings.custom-fields.collection.get` as subpermission for `ui-circulation.settings.other-settings`. Refs UICIRC-750.
* Add `overdue-fines-policies.collection.get` and `lost-item-fees-policies.collection.get` as subpermissions for `ui-circulation.settings.circulation-rules`. Refs UICIRC-714.

## [6.0.1] (https://github.com/folio-org/ui-circulation/tree/v6.0.1) (2021-11-23)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v6.0.0...v6.0.1)

* Provide read-only access to loan policies. Refs UICIRC-693.

## [6.0.0](https://github.com/folio-org/ui-circulation/tree/v6.0.0) (2021-09-30)
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
* Add RTL/Jest testing for `LoanPolicyDetail` component in `src/settings/LoanPolicy`. Refs UICIRC-610.

## [5.1.1](https://github.com/folio-org/ui-circulation/tree/v5.1.1) (2021-08-06)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v5.1.0...v5.1.1)

* Fix bug causing incorrect validation in lost item fee policies. Fixes UICIRC-667, UICIRC-668.

## [5.1.0](https://github.com/folio-org/ui-circulation/tree/v5.1.0) (2021-06-14)
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

## [5.0.1](https://github.com/folio-org/ui-circulation/tree/v5.0.1) (2021-04-21)
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

## [4.0.2](https://github.com/folio-org/ui-circulation/tree/v4.0.2) (2020-11-24)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v4.0.1...v4.0.2)

* Incorrect validation blocking user from saving overdue fine policy. Refs UICIRC-533.

## [4.0.1](https://github.com/folio-org/ui-circulation/tree/v4.0.1) (2020-11-05)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v4.0.0...v4.0.1)

* Errors with new validation for 'Lost item fee policy' page. Refs UICIRC-512.
* Unable to enter decimal places on Overdue Fines Policy on Honeysuckle and Snapshot Dev. Refs UICIRC-514.
* Validation and other issues with patron notice template names. Refs UICIRC-518.

## [4.0.0](https://github.com/folio-org/ui-circulation/tree/v4.0.0) (2020-10-13)
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

## [3.0.0](https://github.com/folio-org/ui-circulation/tree/v3.0.0) (2020-06-10)
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

## [2.0.0](https://github.com/folio-org/ui-circulation/tree/v2.0.0) (2020-03-13)
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
