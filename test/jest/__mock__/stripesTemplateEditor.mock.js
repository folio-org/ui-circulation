import React from 'react';

jest.mock('@folio/stripes-template-editor', () => ({
  TokensSection: jest.fn(({
    selectedCategory,
    header,
    tokens,
    loopConfig = {
      enabled: true,
      label: 'label',
      tag: 'tag',
    },
    section,
    onLoopSelect = jest.fn(),
    // eslint-disable-next-line no-unused-vars
    onSectionInit = jest.fn(),
    onTokenSelect = jest.fn(),
    ...rest
  }) => (
    <div section={section} {...rest}>
      <div data-testid={`headerFor${section}`}>{header}</div>
      <ul data-testid="availableTokens">
        {tokens.map(({ token, allowedFor }) => {
          const disabled = selectedCategory && !allowedFor.includes(selectedCategory);

          return (
            <li key={token}>
              <input
                data-testid={token}
                type="checkbox"
                value={token}
                label={token}
                disabled={disabled}
                onChange={onTokenSelect}
              />
            </li>
          );
        })}
        { loopConfig.enabled && (
          <>
            <hr />
            <input
              data-testid="multipleTokens"
              type="checkbox"
              value={loopConfig.tag}
              label={<strong>{loopConfig.label}</strong>}
              onChange={onLoopSelect}
            />
          </>
        )}
      </ul>
    </div>
  )),
}));
