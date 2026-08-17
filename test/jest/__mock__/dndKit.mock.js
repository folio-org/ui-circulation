jest.mock('@dnd-kit/react', () => ({
  DragDropProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('@dnd-kit/react/sortable', () => ({
  useSortable: jest.fn(() => ({
    ref: jest.fn(),
    handleRef: jest.fn(),
  })),
}));
