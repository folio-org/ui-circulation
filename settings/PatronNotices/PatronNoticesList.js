import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@folio/stripes-components/lib/Button';
import { makeQueryFunction } from '@folio/stripes/smart-components';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import { SegmentedControl } from '@folio/stripes/components';

import PatronNoticesGeneralConfig from './PatronNoticesGeneralConfig';
import TemplateSummary from './TemplateSummary';

class PatronNotices extends React.Component {
  static manifest = Object.freeze({
    addressTypes: {
      type: 'okapi',
      path: 'addresstypes',
      records: 'addressTypes',
    },
    patronNoticeTemplates: {
      type: 'okapi',
      path: 'template',
      records: 'templates',
      // GET: {
      //   params: {
      //     query: makeQueryFunction(
      //       'cql.allRecords=1',
      //       '',
      //     //  '(requester.barcode="${query.query}" or item.title="${query.query}" or title="${query.query}")',
      //       {},
      //     //  filterConfig,
      //     )
      //   },
      //   staticFallback: { params: {} },
      // },
      // resourceShouldRefresh: true,
    },
  });

  static propTypes = {
    resources: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'active',
    };

    this.handleActivate = this.handleActivate.bind(this);
  }

  handleActivate({ id }) {
    this.setState({
      activeTab: id,
    });
  }

  parseTemplates(templates) {
    return templates.map((template) => {
      const content = template.localizedTemplates[0].template;
      let [active, ...formats] = content.split('!!!!!!!!!!');
      formats = formats.map((format) => {
        let [type, value] = format.split(':');
        return { type, value };
      });

      return {
        name: 'Test',
        description: template.description,
        active,
        formats
      };
    });
  }

  render() {
    console.log("records", this.props.resources.patronNoticeTemplates)
    let parsedTemplates;
    let templateList;
    if (this.props.resources.patronNoticeTemplates && this.props.resources.patronNoticeTemplates.hasLoaded) {
      parsedTemplates = this.parseTemplates(this.props.resources.patronNoticeTemplates.records);
      console.log("parsed Templates", parsedTemplates)
      console.log("state", this.state.activeTab)
      templateList = parsedTemplates.filter(t => t.active === this.state.activeTab).map(t => <TemplateSummary template={t} />);
    }
    console.log("templateList", templateList)

    return (
      <Pane
        defaultWidth="fill"
        paneTitle="Patron notices"
        lastMenu={<PaneMenu><Button buttonStyle="primary paneHeaderNewButton">+ New</Button></PaneMenu>}
      >
        <Link to="patron-notices/general">General configuration</Link>
        <br/>
        <SegmentedControl activeId={this.state.activeTab} onActivate={this.handleActivate}>
          <Button id="active">Active</Button>
          <Button id="inactive">Inactive</Button>
        </SegmentedControl>
        {templateList}
      </Pane>
    );
  }
}

export default PatronNotices;
