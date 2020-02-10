import PropTypes from 'prop-types';
import { stripesShape } from '@folio/stripes/core';

const formShape = {
  stripes: stripesShape.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  policy: PropTypes.object,
  initialValues: PropTypes.object,
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default formShape;
