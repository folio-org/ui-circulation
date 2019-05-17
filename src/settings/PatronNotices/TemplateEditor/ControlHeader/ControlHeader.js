import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  Row,
} from '@folio/stripes/components';

import css from './ControlHeader.css';

const ControlHeader = ({ label, onPreviewClick }) => {
  return (
    <Row bottom="xs">
      <Col xs={9}>
        <label
          htmlFor="editor"
          className={css.label}
        >
          {label}
        </label>
      </Col>
      <Col xs={3}>
        <Row className={css.preview}>
          <Col>
            <Button
              bottomMargin0
              onClick={onPreviewClick}
            >
              <FormattedMessage id="ui-circulation.settings.patronNotices.preview" />
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

ControlHeader.propTypes = {
  label: PropTypes.node.isRequired,
  onPreviewClick: PropTypes.func.isRequired,
};

export default ControlHeader;
