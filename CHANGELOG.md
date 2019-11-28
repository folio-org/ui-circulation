# Change history for ui-circulation

## 1.12.0 (IN PROGRESS)

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

## [1.11.0](https://github.com/folio-org/ui-circulation/tree/v1.13.0) (2019-09-13)
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
