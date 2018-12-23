import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { ViewMetaData } from '@folio/stripes/smart-components';
import {
  Col,
  Row,
} from '@folio/stripes/components';

class Metadata extends React.Component {
  static propTypes = {
    connect: PropTypes.func.isRequired,
    metadata: PropTypes.object,
  };

  static defaultProps = {
    metadata: {},
  };

  constructor(props) {
    super(props);

    this.cViewMetaData = props.connect(ViewMetaData);
  }

  render() {
    const { metadata } = this.props;

    if (isEmpty(metadata)) {
      return null;
    }

    return (
      <Row>
        <Col xs={12}>
          <this.cViewMetaData metadata={metadata} />
        </Col>
      </Row>
    );
  }
}

export default Metadata;
