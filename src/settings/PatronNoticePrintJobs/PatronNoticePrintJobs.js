import { Button, Pane, MenuSection, MultiColumnList, Checkbox, FormattedDate, FormattedTime } from '@folio/stripes/components';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { stripesConnect } from '@folio/stripes/core';

const visibleColumns = ['id', 'sortingField', 'created'];
const columnMapping = {
  id: '',
  sortingField: <FormattedMessage id="ui-circulation.settings.patronNoticePrintJobs.email" />,
  created: <FormattedMessage id="ui-circulation.settings.patronNoticePrintJobs.created" />,
};

export const generateFormatter = (markPrintJobForDeletion, openPDF) => {
  return {
    id: (item) => <Checkbox type="checkbox" checked={item.selected} onChange={() => markPrintJobForDeletion(item)} />,
    sortingField: (item) => <button type="button" onClick={() => openPDF(item)}>{item.sortingField}</button>,
    created: (item) => <><FormattedDate value={item.created} /> <FormattedTime value={item.created} /></>
  };
};

const PatronNoticePrintJobs = (props) => {
  const records = props?.resources?.entries?.records;
  const [contentData, setContentData] = useState([]);

  const markPrintJobForDeletion = (item) => {
    const clonedData = [...contentData];
    const index = clonedData.findIndex(el => el.id === item.id);
    clonedData[index] = { ...item, selected: !item.selected };

    setContentData(clonedData);
  };

  const openPDF = (item) => {
    const { content } = item;
    const bytes = new Uint8Array(content.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  useEffect(() => {
    const updatedRecords = records.map(record => ({
      ...record,
      selected: !!record.selected,
    }));

    setContentData(updatedRecords);
  }, [records]);

  const formatter = generateFormatter(markPrintJobForDeletion, openPDF);

  const actionMenu = ({ onToggle }) => {
    const removeSelectedPrintJobs = () => {
      const filtered = contentData.filter(item => !item.selected);
      setContentData(filtered);
      onToggle();
    };

    return (
      <MenuSection label={<FormattedMessage id="ui-circulation.settings.patronNoticePrintJobs.actions" />}>
        <Button buttonStyle="dropdownItem" onClick={removeSelectedPrintJobs}>
          <FormattedMessage id="ui-circulation.settings.patronNoticePrintJobs.actions.delete" />
        </Button>
      </MenuSection>
    );
  };

  return (
    <Pane
      paneTitle={
        <FormattedMessage id="ui-circulation.settings.index.patronNoticePrintJobs" />
      }
      defaultWidth="fill"
      actionMenu={actionMenu}
    >
      <MultiColumnList
        contentData={contentData}
        formatter={formatter}
        visibleColumns={visibleColumns}
        columnMapping={columnMapping}
        interactive={false}
      />
    </Pane>
  );
};

PatronNoticePrintJobs.manifest = {
  entries: {
    type: 'okapi',
    path: 'print/entries',
    params: {
      query: 'type="BATCH"',
      sortby: 'created/sort.descending'
    },
    records: 'items',
    throwErrors: false,
  },
};


PatronNoticePrintJobs.propTypes = {
  resources: PropTypes.shape({
    entries: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  mutator: PropTypes.shape({
    entries: PropTypes.shape({
      DELETE: PropTypes.func,
    }),
  }).isRequired,

};

export default stripesConnect(PatronNoticePrintJobs);
