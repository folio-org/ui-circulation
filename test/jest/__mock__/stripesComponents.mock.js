import React from 'react';

jest.mock('@folio/stripes/components', () => ({
  Accordion: jest.fn(({ children, label, ...rest }) => (
    <section {...rest}>
      <div>{label}</div>
      {children}
    </section>
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
  Checkbox: jest.fn(() => <input type="checkbox" />),
  Col: jest.fn(({ children, ...rest }) => <div {...rest}>{children}</div>),
  Datepicker: jest.fn((props) => <div {...props} />),
  Icon: jest.fn((props) => (props && props.children ? props.children : <span />)),
  IconButton: jest.fn(({
    buttonProps,
    // eslint-disable-next-line no-unused-vars
    iconClassName,
    ...rest
  }) => (
    <button type="button" {...buttonProps}>
      <span {...rest} />
    </button>
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
  Pane: jest.fn(({ children }) => (<div>{children}</div>)),
  PaneFooter: jest.fn(({ ref, children, ...rest }) => (
    <div ref={ref} {...rest}>{children}</div>
  )),
  PaneMenu: jest.fn((props) => <div>{props.children}</div>),
  Paneset: jest.fn(({ children }) => (<div>{children}</div>)),
  RadioButton: jest.fn(() => <input type="radio" />),
  Row: jest.fn(({ children, ...rest }) => <div {...rest}>{children}</div>),
  Select: jest.fn(() => <select> </select>),
  TextArea: jest.fn((props) => <textarea {...props} />),
  TextField: jest.fn((props) => <input {...props} />),
}));
