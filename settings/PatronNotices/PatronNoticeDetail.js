import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import HtmlToReact, { Parser } from 'html-to-react';

import {
  Accordion,
  AccordionSet,
  Button,
  KeyValue,
  Row
} from '@folio/stripes/components';

import formats from './formats';
import PreviewModal from './PreviewModal';

class PatronNoticeDetail extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
    initialValues: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      accordions: {
        'email-template': true,
        // 'sms-template': true,
        // 'print-template': true,
      },
      openDialog: false,
    };

    this.openPreviewDialog = this.openPreviewDialog.bind(this);
    this.closePreviewDialog = this.closePreviewDialog.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);

    const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

    this.previewFormat = formats[props.initialValues.name];
    this.rules = [
      {
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode,
      }
    ];
    this.parser = new Parser();
  }

  openPreviewDialog() {
    this.setState({ openDialog: true });
  }

  closePreviewDialog() {
    this.setState({ openDialog: false });
  }

  onToggleSection({ id }) {
    this.setState((curState) => {
      const newState = cloneDeep(curState);
      newState.accordions[id] = !curState.accordions[id];
      return newState;
    });
  }

  render() {
    const notice = this.props.initialValues;
    const emailTemplate = notice.localizedTemplates.en.body;
    const parsedEmailTemplate = this.parser.parseWithInstructions(emailTemplate, () => true, this.rules);
    // const smsTemplate = notice.localizedTemplates.sms;
    // const printTemplate = notice.localizedTemplates.print;

    let isActiveLabel;
    if (notice.active) {
      isActiveLabel = <FormattedMessage id="ui-circulation.settings.patronNotices.yes" />;
    } else {
      isActiveLabel = <FormattedMessage id="ui-circulation.settings.patronNotices.no" />;
    }

    return (
      <div>
        <Row>
          <KeyValue label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.name" />} value={notice.name} />
        </Row>
        <Row>
          <KeyValue label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.active" />} value={isActiveLabel} />
        </Row>
        <Row>
          <KeyValue label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.description" />} value={notice.description} />
        </Row>
        <Row>
          <KeyValue label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.category" />} value={notice.category} />
        </Row>
        <AccordionSet accordionStatus={this.state.accordions} onToggle={this.onToggleSection}>
          <Accordion
            id="email-template"
            label={<FormattedMessage id="ui-circulation.settings.patronNotices.email" />}
          >
            { emailTemplate &&
              <div>
                <Row>
                  <Button onClick={this.openPreviewDialog}><FormattedMessage id="ui-circulation.settings.patronNotices.preview" /></Button>
                </Row>
                <Row>
                  <KeyValue label={<FormattedMessage id="ui-circulation.settings.patronNotices.subject" />} value={notice.subject} />
                </Row>
                <Row>
                  <KeyValue label={<FormattedMessage id="ui-circulation.settings.patronNotices.body" />} value={parsedEmailTemplate} />
                </Row>
              </div>
            }
          </Accordion>
          {/* <Accordion
            id="sms-template"
            label="SMS"
          >
            { smsTemplate &&
              <div>
                <Row>
                  <Button>Preview</Button>
                </Row>
                <Row>
                  <KeyValue label="Subject" value={notice.subject} />
                </Row>
                <Row>
                  <KeyValue label="Body" value={smsTemplate.body} />
                </Row>
              </div>
            }
          </Accordion>
          <Accordion
            id="print-template"
            label="Print"
          >
            { printTemplate &&
              <div>
                <Row>
                  <Button>Preview</Button>
                </Row>
                <Row>
                  <KeyValue label="Subject" value={notice.subject} />
                </Row>
                <Row>
                  <KeyValue label="Body" value={printTemplate.body} />
                </Row>
              </div>
            }
          </Accordion> */}
        </AccordionSet>
        { this.state.openDialog &&
          <PreviewModal
            previewTemplate={emailTemplate}
            open={this.state.openDialog}
            onClose={this.closePreviewDialog}
            slipType="Any"
          />
        }
      </div>
    );
  }
}

export default PatronNoticeDetail;
