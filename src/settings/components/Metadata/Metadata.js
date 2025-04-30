import React from 'react';
import PropTypes from 'prop-types';
import { isUndefined } from 'lodash';

import { ViewMetaData } from '@folio/stripes/smart-components';
import {
  Col,
  Row,
} from '@folio/stripes/components';

class Metadata extends React.Component {
  static propTypes = {
    connect: PropTypes.func.isRequired,
    metadata: PropTypes.shape({
      createdDate: PropTypes.string,
    }),
    useAccordion: PropTypes.bool,
    noBackGround: PropTypes.bool,
    inlineLayout: PropTypes.bool,
  };

  static defaultProps = {
    metadata: {},
  };

  constructor(props) {
    super(props);

    this.cViewMetaData = props.connect(ViewMetaData);
  }

  render() {
    const { metadata, useAccordion, noBackGround, inlineLayout } = this.props;

    if (isUndefined(metadata) || isUndefined(metadata.createdDate)) {
      return null;
    }

    return (
      <Row data-testid="metadataTestId">
        <Col xs={12}>
          <this.cViewMetaData
            metadata={metadata}
            useAccordion={useAccordion}
            noBackGround={noBackGround}
            inlineLayout={inlineLayout}
          />
        </Col>
      </Row>
    );
  }
}

export default Metadata;
