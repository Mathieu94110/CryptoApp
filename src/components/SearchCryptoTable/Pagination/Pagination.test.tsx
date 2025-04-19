import { screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { changePage } from '@/store/reducers/searchPageSlice';
import { renderWithStore } from 'src/helpers/store';

describe('Pagination Component', () => {
  test('should render pagination correctly with default page', () => {
    renderWithStore(<Pagination />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    const ellipsis = screen.queryByText('...');
    expect(ellipsis).toBeInTheDocument();

    const currentPageButton = screen.getByText('1');
    expect(currentPageButton).toHaveClass('pagination__buttons--active');
  });

  test('should dispatch changePage when clicking next button and searchPage page state updated', () => {
    const { store, dispatchSpy } = renderWithStore(<Pagination />);

    const nextButton = screen.getByText('2');
    fireEvent.click(nextButton);

    expect(dispatchSpy).toHaveBeenCalledWith(changePage(2));
    expect(store.getState().searchPage.page).toBe(2);
  });

  test('should dispatch changePage when clicking multi-step next button', () => {
    const { dispatchSpy } = renderWithStore(<Pagination />, 5);

    const multiStepNextButton = screen.getAllByText('...')[1]; // 1 because at this step pagination display 1 ... 4 [5] 6 ... 10
    fireEvent.click(multiStepNextButton);
    expect(dispatchSpy).toHaveBeenCalledWith(changePage(8));
  });

  test('should not dispatch changePage when clicking next button on last page', () => {
    renderWithStore(<Pagination />, 250);

    const nextButton = screen.queryByRole('button', { name: /next/i });
    expect(nextButton).toBeNull();
  });
  test('should dispatch changePage with 1 as the argument when clicking the prev button from page 1', () => {
    const { store } = renderWithStore(<Pagination />);
    const prevButton = screen.getByText('1');
    fireEvent.click(prevButton);
    expect(store.getState().searchPage.page).toBe(1);
  });
  test('should dispatch changePage with 1 as the argument when clicking the prev button from page 2', () => {
    const { store } = renderWithStore(<Pagination />, 2);
    const prevButton = screen.getByText('1');
    fireEvent.click(prevButton);
    expect(store.getState().searchPage.page).toBe(1);
  });
});