import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
} from 'react-intl';
import { Field } from 'react-final-form';

import {
  Col,
  Row,
  Headline,
  Select,
} from '@folio/stripes/components';

import {
  NOT_SELECTED,
  TITLE_LEVEL_REQUESTS,
} from '../../../constants';

const NoticeTemplates = (props) => {
  const {
    intl: {
      formatMessage,
    },
    templates,
  } = props;
  const noticeOptions = [
    { value: NOT_SELECTED, label: formatMessage({ id: 'ui-circulation.settings.titleLevelRequests.defaultTemplateValue' }) },
    ...templates.map(template => ({ value: template.id, label: template.name })),
  ];

  return (
    <Row>
      <Col xs={12}>
        <Headline
          data-testid="header"
          size="large"
          margin="small"
          tag="h3"
        >
          {formatMessage({ id: 'ui-circulation.settings.titleLevelRequests.noticeTemplates' })}
        </Headline>
        <p data-testid="desription">
          {formatMessage({ id: 'ui-circulation.settings.titleLevelRequests.desription' })}
        </p>
        <Field
          name={TITLE_LEVEL_REQUESTS.CONFIRMATION_TEMPLATE}
          label={formatMessage({ id: 'ui-circulation.settings.titleLevelRequests.confirmationNotice' })}
          dataOptions={noticeOptions}
          component={Select}
        />
        <Field
          name={TITLE_LEVEL_REQUESTS.CANCELLATION_TEMPLATE}
          label={formatMessage({ id: 'ui-circulation.settings.titleLevelRequests.cancellationNotice' })}
          dataOptions={noticeOptions}
          component={Select}
        />
        <Field
          name={TITLE_LEVEL_REQUESTS.EXPIRATION_TEMPLATE}
          label={formatMessage({ id: 'ui-circulation.settings.titleLevelRequests.expirationNotice' })}
          dataOptions={noticeOptions}
          component={Select}
        />
      </Col>
    </Row>
  );
};

NoticeTemplates.propTypes = {
  intl: PropTypes.object.isRequired,
  templates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

export default injectIntl(NoticeTemplates);
