import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { render, screen } from 'test';

import ModalDialog from './ConfirmationDialog';
import { ModalOptions } from './types';

const mockDefaultOptions: ModalOptions = {
  title: 'Are you sure?',
  description: '',
  content: null,
  confirmationText: 'Ok',
  cancellationText: 'Cancel',
  dialogProps: {},
  confirmationButtonProps: {},
  cancellationButtonProps: {},
  titleProps: {},
  contentProps: {},
  allowClose: true,
};

const mockWithContentOptions: ModalOptions = {
  ...mockDefaultOptions,
  content: <div>content</div>,
};

const mockWithDescriptionOptions: ModalOptions = {
  ...mockDefaultOptions,
  description: <div>description</div>,
};

describe('<ConfirmationDialog />', () => {
  test('modal window is not rendered', () => {
    render(
      <ModalDialog
        open={false}
        options={mockDefaultOptions}
        onCancel={() => null}
        onConfirm={() => null}
      />,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  test('should render modal window with title and content and confirm window', async () => {
    const mockConfirmHandler = vi.fn();
    const mockCancelHandler = vi.fn();
    render(
      <ModalDialog
        open={true}
        options={mockWithContentOptions}
        onCancel={mockCancelHandler}
        onConfirm={mockConfirmHandler}
      />,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    expect(
      screen.getByText(mockWithContentOptions.title as string),
    ).toBeInTheDocument();

    expect(screen.getByRole('dialog')).toContainElement(
      screen.getByText('content'),
    );
    const confirmationButton = screen.getByRole('button', {
      name: mockWithContentOptions.confirmationText as string,
    });
    const cancellationButton = screen.getByRole('button', {
      name: mockWithContentOptions.cancellationText as string,
    });
    expect(confirmationButton).toBeInTheDocument();
    expect(cancellationButton).toBeInTheDocument();

    await userEvent.click(confirmationButton);

    expect(mockConfirmHandler).toHaveBeenCalledTimes(1);
    expect(mockCancelHandler).toHaveBeenCalledTimes(0);
  });

  test('should render modal window with description and cancel window', async () => {
    const mockConfirmHandler = vi.fn();
    const mockCancelHandler = vi.fn();
    render(
      <ModalDialog
        open={true}
        options={mockWithDescriptionOptions}
        onCancel={mockCancelHandler}
        onConfirm={mockConfirmHandler}
      />,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    expect(
      screen.getByText(mockWithDescriptionOptions.title as string),
    ).toBeInTheDocument();

    expect(screen.getByRole('dialog')).toContainElement(
      screen.getByText('description'),
    );

    const confirmationButton = screen.getByRole('button', {
      name: mockWithContentOptions.confirmationText as string,
    });
    const cancellationButton = screen.getByRole('button', {
      name: mockWithContentOptions.cancellationText as string,
    });
    expect(confirmationButton).toBeInTheDocument();
    expect(cancellationButton).toBeInTheDocument();

    await userEvent.click(cancellationButton);

    expect(mockConfirmHandler).toHaveBeenCalledTimes(0);
    expect(mockCancelHandler).toHaveBeenCalledTimes(1);
  });
});
