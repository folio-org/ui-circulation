import React from 'react';
import {
  Paneset,
  Pane,
  Button,
  Row,
  Col
} from '@folio/stripes-components';

import LoanRulesForm from './RuleEditor/LoanRulesForm';

const CodeEditor = (props) => {
  // static placeholder data...
  const code = `# Setup / this applies to all rules
\tfallback-policy : no-circulation 
\tpriority: t, a, b, c, s, m, g

# All branches
\tm newspaper: policy-c
\tm streaming-subscription: policy-c
\t\tg visitor: in-house
\t\tg undergrad: in-house
\tm book cd dvd + t special-items : in-house

# General rules for main and music branch
\tm newspaper: policy-d
\tt special-items
\t\tg !visitor: policy-d
\t\tg visitor: in-house

# Exceptions across all branches
\tg all + t rare + m all + s all : locked`;

  // this represents a basic schema for what the loneRulesEditor expects...
  const editorProps = {
    // whether or not to show the 'autocomplete' widget (pro mode)
    showAssist: true,
    completionLists: {
      'Campus': ['main'],
      'Patron Groups': ['visitor', 'off-campus', 'on-campus', 'undergrad'],
      'Branch': ['main', 'downtown'],
      'Material Type': ['book', 'cd', 'dvd', 'newspaper', 'streaming-subscription', 'rare'],
      'Loan Type': ['special-items', 'rare'],
      'Shelf': ['periodicals'],
    },
    policies: [ // these will probably include other info about the policy - perhaps a URL or other info about the rule.
      { name: 'policy-a' },
      { name: 'policy-b' },
      { name: 'policy-c' },
      { name: 'policy-d' },
      { name: 'in-house' },
      { name: 'no-circulation' },
      { name: 'locked' },
    ],
    typeMapping: { // these letters are hard-wired atm... but the labels have to correspond with completion lists. 
      'g': 'Patron Groups',
      'a': 'Campus',
      'b': 'Branch',
      'c': 'Collection',
      'm': 'Material Type',
      's': 'Shelf',
      't': 'Loan Type',
    },
    // the editor will place these appropriately.
    // errors: [{ line: 9, message: 'There\'s something amiss on line 9!' },],
  }

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  function onSubmit(values) {
    return sleep(1000) // simulate server latency
    .then(() => {
        throw new SubmissionError({ loanRulesCode: [{ line: 9, message: 'There\'s something amiss on line 9!' }] , _error: 'Ruleset contains errors.' })
    });
  }

  return (
    <Paneset>
      <Pane paneTitle="Code Editor" defaultWidth="50%">
        <LoanRulesForm
          handleSubmit={onSubmit}
          initialValues={{ 'loanRulesCode': code }}
          editorProps={editorProps}
        />
      </Pane>
    </Paneset>
  );
}

export default CodeEditor;