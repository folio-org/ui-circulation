import { patronNoticeCategoryIds } from '../../constants';
import { generatePreviewDateValue } from './utils';
import { DATE_FORMAT_WITH_TIME } from './utils/constantsForMoment';

const allowedForAllCategories = [...Object.values(patronNoticeCategoryIds)];
const item = [
  {
    token: 'item.title',
    previewValue: 'The Wines of Italy',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.primaryContributor',
    previewValue: 'Thomas, George B.',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.allContributors',
    previewValue: 'Finney, Ross L.; Weir, Maurice D.',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.barcode',
    previewValue: '31924001521792',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.barcodeImage',
    previewValue: '<Barcode>31924001521792</Barcode>',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.callNumber',
    previewValue: 'TK7871.15.F4 S67 1988',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.callNumberPrefix',
    previewValue: 'New & Noteworthy',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.callNumberSuffix',
    previewValue: 'Handbook',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.enumeration',
    previewValue: 'no.1-3',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.volume',
    previewValue: 'v. 27',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.chronology',
    previewValue: '1964-1967 (Board)',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.yearCaption',
    previewValue: 'Convention photographs 1911-1960',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.materialType',
    previewValue: 'Serial',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.copy',
    previewValue: 'c.2',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.numberOfPieces',
    previewValue: '7',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.descriptionOfPieces',
    previewValue: '7 maps in pocket',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.loanType',
    previewValue: 'Can circulate',
    allowedFor: allowedForAllCategories,
  },
];
const effectiveLocation = [
  {
    token: 'item.effectiveLocationDiscoveryDisplayName',
    previewValue: 'Main Library',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.effectiveLocationSpecific',
    previewValue: 'Main Library Reserve',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.effectiveLocationLibrary',
    previewValue: 'Main Library',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.effectiveLocationCampus',
    previewValue: 'South Campus',
    allowedFor: allowedForAllCategories,
  },
  {
    token: 'item.effectiveLocationInstitution',
    previewValue: 'Opentown University',
    allowedFor: allowedForAllCategories,
  },
];
const getTokens = (locale) => ({
  item,
  user: [
    {
      token: 'user.firstName',
      previewValue: 'John',
      allowedFor: allowedForAllCategories,
    },
    {
      token: 'user.lastName',
      previewValue: 'Smith',
      allowedFor: allowedForAllCategories,
    },
    {
      token: 'user.middleName',
      previewValue: 'Adam',
      allowedFor: allowedForAllCategories,
    },
    {
      token: 'user.preferredFirstName',
      previewValue: 'Paul',
      allowedFor: allowedForAllCategories,
    },
    {
      token: 'user.barcode',
      previewValue: '456123789',
      allowedFor: allowedForAllCategories,
    },
    {
      token: 'user.barcodeImage',
      previewValue: '<Barcode>456123789</Barcode>',
      allowedFor: allowedForAllCategories,
    },
  ],
  request: [
    {
      token: 'request.servicePointPickup',
      previewValue: 'Circulation Desk - Main Library',
      allowedFor: [patronNoticeCategoryIds.REQUEST],
    },
    {
      token: 'request.requestExpirationDate',
      previewValue: generatePreviewDateValue(locale),
      allowedFor: [patronNoticeCategoryIds.REQUEST],
    },
    {
      token: 'request.requestExpirationDateTime',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: [patronNoticeCategoryIds.REQUEST],
    },
    {
      token: 'request.holdShelfExpirationDate',
      previewValue: generatePreviewDateValue(locale),
      allowedFor: [patronNoticeCategoryIds.REQUEST],
    },
    {
      token: 'request.holdShelfExpirationDateTime',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: [patronNoticeCategoryIds.REQUEST],
    },
    {
      token: 'request.reasonForCancellation',
      previewValue: 'Item not available',
      allowedFor: [patronNoticeCategoryIds.REQUEST],
    },
    {
      token: 'request.additionalInfo',
      previewValue: 'Additional information regarding the request cancellation',
      allowedFor: [patronNoticeCategoryIds.REQUEST],
    },
  ],
  loan: [
    {
      token: 'loan.dueDate',
      previewValue: generatePreviewDateValue(locale),
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.dueDateTime',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.initialBorrowDate',
      previewValue: generatePreviewDateValue(locale),
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.initialBorrowDateTime',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.checkedInDate',
      previewValue: generatePreviewDateValue(locale),
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.checkedInDateTime',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.numberOfRenewalsAllowed',
      previewValue: '10',
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.numberOfRenewalsTaken',
      previewValue: '2',
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.numberOfRenewalsRemaining',
      previewValue: '8',
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
  ],
  effectiveLocation,
  feeFineCharge: [
    {
      token: 'feeCharge.owner',
      previewValue: 'Main Library',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'feeCharge.type',
      previewValue: 'Damaged Item',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'feeCharge.paymentStatus',
      previewValue: 'Outstanding',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'feeCharge.chargeDate',
      previewValue: generatePreviewDateValue(locale),
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'feeCharge.chargeDateTime',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'feeCharge.amount',
      previewValue: '$15.00',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'feeCharge.remainingAmount',
      previewValue: '$10.00',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'feeCharge.additionalInfo',
      previewValue: 'This is a text field intended to provide additional information for the patron regarding the fee/fine.',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
  ],
  feeFineAction: [
    {
      token: 'feeAction.type',
      previewValue: 'Waived partially',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_ACTION,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
      ],
    },
    {
      token: 'feeAction.actionDate',
      previewValue: generatePreviewDateValue(locale),
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_ACTION,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
      ],
    },
    {
      token: 'feeAction.actionDateTime',
      previewValue: generatePreviewDateValue(locale, DATE_FORMAT_WITH_TIME),
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_ACTION,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
      ],
    },
    {
      token: 'feeAction.amount',
      previewValue: '$5.00',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_ACTION,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
      ],
    },
    {
      token: 'feeAction.remainingAmount',
      previewValue: '$10.00',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_ACTION,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
      ],
    },
    {
      token: 'feeAction.additionalInfo',
      previewValue: 'Cost to repair less than expected.',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_ACTION,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
      ],
    },
  ],
});


export default getTokens;
