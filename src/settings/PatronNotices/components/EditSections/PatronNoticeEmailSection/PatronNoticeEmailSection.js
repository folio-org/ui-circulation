import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  TextField,
} from '@folio/stripes/components';
import { TemplateEditor } from '@folio/stripes-template-editor';

import getTokens from '../../../tokens';
import TokensList from '../../../TokensList';

const PatronNoticeEmailSection = ({ category, locale }) => {
  const tokens = getTokens(locale);

  return (
    <div data-testid="emailAccordionContent">
      <Row>
        <Col xs={8}>
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
      <Row>
        <Col xs={8}>
          <Field
            data-testid="patronNoticesBody"
            label={<FormattedMessage id="ui-circulation.settings.patronNotices.body" />}
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
  locale: PropTypes.string
};
export default PatronNoticeEmailSection;
