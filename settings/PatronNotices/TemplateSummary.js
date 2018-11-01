import React from 'react';
import { Row, Col } from '@folio/stripes/components';

const TemplateSummary = ({ template }) => {
  return (
    <Row>
      <Col xs={3}>{template.name}</Col>
      <Col xs={3}>{template.active}</Col>
      <Col xs={6}>{template.description}</Col>
    </Row>
  );
};

export default TemplateSummary;
