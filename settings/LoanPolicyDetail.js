import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Icon from '@folio/stripes-components/lib/Icon';
import Layer from '@folio/stripes-components/lib/Layer';

class LoanPolicyDetail extends React.Component {

  static propTypes = {
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      connect: PropTypes.func.isRequired,
      locale: PropTypes.string.isRequired,
      logger: PropTypes.shape({
        log: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    paneWidth: PropTypes.string.isRequired,
    resources: PropTypes.shape({

    }),
    mutator: PropTypes.shape({

    }),
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func,
    okapi: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
    loanPolicy: PropTypes.object,
  };

  static manifest = Object.freeze({

  });

  constructor(props) {
    super(props);
    this.state = {};

    this.onClickEdit = this.onClickEdit.bind(this);
  }

  onClickEdit() {

  }

  render() {
    const { loanPolicy } = this.props;
    const detailMenu = (
      <PaneMenu>
        <button id="clickable-edituser" onClick={this.onClickEdit} title="Edit Loan Policy"><Icon icon="edit" />Edit</button>
      </PaneMenu>
    );

    return (
      <Pane defaultWidth={this.props.paneWidth} paneTitle="Loan Policy Details" lastMenu={detailMenu} dismissible onClose={this.props.onClose}>
        <Row>
          <Col xs={7} >
            <Row>
              <Col xs={12}>
                <KeyValue label="Name" value={_.get(loanPolicy, ['name'], '')} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Pane>
    );
  }
}

export default LoanPolicyDetail;
