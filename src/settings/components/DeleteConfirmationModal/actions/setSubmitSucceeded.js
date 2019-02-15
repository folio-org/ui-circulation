export default (formName) => ({
  type: '@@redux-form/SET_SUBMIT_SUCCEEDED',
  meta: {
    form: formName,
    fields: []
  },
  error: false,
});
