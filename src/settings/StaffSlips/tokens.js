import { staffSlipMap } from '../../constants';
import { generatePreviewDateValue } from '../PatronNotices/utils';
import { DATE_FORMAT_WITH_TIME } from '../PatronNotices/utils/constantsForMoment';

const allowedForAllStaffSlips = [...Object.values(staffSlipMap)];
const getTokens = (locale) => ({
  item: [
    {
      token: 'item.title',
      previewValue: 'The Wines of Italy',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.primaryContributor',
      previewValue: 'Thomas, George B.',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.allContributors',
      previewValue: 'Finney, Ross L.; Weir, Maurice D.',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.barcode',
      previewValue: '31924001521792',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.barcodeImage',
      previewValue: '<Barcode>31924001521792</Barcode>',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.callNumber',
      previewValue: 'TK7871.15.F4 S67 1988',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.callNumberPrefix',
      previewValue: 'New & Noteworthy',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.callNumberSuffix',
      previewValue: 'Handbook',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.copy',
      previewValue: 'c.2',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.displaySummary',
      previewValue: 'no.1-2v. 121948-1962 (Board)',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.enumeration',
      previewValue: 'no.1-3',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.volume',
      previewValue: 'v. 27',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.chronology',
      previewValue: '1964-1967 (Board)',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.yearCaption',
      previewValue: 'Convention photographs 1911-1960',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.loanType',
      previewValue: 'Course reserves',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.materialType',
      previewValue: 'Serial',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.numberOfPieces',
      previewValue: '7',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.descriptionOfPieces',
      previewValue: '7 maps in pocket',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.lastCheckedInDateTime',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.fromServicePoint',
      previewValue: 'Circulation Desk - South Library',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.toServicePoint',
      previewValue: 'Circulation Desk - Main Library',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.accessionNumber',
      previewValue: '1234RFID',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.administrativeNotes',
      previewValue: 'Send to bookbinder',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.datesOfPublication',
      previewValue: '2016',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.editions',
      previewValue: '2nd. edition',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.physicalDescriptions',
      previewValue: 'xx, 238 p. : ill. ; 24 cm.',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.seriesStatements',
      previewValue: 'Department of State publication',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.instanceHrid',
      previewValue: 'inst000000000022',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.instanceHridImage',
      previewValue: '<Barcode>inst000000000022</Barcode>',
      allowedFor: allowedForAllStaffSlips,
    },
  ],
  effectiveLocation: [
    {
      token: 'item.effectiveLocationInstitution',
      previewValue: 'Opentown University',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.effectiveLocationCampus',
      previewValue: 'South Campus',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.effectiveLocationPrimaryServicePointName',
      previewValue: 'Circulation Desk',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.effectiveLocationLibrary',
      previewValue: 'Main Library',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'item.effectiveLocationSpecific',
      previewValue: 'Main Library Reserve',
      allowedFor: allowedForAllStaffSlips,
    },
  ],
  request: [
    {
      token: 'request.servicePointPickup',
      previewValue: 'Circulation Desk - Main Library',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'request.requestExpirationDate',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'request.requestDate',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'request.holdShelfExpirationDate',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'request.requestID',
      previewValue: '987321654',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'request.patronComments',
      previewValue: 'Please deliver to the History building for Professor McCoy.',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'request.barcodeImage',
      previewValue: '<Barcode>40afe5ce68a47</Barcode>',
      allowedFor: allowedForAllStaffSlips,
    },
  ],
  requestDeliveryAddress: [
    {
      token: 'request.deliveryAddressType',
      previewValue: 'Office',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'requester.addressLine1',
      previewValue: '123 Campus Drive',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'requester.addressLine2',
      previewValue: '226 Classroom Building, Box 12345',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'requester.city',
      previewValue: 'Los Angeles',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'requester.stateProvRegion',
      previewValue: 'CA',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'requester.zipPostalCode',
      previewValue: '90048',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'requester.country',
      previewValue: 'USA',
      allowedFor: allowedForAllStaffSlips,
    },
  ],
  requester: [
    {
      token: 'requester.firstName',
      previewValue: 'James',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'requester.lastName',
      previewValue: 'Smith',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'requester.middleName',
      previewValue: 'Adam',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'requester.preferredFirstName',
      previewValue: 'Paul',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'requester.barcode',
      previewValue: '456123789',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'requester.barcodeImage',
      previewValue: '<Barcode>456123789</Barcode>',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'requester.patronGroup',
      previewValue: 'Undergraduate',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'requester.departments',
      previewValue: 'Library Technical Services; IT Operations',
      allowedFor: allowedForAllStaffSlips,
    },
  ],
  staffSlip: [
    {
      token: 'staffSlip.Name',
      previewValue: 'Transit',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'staffSlip.currentDateTime',
      previewValue: '3/18/22, 11:59 AM',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'staffSlip.staffUsername',
      previewValue: 'johndoe',
      allowedFor: allowedForAllStaffSlips,
    },
  ],
  borrower: [
    {
      token: 'borrower.firstName',
      previewValue: 'John',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'borrower.lastName',
      previewValue: 'Smith',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'borrower.middleName',
      previewValue: 'Adam',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'borrower.preferredFirstName',
      previewValue: 'Paul',
      allowedFor: allowedForAllStaffSlips,
    },
    {
      token: 'borrower.patronGroup',
      previewValue: 'Undergraduate',
      allowedFor: allowedForAllStaffSlips,
    },
  ],
  loan: [
    {
      token: 'loan.dueDate',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: allowedForAllStaffSlips,
    },
  ],
});

export default getTokens;
