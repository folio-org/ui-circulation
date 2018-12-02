import React from 'react';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';

import {
  Accordion,
  AccordionSet,
  Button,
  KeyValue,
  Row
} from '@folio/stripes/components';

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
        'sms-template': true,
        'print-template': true,
      },
      openDialog: false,
    };

    this.openPreviewDialog = this.openPreviewDialog.bind(this);
    this.closePreviewDialog = this.closePreviewDialog.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
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
    const emailTemplate = notice.localizedTemplates.en;
    // const smsTemplate = notice.localizedTemplates.sms;
    // const printTemplate = notice.localizedTemplates.print;

    return (
      <div>
        <Row>
          <KeyValue label="Name" value={notice.name} />
        </Row>
        <Row>
          <KeyValue label="Active" value={notice.active ? 'Yes' : 'No'} />
        </Row>
        <Row>
          <KeyValue label="Description" value={notice.description} />
        </Row>
        <Row>
          <KeyValue label="Category" value={notice.category} />
        </Row>
        <AccordionSet accordionStatus={this.state.accordions} onToggle={this.onToggleSection}>
          <Accordion
            id="email-template"
            label="Email"
          >
            { emailTemplate &&
              <div>
                <Row>
                  <Button onClick={this.openPreviewDialog}>Preview</Button>
                </Row>
                <Row>
                  <KeyValue label="Subject" value={notice.subject} />
                </Row>
                <Row>
                  <KeyValue label="Body" value={emailTemplate.body} />
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
            previewTemplate={emailTemplate.body}
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
