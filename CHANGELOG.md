# Change history for ui-circulation

## 1.2.0 (IN PROGRESS)

* Setup Loan Rules crud v1. For UICIRC-5.
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
