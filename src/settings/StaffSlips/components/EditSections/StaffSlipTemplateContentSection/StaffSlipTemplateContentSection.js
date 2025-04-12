import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
} from 'react-intl';
import { useFormState, Field } from 'react-final-form';

import {
  Col,
  Row,
} from '@folio/stripes/components';
import { TemplateEditor } from '@folio/stripes-template-editor';

import TokensList from '../../../TokensList';
import getTokens from '../../../tokens';

const StaffSlipTemplateContentSection = ({ intl }) => {
  const { values } = useFormState();
  const {
    formatMessage,
    locale,
  } = intl;
  const tokens = getTokens(locale);

  return (
    <Row>
      <Col xs={12}>
        <Field
          label={formatMessage({ id:'ui-circulation.settings.staffSlips.display' })}
          component={TemplateEditor}
          tokens={tokens}
          name="template"
          previewModalHeader={formatMessage({ id:'ui-circulation.settings.staffSlips.form.previewLabel' })}
          tokensList={TokensList}
          printable
          editAsHtml={!!values.isRawHtml}
        />
      </Col>
    </Row>
  );
};

StaffSlipTemplateContentSection.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(StaffSlipTemplateContentSection);
