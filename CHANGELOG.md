# Change history for ui-circulation

## 1.4.0 (IN PROGRESS)

* Provide `sortby` prop to `<ControlledVocab>`. Refs STSMACOM-139.
* Provide `type` prop to `<Field>`. Refs PR #697.
* Support circulation v5.0, requiring service-point information on loans. Refs UICIRC-100.
* Use documented react-intl patterns instead of stripes.intl, UICIRC-91.
* Apply internationalization to all hardcodded strings, UICIRC-97.
* Fix invalid dates. Fixes UICIRC-102.

## 1.3.0 (https://github.com/folio-org/ui-circulation/tree/v1.3.0) (2018-10-04)
[Full Changelog](https://github.com/folio-org/ui-circulation/compare/v1.2.0...v1.3.0)

* Update `stripes-form` dependency to v1.0.0
* Use `stripes` 1.0 framework

## 1.2.0 (https://github.com/folio-org/ui-circulation/tree/v1.2.0) (2017-09-12)
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
