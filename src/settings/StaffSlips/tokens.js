import { staffSlipMap } from '../../constants';
import { generatePreviewDateValue } from '../PatronNotices/utils';
import { DATE_FORMAT_WITH_TIME } from '../PatronNotices/utils/constantsForMoment';

const getTokens = (locale) => ({
  item: [
    {
      token: 'item.title',
      previewValue: 'The Wines of Italy',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.primaryContributor',
      previewValue: 'Thomas, George B.',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.allContributors',
      previewValue: 'Finney, Ross L.; Weir, Maurice D.',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.barcode',
      previewValue: '31924001521792',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.barcodeImage',
      previewValue: '<Barcode>31924001521792</Barcode>',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.callNumber',
      previewValue: 'TK7871.15.F4 S67 1988',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.callNumberPrefix',
      previewValue: 'New & Noteworthy',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.callNumberSuffix',
      previewValue: 'Handbook',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.copy',
      previewValue: 'c.2',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.enumeration',
      previewValue: 'no.1-3',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.volume',
      previewValue: 'v. 27',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.chronology',
      previewValue: '1964-1967 (Board)',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.yearCaption',
      previewValue: 'Convention photographs 1911-1960',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.loanType',
      previewValue: 'Course reserves',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.materialType',
      previewValue: 'Serial',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.numberOfPieces',
      previewValue: '7',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.descriptionOfPieces',
      previewValue: '7 maps in pocket',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.lastCheckedInDateTime',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.fromServicePoint',
      previewValue: 'Circulation Desk - South Library',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.toServicePoint',
      previewValue: 'Circulation Desk - Main Library',
      allowedFor: [...Object.values(staffSlipMap)],
    },
  ],
  effectiveLocation: [
    {
      token: 'item.effectiveLocationInstitution',
      previewValue: 'Opentown University',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.effectiveLocationCampus',
      previewValue: 'South Campus',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.effectiveLocationLibrary',
      previewValue: 'Main Library',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'item.effectiveLocationSpecific',
      previewValue: 'Main Library Reserve',
      allowedFor: [...Object.values(staffSlipMap)],
    },
  ],
  request: [
    {
      token: 'request.servicePointPickup',
      previewValue: 'Circulation Desk - Main Library',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'request.requestExpirationDate',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'request.holdShelfExpirationDate',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'request.requestID',
      previewValue: '987321654',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'request.patronComments',
      previewValue: 'Please deliver to the History building for Professor McCoy.',
      allowedFor: [...Object.values(staffSlipMap)],
    },
  ],
  requestDeliveryAddress: [
    {
      token: 'request.deliveryAddressType',
      previewValue: 'Office',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'requester.addressLine1',
      previewValue: '123 Campus Drive',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'requester.addressLine2',
      previewValue: '226 Classroom Building, Box 12345',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'requester.city',
      previewValue: 'Los Angeles',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'requester.stateProvRegion',
      previewValue: 'CA',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'requester.zipPostalCode',
      previewValue: '90048',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'requester.country',
      previewValue: 'USA',
      allowedFor: [...Object.values(staffSlipMap)],
    },
  ],
  requester: [
    {
      token: 'requester.firstName',
      previewValue: 'James',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'requester.lastName',
      previewValue: 'Smith',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'requester.middleName',
      previewValue: 'Adam',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'requester.preferredFirstName',
      previewValue: 'Paul',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'requester.barcode',
      previewValue: '456123789',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'requester.barcodeImage',
      previewValue: '<Barcode>456123789</Barcode>',
      allowedFor: [...Object.values(staffSlipMap)],
    },
    {
      token: 'requester.patronGroup',
      previewValue: 'Undergraduate',
      allowedFor: [...Object.values(staffSlipMap)],
    },
  ],
  staffSlip: [
    {
      token: 'staffSlip.Name',
      previewValue: 'Transit',
      allowedFor: [...Object.values(staffSlipMap)],
    },
  ],
});

export default getTokens;
