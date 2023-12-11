import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';
import { get } from 'lodash';

import {
  Accordion,
  AccordionSet,
  ExpandAllButton,
  Row,
  Col,
} from '@folio/stripes/components';
import { stripesShape } from '@folio/stripes/core';

import { Metadata } from '../components';
import {
  PatronNoticeAboutSection,
  PatronNoticeEmailSection,
} from './components/ViewSections';

const PatronNoticeDetail = (props) => {
  const {
    initialValues: notice,
    intl: {
      formatMessage,
      locale,
    },
    stripes: {
      connect,
    }
  } = props;
  const emailTemplate = get(notice, 'localizedTemplates.en.body', '');

  return (
    <div data-test-patron-notice-details>
      <AccordionSet>
        <Row end="xs">
          <Col data-test-expand-all>
            <ExpandAllButton />
          </Col>
        </Row>
        <Accordion
          label={formatMessage({ id:'ui-circulation.settings.patronNotices.generalInformation' })}
        >
          <Metadata
            connect={connect}
            metadata={notice.metadata}
          />
          <PatronNoticeAboutSection notice={notice} />
        </Accordion>
        <Accordion
          label={formatMessage({ id: 'ui-circulation.settings.patronNotices.email' })}
        >
          {
            emailTemplate && (
              <PatronNoticeEmailSection
                notice={notice}
                locale={locale}
                emailTemplate={emailTemplate}
              />
            )
          }
        </Accordion>
      </AccordionSet>
    </div>
  );
};

PatronNoticeDetail.propTypes = {
  initialValues: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  stripes: stripesShape.isRequired,
};

export default injectIntl(PatronNoticeDetail);
