import { fireEvent, render, screen } from '@testing-library/react';
import SelectButton from './SelectButton';
import { useState } from 'react';

describe('SelectButton', () => {
  test('should render with "select-button--active" class when selected is true', () => {
    render(<SelectButton selected={true} onClick={jest.fn()}>7j</SelectButton>);
    const button = screen.getByText('7j');
    expect(button).toHaveClass('select-button--active');
  });

  test('should not render with "select-button--active" class when selected is false', () => {
    render(<SelectButton selected={false} onClick={jest.fn()}>24j</SelectButton>);
    const button = screen.getByText('24j');
    expect(button).not.toHaveClass('select-button--active');
  });

  test('should call onClick when clicked and have "select-button--active" class', () => {
    const onClickMock = jest.fn();
    render(<SelectButton selected={false} onClick={onClickMock}>7j</SelectButton>);

    const button = screen.getByText('7j');
    button.click();

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('should toggle active class on click', () => {
    const TestComponent = () => {
      const [selected, setSelected] = useState(false);
      const handleClick = () => setSelected(prev => !prev);

      return (
        <SelectButton selected={selected} onClick={handleClick}>
          Button Text
        </SelectButton>
      );
    };

    render(<TestComponent />);

    const button = screen.getByText('Button Text');
    expect(button).not.toHaveClass('select-button--active');

    fireEvent.click(button);
    expect(button).toHaveClass('select-button--active');
  });
});