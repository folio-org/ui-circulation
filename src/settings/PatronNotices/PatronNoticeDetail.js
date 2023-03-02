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

import { Metadata } from '../components';
import {
  PatronNoticeAboutSection,
  PatronNoticeEmailSection,
} from './components/ViewSections';

class PatronNoticeDetail extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      accordions: {
        generalInformation: true,
        emailTemplateDetail: true,
      },
    };
  }

  handleSectionToggle = ({ id }) => {
    this.setState(({ accordions }) => {
      accordions[id] = !accordions[id];

      return { accordions };
    });
  };

  handleExpandAll = (accordions) => {
    this.setState({ accordions });
  };

  render() {
    const {
      initialValues: notice,
      intl: {
        formatMessage,
        locale,
      },
      stripes: {
        connect,
      }
    } = this.props;
    const {
      accordions,
    } = this.state;
    const emailTemplate = get(notice, 'localizedTemplates.en.body', '');

    return (
      <div data-test-patron-notice-details>
        <Row end="xs">
          <Col data-test-expand-all>
            <ExpandAllButton
              accordionStatus={accordions}
              onToggle={this.handleExpandAll}
            />
          </Col>
        </Row>
        <AccordionSet>
          <Accordion
            id="generalInformation"
            label={formatMessage({ id:'ui-circulation.settings.patronNotices.generalInformation' })}
            open={accordions.generalInformation}
            onToggle={this.handleSectionToggle}
          >
            <Metadata
              connect={connect}
              metadata={notice.metadata}
            />
            <PatronNoticeAboutSection notice={notice} />
          </Accordion>
          <Accordion
            id="emailTemplateDetail"
            label={formatMessage({ id: 'ui-circulation.settings.patronNotices.email' })}
            open={accordions.emailTemplateDetail}
            onToggle={this.handleSectionToggle}
          >
            { emailTemplate &&
              <PatronNoticeEmailSection
                notice={notice}
                locale={locale}
                emailTemplate={emailTemplate}
              />
            }
          </Accordion>
        </AccordionSet>
      </div>
    );
  }
}

export default injectIntl(PatronNoticeDetail);
