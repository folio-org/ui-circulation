import { Button, Pane, MenuSection, MultiColumnList, Checkbox } from '@folio/stripes/components';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

const visibleColumns = ['id', 'name', 'updatedAt'];
const columnMapping = {
  id: '',
  name: <FormattedMessage id="ui-circulation.settings.patronNoticePrintJobs.name" />,
  updatedAt: <FormattedMessage id="ui-circulation.settings.patronNoticePrintJobs.updated" />,
};

export const generateFormatter = (markPrintJobForDeletion) => {
  return {
    id: (item) => <Checkbox checked={item.selected} onClick={() => markPrintJobForDeletion(item)} />,
    name: (item) => item.name,
    updatedAt: (item) => item.updatedAt,
  };
};

const PatronNoticePrintJobs = () => {
  // TODO fetch this data from the server
  const [contentData, setContentData] = useState([
    { id: 1, name: 'reminder_print_2023-07-14_0800', updatedAt: '07/14/2023' },
    { id: 2, name: 'reminder_print_2023-07-20_0800', updatedAt: '07/20/2023' },
    { id: 3, name: 'reminder_print_2023-07-27_0800', updatedAt: '07/27/2023' }
  ]);

  const markPrintJobForDeletion = (item) => {
    const clonedData = structuredClone(contentData);
    const index = clonedData.findIndex(el => el.id === item.id);
    clonedData[index] = { ...item, selected: !item.selected };
    setContentData(clonedData);
  };

  const formatter = generateFormatter(markPrintJobForDeletion);

  const actionMenu = ({ onToggle }) => {
    const removeSelectedPrintJobs = () => {
      // TODO: handle removing printing jobs
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
      />
    </Pane>
  );
};

export default PatronNoticePrintJobs;
