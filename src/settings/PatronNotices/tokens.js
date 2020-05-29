import { patronNoticeCategoryIds } from '../../constants';

const formats = {
  item: [
    {
      token: 'item.title',
      previewValue: 'The Wines of Italy',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.primaryContributor',
      previewValue: 'Thomas, George B.',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.allContributors',
      previewValue: 'Finney, Ross L.; Weir, Maurice D.',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.barcode',
      previewValue: '31924001521792',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.barcodeImage',
      previewValue: '<Barcode>31924001521792</Barcode>',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.callNumber',
      previewValue: 'TK7871.15.F4 S67 1988',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.callNumberPrefix',
      previewValue: 'New & Noteworthy',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.callNumberSuffix',
      previewValue: 'Handbook',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.enumeration',
      previewValue: 'no.1-3',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.volume',
      previewValue: 'v. 27',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.chronology',
      previewValue: '1964-1967 (Board)',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.yearCaption',
      previewValue: 'Convention photographs 1911-1960',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.materialType',
      previewValue: 'Serial',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.copy',
      previewValue: 'c.2',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.numberOfPieces',
      previewValue: '7',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.descriptionOfPieces',
      previewValue: '7 maps in pocket',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
  ],
  user: [
    {
      token: 'user.firstName',
      previewValue: 'John',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'user.lastName',
      previewValue: 'Smith',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'user.middleName',
      previewValue: 'Adam',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'user.barcode',
      previewValue: '456123789',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'user.barcodeImage',
      previewValue: '<Barcode>456123789</Barcode>',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
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
      previewValue: 'Mar 31 30, 2020',
      allowedFor: [patronNoticeCategoryIds.REQUEST],
    },
    {
      token: 'request.requestExpirationDateTime',
      previewValue: 'Mar 31, 2020 23:59',
      allowedFor: [patronNoticeCategoryIds.REQUEST],
    },
    {
      token: 'request.holdShelfExpirationDate',
      previewValue: 'Jun 30, 2020',
      allowedFor: [patronNoticeCategoryIds.REQUEST],
    },
    {
      token: 'request.holdShelfExpirationDateTime',
      previewValue: 'Jun 30, 2020 23:59',
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
      previewValue: 'Dec 31, 2019',
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.dueDateTime',
      previewValue: 'Dec 31, 2019 22:00',
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.initialBorrowDate',
      previewValue: 'Jan 1, 2019',
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.initialBorrowDateTime',
      previewValue: 'Jan 1, 2019 11:00',
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.checkedInDate',
      previewValue: 'Dec 15, 2019',
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.checkedInDateTime',
      previewValue: 'Dec 15, 2019 13:24',
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.numberOfRenewalsAllowed',
      previewValue: '10',
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.numberOfRenewalsTaken',
      previewValue: '2',
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'loan.numberOfRenewalsRemaining',
      previewValue: '8',
      allowedFor: [
        patronNoticeCategoryIds.LOAN,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
  ],
  effectiveLocation: [
    {
      token: 'item.effectiveLocationSpecific',
      previewValue: 'Main Library Reserve',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.effectiveLocationLibrary',
      previewValue: 'Main Library',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.effectiveLocationCampus',
      previewValue: 'South Campus',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
    {
      token: 'item.effectiveLocationInstitution',
      previewValue: 'Opentown University',
      allowedFor: [...Object.values(patronNoticeCategoryIds)],
    },
  ],
  feeFineCharge: [
    {
      token: 'feeCharge.owner',
      previewValue: 'Main Library',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'feeCharge.type',
      previewValue: 'Damaged Item',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'feeCharge.paymentStatus',
      previewValue: 'Outstanding',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'feeCharge.date',
      previewValue: 'Jun 30, 2020',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'feeCharge.dateTime',
      previewValue: 'Jun 30, 2020 11:00',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'feeCharge.amount',
      previewValue: '$15.00',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'feeCharge.remainingAmount',
      previewValue: '$10.00',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
    {
      token: 'feeCharge.additionalInfo',
      previewValue: 'This is a text field intended to provide additional information for the patron regarding the fee/fine.',
      allowedFor: [
        patronNoticeCategoryIds.FEE_FINE_CHARGE,
        patronNoticeCategoryIds.AUTOMATED_FEE_FINE,
        patronNoticeCategoryIds.FEE_FINE_ACTION,
      ],
    },
  ],
  feeFineAction: [
    {
      token: 'feeAction.type',
      previewValue: 'Waived partially',
      allowedFor: [patronNoticeCategoryIds.FEE_FINE_ACTION],
    },
    {
      token: 'feeAction.date',
      previewValue: 'Jul 10, 2020',
      allowedFor: [patronNoticeCategoryIds.FEE_FINE_ACTION],
    },
    {
      token: 'feeAction.dateTime',
      previewValue: 'Jul 10, 2020 8:00',
      allowedFor: [patronNoticeCategoryIds.FEE_FINE_ACTION],
    },
    {
      token: 'feeAction.amount',
      previewValue: '$5.00',
      allowedFor: [patronNoticeCategoryIds.FEE_FINE_ACTION],
    },
    {
      token: 'feeAction.remainingAmount',
      previewValue: '$10.00',
      allowedFor: [patronNoticeCategoryIds.FEE_FINE_ACTION],
    },
    {
      token: 'feeAction.additionalInfo',
      previewValue: 'Cost to repair less than expected.',
      allowedFor: [patronNoticeCategoryIds.FEE_FINE_ACTION],
    },
  ],
};

export default formats;
