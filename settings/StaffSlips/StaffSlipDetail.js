import { cloneDeep } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

class StaffSlipDetail extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
    initialValues: PropTypes.object,
  };

  constructor(props) {
    super();
  }

  translate(id) {
    return this.props.stripes.intl.formatMessage({
      id: `ui-circulation.settings.staffSlips.${id}`
    });
  }

  render() {
    const staffSlip = this.props.initialValues;

    return (
      <div>
        <Row>
          <Col xs={8}>
            <KeyValue label={this.translate('name')} value={staffSlip.name} />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <KeyValue label={this.translate('description')} value={staffSlip.description} />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <KeyValue label={this.translate('display')} value={staffSlip.display} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default StaffSlipDetail;
