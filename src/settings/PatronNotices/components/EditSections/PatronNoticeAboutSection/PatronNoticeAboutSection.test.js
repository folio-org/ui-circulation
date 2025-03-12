import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import { Field } from 'react-final-form';
import {
  KeyValue,
  TextField,
  Checkbox,
  TextArea,
  Select,
} from '@folio/stripes/components';

import { componentPropsCheck } from '../../../../../../test/jest/helpers';
import PatronNoticeAboutSection from './PatronNoticeAboutSection';

jest.mock('../../../../../constants', () => ({
  patronNoticeCategories: [{
    id: 'testId',
    label: 'testLabel',
  }],
}));

describe('PatronNoticeAboutSectionEdit', () => {
  const testOkapi = {
    url: 'testUrl',
    tenant: 'testTenant',
    token: 'testToken',
  };
  const initialValues = {
    active: true,
    category: 'testCategory',
    id: 'a9de498f-57c8-469c-8b3d-ae57a517fe62',
    name: 'testName',
    desciption: 'testDescription',
  };
  const okapi = testOkapi;
  const labelIds = {
    patronNoticesNoticeName: 'ui-circulation.settings.patronNotices.notice.name',
    patronNoticesNoticeActive: 'ui-circulation.settings.patronNotices.notice.active',
    patronNoticesNoticeDescription: 'ui-circulation.settings.patronNotices.notice.description',
    patronNoticesNoticeCategory: 'ui-circulation.settings.patronNotices.notice.category',
  };
  const testIds = {
    patronNoticeAboutSection: 'patronNoticeAboutSection',
    patronNoticesNoticeName: 'patronNoticesNoticeName',
    patronNoticesNoticeActive: 'patronNoticesNoticeActive',
    patronNoticesNoticeDescription: 'patronNoticesNoticeDescription',
    patronNoticesNoticeCategory: 'patronNoticesNoticeCategory',
  };
  const getItemByTestId = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    KeyValue.mockClear();
    Field.mockClear();
  });

  beforeEach(() => {
    render(
      <PatronNoticeAboutSection
        initialValues={initialValues}
        okapi={okapi}
      />
    );
  });

  it('should render component', () => {
    expect(getItemByTestId(testIds.patronNoticeAboutSection)).toBeTruthy();
  });

  it('should render notice name Field component', () => {
    componentPropsCheck(Field, testIds.patronNoticesNoticeName, {
      label: labelIds.patronNoticesNoticeName,
      name: 'name',
      required: true,
      id: 'input-patron-notice-name',
      autoFocus: true,
      component: TextField,
    }, true);
  });

  it('should render notice active Field component', () => {
    componentPropsCheck(Field, testIds.patronNoticesNoticeActive, {
      label: labelIds.patronNoticesNoticeActive,
      name: 'active',
      id: 'input-patron-notice-active',
      component: Checkbox,
      defaultChecked: true,
      validateFields: [],
    }, true);
  });

  it('should render notice description Field component', () => {
    componentPropsCheck(Field, testIds.patronNoticesNoticeDescription, {
      label: labelIds.patronNoticesNoticeDescription,
      name: 'description',
      id: 'input-patron-notice-description',
      component: TextArea,
      validateFields: [],
    }, true);
  });

  it('should render notice category Field component', () => {
    componentPropsCheck(Field, testIds.patronNoticesNoticeCategory, {
      label: labelIds.patronNoticesNoticeCategory,
      name: 'category',
      component: Select,
      fullWidth: true,
      dataOptions: [{
        value: 'testId',
        label: 'testLabel',
      }],
      validateFields: [],
    });
  });
});
