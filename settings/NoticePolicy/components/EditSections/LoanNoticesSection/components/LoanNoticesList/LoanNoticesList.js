import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, FieldArray } from 'redux-form';

import {
  Button,
  Col,
  Row,
  IconButton,
  Select,
} from '@folio/stripes/components';

import css from './LoanNoticesList.css';

class LoanNoticesList extends React.Component {
  renderLoanNotice = ({ fields }) => {
    return (
      <React.Fragment>
        {fields.map((loanNotice, index) => {
          return (
            <div key={index} className={css.loanNotice}>
              <Row className={css.header}>
                <Col xs={3} className={css.headerTitle}>
                  <FormattedMessage
                    id="ui-circulation.settings.noticePolicy.countableNotice"
                    values={{ counter: index + 1 }}
                  />
                </Col>
                <Col xs={1} xsOffset={8} className={css.headerIcon}>
                  <IconButton
                    icon="trash"
                    onClick={() => fields.remove(index)}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={4} className={css.noticeField}>
                  <Field
                    name="template"
                    label={<FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices.template" />}
                    component={Select}
                  >
                    <option value="value">Label</option>
                  </Field>
                </Col>
                <Col xs={4} className={css.noticeField}>
                  <Field
                    name="format"
                    label={<FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices.format" />}
                    component={Select}
                  >
                    <option value="value">Label</option>
                  </Field>
                </Col>
                <Col xs={4} className={css.noticeField}>
                  <Field
                    name="frequency"
                    label={<FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices.frequency" />}
                    component={Select}
                  >
                    <option value="value">Label</option>
                  </Field>
                </Col>
              </Row>
            </div>
          );
        })}
        <Row start="xs">
          <Col xs={1}>
            <Button
              type="button"
              buttonStyle="default"
              onClick={() => fields.push({})}
            >
              <FormattedMessage id="ui-circulation.settings.noticePolicy.addNotice" />
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  render() {
    return <FieldArray name="loanNotices" component={this.renderLoanNotice} />;
  }
}

export default LoanNoticesList;
