import React from 'react';

jest.mock('@folio/stripes/components', () => ({
  Accordion: jest.fn(({ children, label, ...rest }) => (
    <section {...rest}>
      <div>{label}</div>
      {children}
    </section>
  )),
  AccordionSet: jest.fn(({ children, ...rest }) => (
    <div {...rest}>
      {children}
    </div>
  )),
  AccordionStatus: jest.fn(({ children }) => (
    <div>
      {children}
    </div>
  )),
  Badge: jest.fn((props) => (
    <span>
      <span>{props.children}</span>
    </span>
  )),
  Button: jest.fn(({
    children,
    onClick,
    ...props
  }) => (
    <button
      onClick={onClick}
      data-test-button
      type="button"
      {...props}
    >
      <span>
        {children}
      </span>
    </button>
  )),
  Callout: jest.fn(() => <div />),
  Checkbox: jest.fn(() => <input type="checkbox" />),
  Col: jest.fn(({ children, ...rest }) => <div {...rest}>{children}</div>),
  ConfirmationModal: jest.fn(({
    heading,
    message,
    onCancel,
    onConfirm,
    confirmLabel,
    cancelLabel,
    ...rest
  }) => (
    <div {...rest}>
      <span>{heading}</span>
      <span>{message}</span>
      <button type="button" onClick={onCancel}>{cancelLabel}</button>
      <button type="button" onClick={onConfirm}>{confirmLabel}</button>
    </div>
  )),
  Datepicker: jest.fn((props) => <div {...props} />),
  dayjs: jest.fn(() => ({
    locale: () => ({
      format: () => {},
    }),
  })),
  InfoPopover: jest.fn(({ content }) => <div>{content}</div>),
  ExpandAllButton: jest.fn(({ onToggle, ...rest }) => (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      onClick={onToggle}
      type="button"
      {...rest}
    >
      Toggle accordion state
    </button>
  )),
  Headline: jest.fn(({ children, ...rest }) => <div {...rest}>{children}</div>),
  Icon: jest.fn((props) => (props && props.children ? props.children : <span />)),
  IconButton: jest.fn((props) => (
    <button type="button" {...props} />
  )),
  KeyValue: jest.fn(({
    label,
    children,
    value,
  }) => (
    <div>
      <div>
        {label}
      </div>
      <div>
        {children || value}
      </div>
    </div>
  )),
  Label: jest.fn(({
    htmlFor,
    id,
    children,
    ...rest
  }) => (<label htmlFor={htmlFor} id={id} {...rest}>{children}</label>)),
  List: jest.fn(({
    children,
  }) => <div>{children}</div>),
  MessageBanner: jest.fn(({ children, ...rest }) => (
    <div {...rest}>{children}</div>
  )),
  Modal: jest.fn(() => null),
  Pane: jest.fn(({ paneTitle, firstMenu, children, footer }) => (
    <div>
      {paneTitle}
      {firstMenu}
      {children}
      {footer}
    </div>
  )),
  PaneFooter: jest.fn(({ ref, children, renderEnd, ...rest }) => (
    <div ref={ref} {...rest}>
      {children}
      {renderEnd}
    </div>
  )),
  PaneMenu: jest.fn((props) => <div>{props.children}</div>),
  Paneset: jest.fn(({ children }) => (<div>{children}</div>)),
  RadioButton: jest.fn(() => <input type="radio" />),
  RadioButtonGroup: jest.fn(({ children }) => (<div>{children}</div>)),
  Row: jest.fn(({ children, ...rest }) => <div {...rest}>{children}</div>),
  Select: jest.fn(() => <select> </select>),
  TextArea: jest.fn((props) => <textarea {...props} />),
  TextField: jest.fn((props) => <input {...props} />),
  MultiColumnList: jest.fn(() => <div />),
  LoadingPane: jest.fn(() => <div>Loading</div>),
}));

jest.mock('@folio/stripes-components/util/currencies', () => {
  return {};
});
