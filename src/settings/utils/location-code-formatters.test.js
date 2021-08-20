import {
  formatCampusCode,
  formatCampusDisplayCode,
  formatLibraryCode,
  formatLibraryDisplayCode,
  formatLocationCode,
  formatLocationDisplayCode,
} from './location-code-formatters';
import * as replacer from './with-dash-replacer';

const replacerSpy = jest.spyOn(replacer, 'default');

describe('settings utils', () => {
  const mockedLibrarysData = {
    records: [
      {
        id: ' testLibraryId ',
        campusId: ' campusTestId ',
        code: ' libraryTestCode ',
      },
      {
        id: ' something ',
        campusId: ' testId ',
        code: ' libraryTestCode ',
      },
    ],
  };
  const mockedCampusesData = {
    records: [
      {
        id: ' campusTestId ',
        code: ' campus-test-code ',
        institutionId: ' testInstitutionId ',
      },
      {
        id: ' somethingElse ',
        code: ' campusTestCode ',
        institutionId: ' testId ',
      },
    ],
  };
  const mockedInstitutionsData = {
    records: [
      {
        id: ' testInstitutionId ',
        code: ' institutionTestCode ',
      },
      {
        id: ' somethingElse ',
        code: ' institutionTestCode ',
      },
    ],
  };
  const mockedLocationData = {
    libraryId: ' testLibraryId ',
    code: ' locationTestCode ',
    name: 'LocationName',
  };

  afterEach(() => {
    replacerSpy.mockClear();
  });

  describe('formatCampusCode', () => {
    it('should find, process and concat codes correctly', () => {
      const expectedResult = 'institutionTestCode>campus-test-code';

      expect(formatCampusCode(mockedCampusesData.records[0], mockedInstitutionsData)).toBe(expectedResult);
      expect(replacerSpy).toHaveBeenNthCalledWith(1, mockedInstitutionsData.records[0].code);
      expect(replacerSpy).toHaveBeenNthCalledWith(2, mockedCampusesData.records[0].code);
    });
  });

  describe('formatCampusDisplayCode', () => {
    it('should find, process and concat codes correctly', () => {
      const expectedResult = 'campus-test-code (institutionTestCode)';

      expect(formatCampusDisplayCode(mockedCampusesData.records[0], mockedInstitutionsData)).toBe(expectedResult);
      expect(replacerSpy).toHaveBeenNthCalledWith(1, mockedCampusesData.records[0].code);
      expect(replacerSpy).toHaveBeenNthCalledWith(2, mockedInstitutionsData.records[0].code);
    });
  });

  describe('formatLibraryCode', () => {
    it('should find, process and concat codes correctly', () => {
      const expectedResult = 'institutionTestCode>campus-test-code>libraryTestCode';

      expect(formatLibraryCode(mockedLibrarysData.records[0], mockedInstitutionsData, mockedCampusesData)).toBe(expectedResult);
      expect(replacerSpy).toHaveBeenNthCalledWith(1, mockedInstitutionsData.records[0].code);
      expect(replacerSpy).toHaveBeenNthCalledWith(2, mockedCampusesData.records[0].code);
      expect(replacerSpy).toHaveBeenNthCalledWith(3, mockedLibrarysData.records[0].code);
    });
  });

  describe('formatLibraryDisplayCode', () => {
    it('should find, process and concat codes correctly', () => {
      const expectedResult = 'libraryTestCode (institutionTestCode-campus-test-code)';

      expect(formatLibraryDisplayCode(mockedLibrarysData.records[0], mockedInstitutionsData, mockedCampusesData)).toBe(expectedResult);
      expect(replacerSpy).toHaveBeenNthCalledWith(1, mockedLibrarysData.records[0].code);
      expect(replacerSpy).toHaveBeenNthCalledWith(2, mockedInstitutionsData.records[0].code);
      expect(replacerSpy).toHaveBeenNthCalledWith(3, mockedCampusesData.records[0].code);
    });
  });

  describe('formatLocationCode', () => {
    it('should find, process and concat codes correctly', () => {
      const expectedResult = 'institutionTestCode>campus-test-code>libraryTestCode>locationTestCode';

      expect(formatLocationCode(mockedLocationData, mockedInstitutionsData, mockedCampusesData, mockedLibrarysData)).toBe(expectedResult);
      expect(replacerSpy).toHaveBeenNthCalledWith(1, mockedInstitutionsData.records[0].code);
      expect(replacerSpy).toHaveBeenNthCalledWith(2, mockedCampusesData.records[0].code);
      expect(replacerSpy).toHaveBeenNthCalledWith(3, mockedLibrarysData.records[0].code);
      expect(replacerSpy).toHaveBeenNthCalledWith(4, mockedLocationData.code);
    });
  });

  describe('formatLocationDisplayCode', () => {
    it('should find, process and concat codes correctly', () => {
      const expectedResult = 'locationTestCode (LocationName)';

      expect(formatLocationDisplayCode(mockedLocationData)).toBe(expectedResult);
      expect(replacerSpy).toHaveBeenNthCalledWith(1, mockedLocationData.code);
    });
  });
});
