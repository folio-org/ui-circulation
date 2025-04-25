import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';
import { get } from 'lodash';

import {
  Accordion,
  AccordionSet,
  AccordionStatus,
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
      <AccordionStatus>
        <Row end="xs">
          <Col data-test-expand-all>
            <ExpandAllButton />
          </Col>
        </Row>
        <AccordionSet>
          <Accordion
            label={formatMessage({ id:'ui-circulation.settings.patronNotices.generalInformation' })}
          >
            <AccordionSet>
              <Metadata
                connect={connect}
                metadata={notice.metadata}
              />
            </AccordionSet>
            <PatronNoticeAboutSection notice={notice} />
          </Accordion>
          <Accordion
            label={formatMessage({ id: 'ui-circulation.settings.patronNotices.emailOrPrint' })}
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
      </AccordionStatus>
    </div>
  );
};

PatronNoticeDetail.propTypes = {
  initialValues: PropTypes.shape({
    localizedTemplates: PropTypes.shape({
      en: PropTypes.shape({
        body: PropTypes.string,
      }),
    }),
    metadata: PropTypes.shape({
      createdDate: PropTypes.string,
    }),
  }).isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
  }).isRequired,
  stripes: stripesShape.isRequired,
};

export default injectIntl(PatronNoticeDetail);
