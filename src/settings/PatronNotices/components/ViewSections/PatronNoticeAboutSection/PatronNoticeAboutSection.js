import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

const PatronNoticeAboutSection = ({ notice }) => {
  const { active, name, description, category } = notice;

  const isActiveLabel = active
    ? <FormattedMessage id="ui-circulation.settings.patronNotices.yes" />
    : <FormattedMessage id="ui-circulation.settings.patronNotices.no" />;

  return (
    <div
      data-test-patron-notice-detail-about-section
      data-testid="patronNoticeAboutSection"
    >
      <Row>
        <Col
          xs={12}
          data-test-patron-notice-template-name
          data-testid="patronNoticeTemplateName"
        >
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.name" />}
            value={name}
          />
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          data-test-patron-notice-active
          data-testid="patronNoticeActive"
        >
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.active" />}
            value={isActiveLabel}
          />
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          data-test-patron-notice-description
          data-testid="patronNoticeDescription"
        >
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.description" />}
            value={description}
          />
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          data-test-patron-notice-category
          data-testid="patronNoticeCategory"
        >
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.category" />}
            value={category}
          />
        </Col>
      </Row>
    </div>
  );
};

PatronNoticeAboutSection.propTypes = {
  notice: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
};
export default PatronNoticeAboutSection;
