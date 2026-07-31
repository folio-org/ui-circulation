import React from 'react';
import PropTypes from 'prop-types';
import { Field, useField } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Col,
  Row,
  TextField,
  Select,
  InfoPopover,
} from '@folio/stripes/components';
import { TemplateEditor } from '@folio/stripes-template-editor';

import getTokens from '../../../tokens';
import TokensList from '../../../TokensList';
import { isSubjectEnabled } from '../../../utils';
import { NOTICE_FORMATS } from '../../../../../constants';

const PatronNoticeEmailSection = ({
  category,
  locale,
  initialValues,
}) => {
  const intl = useIntl();
  const { input: noticeFormatInput } = useField('additionalProperties.noticeFormat');
  const { input: subjectInput } = useField('localizedTemplates.en.header');
  const { input: bodyInput } = useField('localizedTemplates.en.body');

  const isTemplateDisabled = !noticeFormatInput.value;
  const isTextMessageNotice = noticeFormatInput.value === NOTICE_FORMATS.TEXT_MESSAGE;
  const isSubjectDisabled = !isSubjectEnabled(noticeFormatInput.value);

  const tokens = getTokens(locale, { disableImages: isTextMessageNotice });

  const noticeFormatOptions = [
    {
      value: '',
      label: intl.formatMessage({ id: 'ui-circulation.settings.patronNotices.selectNoticeFormat' }),
    },
    {
      value: NOTICE_FORMATS.EMAIL,
      label: intl.formatMessage({ id: 'ui-circulation.settings.patronNotices.email' }),
    },
    {
      value: NOTICE_FORMATS.PRINT,
      label: intl.formatMessage({ id: 'ui-circulation.settings.patronNotices.printOnly' }),
    },
    {
      value: NOTICE_FORMATS.TEXT_MESSAGE,
      label: intl.formatMessage({ id: 'ui-circulation.settings.patronNotices.textMessage' }),
    },
  ];

  const handleNoticeFormatChange = (e) => {
    noticeFormatInput.onChange(e);

    if (e.target.value === NOTICE_FORMATS.EMAIL) {
      subjectInput.onChange(initialValues.localizedTemplates.en.header);
      bodyInput.onChange(initialValues.localizedTemplates.en.body);
    } else {
      subjectInput.onChange('');
      bodyInput.onChange('');
    }
  };

  return (
    <div data-testid="patronNoticeAccordion">
      <Row>
        <Col xs={12}>
          <Field
            data-testid="noticeFormat"
            required
            id="patron-notice-format"
            component={Select}
            label={(
              <>
                <FormattedMessage id="ui-circulation.settings.patronNotices.noticeFormat" />
                <InfoPopover
                  content={<FormattedMessage id="ui-circulation.settings.patronNotices.noticeFormat.infoPopover" />}
                />
              </>
            )}
            name="additionalProperties.noticeFormat"
            validateFields={[]}
            onChange={handleNoticeFormatChange}
            dataOptions={noticeFormatOptions}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Field
            name="localizedTemplates.en.header"
            validateFields={[]}
            data-testid="patronNoticesSubject"
          >
            {({ input, meta }) => (
              <TextField
                {...input}
                data-testid="patronNoticesSubject"
                id="input-patron-notice-subject"
                label={(
                  <>
                    <FormattedMessage id="ui-circulation.settings.patronNotices.subject" />
                    <InfoPopover
                      content={<FormattedMessage id="ui-circulation.settings.patronNotices.subject.infoPopover" />}
                    />
                  </>
                )}
                meta={{
                  ...meta,
                  dirty: isSubjectDisabled ? false : meta.dirty,
                }}
                required={!isSubjectDisabled}
                disabled={isSubjectDisabled}
              />
            )}
          </Field>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Field
            data-testid="patronNoticesBody"
            label={(
              <>
                <strong><FormattedMessage id="ui-circulation.settings.patronNotices.body" /></strong>
                <InfoPopover
                  content={<FormattedMessage id="ui-circulation.settings.patronNotices.body.infoPopover" />}
                />
              </>
            )}
            name="localizedTemplates.en.body"
            id="input-email-template-body"
            component={TemplateEditor}
            tokens={tokens}
            tokensList={TokensList}
            previewModalHeader={<FormattedMessage id="ui-circulation.settings.patronNotices.form.previewHeader" />}
            selectedCategory={category}
            validateFields={[]}
            plainText={isTextMessageNotice}
            rows={6}
            required={!isTemplateDisabled}
            disabled={isTemplateDisabled}
          />
        </Col>
      </Row>
    </div>
  );
};
PatronNoticeEmailSection.propTypes = {
  initialValues: PropTypes.object.isRequired,
  category: PropTypes.string,
  locale: PropTypes.string,
};
export default PatronNoticeEmailSection;
