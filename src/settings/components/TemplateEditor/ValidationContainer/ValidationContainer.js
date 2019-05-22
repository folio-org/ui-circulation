import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from '@folio/stripes/components';

import css from './ValidationContainer.css';

const ValidationContainer = ({ error }) => {
  return (
    <Row>
      <Col
        id="patron-notice-error-container"
        xs={12}
        className={css.errorMessage}
      >
        {error}
      </Col>
    </Row>
  );
};

ValidationContainer.propTypes = {
  error: PropTypes.node.isRequired,
};

export default ValidationContainer;
