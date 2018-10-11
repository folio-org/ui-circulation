import React from 'react';
import PropTypes from 'prop-types';

import stripesForm from '@folio/stripes-form';


class PatronNoticesConfigForm extends React.Component {

}


export default stripesForm({
  form: 'patronNoticesConfigForm',
  navigationCheck: true,
  enableReinitialize: true,
})(PatronNoticesConfigForm);
