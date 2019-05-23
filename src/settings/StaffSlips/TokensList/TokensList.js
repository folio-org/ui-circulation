import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import { TokensSection } from '../../components';

class TokensList extends React.Component {
  static propTypes = {
    slipType: PropTypes.string.isRequired,
    tokens: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  render() {
    const {
      slipType,
      tokens,
      onSelect,
    } = this.props;

    return (
      <Row>
        <Col xs={12}>
          <TokensSection
            tokens={Object.keys(tokens[slipType])}
            onSelect={onSelect}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  const staffSlip = getFormValues('staffSlipForm')(state);

  return {
    slipType: staffSlip.name,
  };
};

export default connect(mapStateToProps)(TokensList);
