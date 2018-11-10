import React from 'react';
import PropTypes from 'prop-types';

import {
  Accordion,
  AccordionSet,
  Button,
  Col,
  KeyValue,
  Row
} from '@folio/stripes/components';

class PatronNoticeDetail extends React.Component {

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
    return (
      <div>
        <Row>
          <KeyValue label="Name" value="" />
        </Row>
        <Row>
          <KeyValue label="Active" value="" />
        </Row>
        <Row>
          <KeyValue label="Description" value="" />
        </Row>
        <Row>
          <KeyValue label="Category" value="" />
        </Row>
        <AccordionSet accordionStatus={this.state.accordions} onToggle={this.onToggleSection}>
          <Accordion
            id="email-template"
            label="Email"
          >
            <Row>
              <Button>Preview</Button>
            </Row>
            <Row>
              <KeyValue label="Subject" value="" />
            </Row>
            <Row>
              <KeyValue label="Body" value="" />
            </Row>
          </Accordion>
          <Accordion
            id="sms-template"
            label="SMS"
          >
            <Row>
              <Button>Preview</Button>
            </Row>
            <Row>
              <KeyValue label="Subject" value="" />
            </Row>
            <Row>
              <KeyValue label="Body" value="" />
            </Row>
          </Accordion>
          <Accordion
            id="print-template"
            label="Print"
          >
            <Row>
              <Button>Preview</Button>
            </Row>
            <Row>
              <KeyValue label="Subject" value="" />
            </Row>
            <Row>
              <KeyValue label="Body" value="" />
            </Row>
          </Accordion>
        </AccordionSet>
      </div>
    );
  }
}

export default PatronNoticeDetail;
