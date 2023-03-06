import React from 'react';
import Proptypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
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

import { patronNoticeCategories } from '../../../../../constants';
import {
  // isEditLayer,
  validateUniqueNameById,
} from '../../../../utils/utils';

const PatronNoticeAboutSection = (props) => {
  const { initialValues, okapi, intl : { formatMessage } } = props;
  const categoryOptions = patronNoticeCategories.map(({ label, id }) => ({
    label: formatMessage({ id: label }),
    value: id,
  }));
  const isActive = initialValues && initialValues.active;

  const getTemplatesByName = (name) => {
    return fetch(`${okapi.url}/templates?query=(name=="${name}")`,
      {
        headers: {
          'X-Okapi-Tenant': okapi.tenant,
          'X-Okapi-Token': okapi.token,
          'Content-Type': 'application/json',
        }
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
    <div>
      <Row>
        <Col
          xs={8}
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
        <Col xs={3}>
          <Field
            data-testid="patronNoticesNoticeActive"
            label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.active" />}
            name="active"
            id="input-patron-notice-active"
            component={Checkbox}
            defaultChecked={isActive}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={8}>
          <Field
            data-testid="patronNoticesNoticeDescription"
            label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.description" />}
            name="description"
            id="input-patron-notice-description"
            component={TextArea}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <div data-test-template-category>
            <Field
              data-testid="patronNoticesNoticeCategory"
              label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.category" />}
              name="category"
              component={Select}
              fullWidth
              dataOptions={categoryOptions}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
PatronNoticeAboutSection.propTypes = {
  initialValues: Proptypes.object.isRequired,
  okapi: Proptypes.object.isRequired,
  intl: Proptypes.object.isRequired,
};
export default injectIntl(PatronNoticeAboutSection);
