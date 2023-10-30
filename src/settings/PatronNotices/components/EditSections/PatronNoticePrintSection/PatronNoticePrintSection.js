import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
} from '@folio/stripes/components';
import { TemplateEditor } from '@folio/stripes-template-editor';

import getTokens from '../../../tokens';
import TokensList from '../../../TokensList';

const PatronNoticePrintSection = ({ category, locale }) => {
  const tokens = getTokens(locale);

  return (
    <div data-testid="printAccordionContent">
      <Row>
        <Col xs={12}>
          <Field
            data-testid="patronNoticesBody"
            label={<FormattedMessage id="ui-circulation.settings.patronNotices.body" />}
            required
            name="localizedTemplates.en.body"
            id="input-print-template-body"
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
PatronNoticePrintSection.propTypes = {
  category: PropTypes.string,
  locale: PropTypes.string
};
export default PatronNoticePrintSection;
