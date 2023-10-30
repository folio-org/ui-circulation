import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

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
  PatronNoticePrintSection,
} from './components/ViewSections';

const initialStatus = {
  info: true,
  email: true,
  print: false,
};

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
  const emailTemplate = notice?.localizedTemplates?.en?.body ?? '';
  const printTemplate = notice?.localizedTemplates?.en?.body ?? '';

  return (
    <div data-test-patron-notice-details>
      <AccordionSet initialStatus={initialStatus}>
        <Row end="xs">
          <Col data-test-expand-all>
            <ExpandAllButton />
          </Col>
        </Row>
        <Accordion
          id="info"
          label={formatMessage({ id:'ui-circulation.settings.patronNotices.generalInformation' })}
        >
          <Metadata
            connect={connect}
            metadata={notice.metadata}
          />
          <PatronNoticeAboutSection notice={notice} />
        </Accordion>
        <Accordion
          id="email"
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
        <Accordion
          id="print"
          label={formatMessage({ id: 'ui-circulation.settings.patronNotices.print' })}
        >
          {
            printTemplate && (
              <PatronNoticePrintSection
                notice={notice}
                locale={locale}
                printTemplate={printTemplate}
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
