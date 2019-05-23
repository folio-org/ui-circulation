import React from 'react';
import PropTypes from 'prop-types';
import HtmlToReact, { Parser } from 'html-to-react';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import {
  Accordion,
  AccordionSet,
  Button,
  Col,
  KeyValue,
  Row
} from '@folio/stripes/components';

import tokens from './tokens';
import { PreviewModal } from '../components';
import tokensReducer from '../utils/tokens-reducer';

class PatronNoticeDetail extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
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
        'email-template': true,
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
    const { initialValues: notice } = this.props;
    const {
      accordions,
      openPreview,
    } = this.state;

    const emailTemplate = get(notice, 'localizedTemplates.en.body', '');
    const parsedEmailTemplate = this.parser.parseWithInstructions(emailTemplate, () => true, this.rules);

    const isActiveLabel = notice.active
      ? <FormattedMessage id="ui-circulation.settings.patronNotices.yes" />
      : <FormattedMessage id="ui-circulation.settings.patronNotices.no" />;

    return (
      <React.Fragment>
        <Row>
          <Col xs={12}>
            <div data-test-staff-slip-name>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.name" />}
                value={notice.name}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.active" />}
              value={isActiveLabel}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.description" />}
              value={notice.description}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.category" />}
              value={notice.category}
            />
          </Col>
        </Row>
        <AccordionSet
          accordionStatus={accordions}
          onToggle={this.onToggleSection}
        >
          <Accordion
            id="email-template"
            label={<FormattedMessage id="ui-circulation.settings.patronNotices.email" />}
          >
            { emailTemplate &&
              <React.Fragment>
                <Row>
                  <Col xs={8}>
                    <KeyValue
                      label={<FormattedMessage id="ui-circulation.settings.patronNotices.subject" />}
                      value={notice.localizedTemplates.en.header}
                    />
                  </Col>
                  <Col xs={4}>
                    <Button onClick={this.openPreviewDialog}>
                      <FormattedMessage id="ui-circulation.settings.patronNotices.preview" />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <KeyValue
                      label={<FormattedMessage id="ui-circulation.settings.patronNotices.body" />}
                      value={parsedEmailTemplate}
                    />
                  </Col>
                </Row>
              </React.Fragment>
            }
          </Accordion>
        </AccordionSet>
        <PreviewModal
          open={openPreview}
          header={
            <FormattedMessage
              id="ui-circulation.settings.patronNotices.view.previewHeader"
              values={{ name: notice.name }}
            />
          }
          previewTemplate={emailTemplate}
          previewFormat={tokensReducer(tokens)}
          onClose={this.closePreviewDialog}
        />
      </React.Fragment>
    );
  }
}

export default PatronNoticeDetail;
