import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import {
  Accordion,
  AccordionSet,
  Button,
  Col,
  KeyValue,
  Row
} from '@folio/stripes/components';

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
    };

    this.onToggleSection = this.onToggleSection.bind(this);
  }

  onToggleSection({ id }) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.accordions[id] = !curState.accordions[id];
      return newState;
    });
  }

  render() {
    const notice = this.props.initialValues;
    const emailTemplate = find(notice.localizedTemplates, { 'header': 'email' });
    const smsTemplate = find(notice.localizedTemplates, { 'header': 'sms' });
    const printTemplate = find(notice.localizedTemplates, { 'header': 'print' });

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
                  <Button>Preview</Button>
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
          <Accordion
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
                  <KeyValue label="Body" value={smsTemplate.body}  />
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
          </Accordion>
        </AccordionSet>
      </div>
    );
  }
}

export default PatronNoticeDetail;
