import React from 'react';
import PropTypes from 'prop-types';
import HtmlToReact, { Parser } from 'html-to-react';
import { injectIntl } from 'react-intl';
import { get } from 'lodash';

import {
  Accordion,
  AccordionSet,
  Button,
  Col,
  KeyValue,
  Row
} from '@folio/stripes/components';
import { PreviewModal, tokensReducer } from '@folio/stripes-template-editor';

import { Metadata } from '../components';
import getTokens from './tokens';

class PatronNoticeDetail extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
    this.parser = new Parser();

    this.rules = [
      {
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode,
      }
    ];

    this.state = {
      accordions: {
        'email-template-detail': true,
      },
      openPreview: false,
    };
  }

  openPreviewDialog = () => {
    this.setState({ openPreview: true });
  };

  closePreviewDialog = () => {
    this.setState({ openPreview: false });
  }

  onToggleSection = ({ id }) => {
    this.setState((curState) => {
      const accordions = { ...curState.accordions };
      accordions[id] = !accordions[id];
      return { accordions };
    });
  }

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
      openPreview,
    } = this.state;

    const tokens = getTokens(locale);

    const emailTemplate = get(notice, 'localizedTemplates.en.body', '');
    const parsedEmailTemplate = this.parser.parseWithInstructions(emailTemplate, () => true, this.rules);

    const isActiveLabel = notice.active
      ? formatMessage({ id: 'ui-circulation.settings.patronNotices.yes' })
      : formatMessage({ id: 'ui-circulation.settings.patronNotices.no' });

    return (
      <>
        <AccordionSet
          accordionStatus={accordions}
          onToggle={this.onToggleSection}
        >
          <Accordion
            id="general-information"
            label={formatMessage({ id:'ui-circulation.settings.staffSlips.generalInformation' })}
          >
            <Metadata
              connect={connect}
              metadata={notice.metadata}
            />
            <Row>
              <Col xs={12}>
                <div data-test-staff-slip-name>
                  <KeyValue
                    label={formatMessage({ id: 'ui-circulation.settings.patronNotices.notice.name' })}
                    value={notice.name}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={formatMessage({ id: 'ui-circulation.settings.patronNotices.notice.active' })}
                  value={isActiveLabel}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={formatMessage({ id: 'ui-circulation.settings.patronNotices.notice.description' })}
                  value={notice.description}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={formatMessage({ id: 'ui-circulation.settings.patronNotices.notice.category' })}
                  value={notice.category}
                />
              </Col>
            </Row>
          </Accordion>
          <Accordion
            id="email-template-detail"
            label={formatMessage({ id: 'ui-circulation.settings.patronNotices.email' })}
          >
            { emailTemplate &&
              <div data-testid="emailAccordionContent">
                <Row>
                  <Col xs={8}>
                    <KeyValue
                      label={formatMessage({ id: 'ui-circulation.settings.patronNotices.subject' })}
                      value={notice.localizedTemplates.en.header}
                    />
                  </Col>
                  <Col
                    data-testid="previewButtonColumn"
                    xs={4}
                  >
                    <Button onClick={this.openPreviewDialog}>
                      {formatMessage({ id: 'ui-circulation.settings.patronNotices.preview' })}
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <KeyValue
                      label={formatMessage({ id: 'ui-circulation.settings.patronNotices.body' })}
                      value={parsedEmailTemplate}
                    />
                  </Col>
                </Row>
              </div>}
          </Accordion>
        </AccordionSet>
        <PreviewModal
          open={openPreview}
          header={
            formatMessage({
              id: 'ui-circulation.settings.patronNotices.view.previewHeader',
            }, { name: notice.name })
          }
          previewTemplate={emailTemplate}
          previewFormat={tokensReducer(tokens)}
          onClose={this.closePreviewDialog}
        />
      </>
    );
  }
}

export default injectIntl(PatronNoticeDetail);
