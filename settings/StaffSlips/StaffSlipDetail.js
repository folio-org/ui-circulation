import React from 'react';
import PropTypes from 'prop-types';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import StaffSlipEditor from './StaffSlipEditor';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

class StaffSlipDetail extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
    initialValues: PropTypes.object,
  };

  translate(id) {
    return this.props.stripes.intl.formatMessage({
      id: `ui-circulation.settings.staffSlips.${id}`
    });
  }

  render() {
    const staffSlip = this.props.initialValues;
    const templateValue = { value: staffSlip.template};
    const modulesConfig = {
        toolbar: false,
    };

    return (
      <div>
        <Row>
          <Col xs={8}>
            <KeyValue label={this.translate('name')} value={staffSlip.name} />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <KeyValue label={this.translate('active')} value={staffSlip.active ? this.translate('yes') : this.translate('no') } />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <KeyValue label={this.translate('description')} value={staffSlip.description} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <StaffSlipEditor input={templateValue} label={this.translate('display')} modules={modulesConfig} readOnly />
          </Col>
        </Row>
      </div>
    );
  }
}

export default StaffSlipDetail;
