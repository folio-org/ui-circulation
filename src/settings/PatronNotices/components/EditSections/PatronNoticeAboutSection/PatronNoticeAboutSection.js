import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { memoize } from 'lodash';

import {
  Checkbox,
  Col,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import {
  getHeaderWithCredentials,
} from '@folio/stripes/util';

import { patronNoticeCategories } from '../../../../../constants';
import { validateUniqueNameById } from '../../../../utils/utils';

const PatronNoticeAboutSection = ({ initialValues, okapi, intl }) => {
  const { formatMessage } = intl;
  const categoryOptions = patronNoticeCategories.map(({ label, id }) => ({
    label: formatMessage({ id: label }),
    value: id,
  }));
  const isActive = initialValues && initialValues.active;

  const getTemplatesByName = (name) => {
    return fetch(`${okapi.url}/templates?query=(name=="${name}")`,
      {
        ...getHeaderWithCredentials(okapi)
      });
  };

  const validateName = memoize((name) => (
    validateUniqueNameById({
      currentName: name,
      previousId: initialValues.id,
      getByName: getTemplatesByName,
      selector: 'templates',
      errorKey: 'settings.patronNotices.errors.nameExists',
    })
  ));

  return (
    <div data-testid="patronNoticeAboutSection">
      <Row>
        <Col
          xs={12}
          data-test-patron-notice-template-name
        >
          <Field
            data-testid="patronNoticesNoticeName"
            label={formatMessage({ id: 'ui-circulation.settings.patronNotices.notice.name' })}
            name="name"
            required
            id="input-patron-notice-name"
            autoFocus
            component={TextField}
            validate={validateName}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Field
            data-testid="patronNoticesNoticeActive"
            label={formatMessage({ id:'ui-circulation.settings.patronNotices.notice.active' })}
            name="active"
            id="input-patron-notice-active"
            component={Checkbox}
            defaultChecked={isActive}
            validateFields={[]}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12}>
          <Field
            data-testid="patronNoticesNoticeDescription"
            label={formatMessage({ id:'ui-circulation.settings.patronNotices.notice.description' })}
            name="description"
            id="input-patron-notice-description"
            component={TextArea}
            validateFields={[]}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div data-test-template-category>
            <Field
              data-testid="patronNoticesNoticeCategory"
              label={formatMessage({ id:'ui-circulation.settings.patronNotices.notice.category' })}
              name="category"
              component={Select}
              fullWidth
              dataOptions={categoryOptions}
              validateFields={[]}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
PatronNoticeAboutSection.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
  okapi: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};
export default injectIntl(PatronNoticeAboutSection);
