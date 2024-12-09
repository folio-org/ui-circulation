import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  TextField,
  Checkbox
} from '@folio/stripes/components';
import { TemplateEditor } from '@folio/stripes-template-editor';

import getTokens from '../../../tokens';
import TokensList from '../../../TokensList';

const PatronNoticeEmailSection = ({ template, category, locale, printOnly }) => {
  const tokens = getTokens(locale);

  console.log('PatronNoticeEmailSection template ', template, template?.en?.body);

  return (
    <div data-testid="emailAccordionContent">
      <Row>
        <Col xs={12}>
          <Field
            data-testid="patronNoticesPrintOnly"
            id="input-patron-notice-printOnly"
            component={Checkbox}
            label={<FormattedMessage id="ui-circulation.settings.patronNotices.printOnly" />}
            name="additionalProperties.printOnly"
            type="checkbox"
          />
        </Col>
      </Row>
      <br />
      {
        !printOnly &&
        <Row>
          <Col xs={12}>
            <Field
              data-testid="patronNoticesSubject"
              id="input-patron-notice-subject"
              component={TextField}
              required
              label={<FormattedMessage id="ui-circulation.settings.patronNotices.subject" />}
              name="localizedTemplates.en.header"
            />
          </Col>
        </Row>
      }
      <Row>
        <Col xs={12}>
          <Field
            data-testid="patronNoticesBody"
            label={<strong><FormattedMessage id="ui-circulation.settings.patronNotices.body" /></strong>}
            required
            name="localizedTemplates.en.body"
            id="input-email-template-body"
            component={TemplateEditor}
            tokens={tokens}
            tokensList={TokensList}
            previewModalHeader={<FormattedMessage id="ui-circulation.settings.patronNotices.form.previewHeader" />}
            selectedCategory={category}
          />
        </Col>
      </Row>
    </div>
  );
};
PatronNoticeEmailSection.propTypes = {
  category: PropTypes.string,
  locale: PropTypes.string,
  printOnly: PropTypes.bool,
  template: PropTypes.object,
};
export default PatronNoticeEmailSection;
