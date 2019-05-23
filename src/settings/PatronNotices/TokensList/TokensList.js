import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import { TokensSection } from '../../components';
import { patronNoticeCategoryIds } from '../../../constants';

class TokensList extends React.Component {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    tokens: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  disableSection = (allowedCategories = []) => {
    const { selectedCategory } = this.props;

    return !allowedCategories.includes(selectedCategory);
  };

  render() {
    const {
      tokens,
      onSelect,
    } = this.props;

    return (
      <Row>
        <Col xs={4}>
          <TokensSection
            header={<FormattedMessage id="ui-circulation.settings.patronNotices.itemTokenHeader" />}
            tokens={Object.keys(tokens.item)}
            onSelect={onSelect}
          />
        </Col>
        <Col xs={4}>
          <Row>
            <Col xs={12}>
              <TokensSection
                disabled={this.disableSection([patronNoticeCategoryIds.LOAN, patronNoticeCategoryIds.REQUEST])}
                header={<FormattedMessage id="ui-circulation.settings.patronNotices.loanTokenHeader" />}
                tokens={Object.keys(tokens.loan)}
                onSelect={onSelect}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={4}>
          <Row>
            <Col xs={12}>
              <TokensSection
                disabled={this.disableSection([patronNoticeCategoryIds.REQUEST])}
                header={<FormattedMessage id="ui-circulation.settings.patronNotices.requestTokenHeader" />}
                tokens={Object.keys(tokens.request)}
                onSelect={onSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                header={<FormattedMessage id="ui-circulation.settings.patronNotices.userTokenHeader" />}
                tokens={Object.keys(tokens.user)}
                onSelect={onSelect}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  const patronNotice = getFormValues('patronNoticeForm')(state);

  return { selectedCategory: patronNotice.category };
};

export default connect(mapStateToProps)(TokensList);
