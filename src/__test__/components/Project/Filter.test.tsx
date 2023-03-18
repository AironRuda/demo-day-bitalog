import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Filter from '../../../components/projects/ProjectsList/Filter';
import { filterProjects } from '../../../model/projects.model';

describe('Filter', () => {
  afterAll(() => {
    cleanup();
  });

  const getFilter = (filter: filterProjects) => filter;

  const filterList: {
    filters: filterProjects[];
    getFilter: (filter: filterProjects) => void;
  } = {
    filters: ['', 'new', 'pending', 'done'],
    getFilter,
  };

  const spy = vi.spyOn(filterList, 'getFilter');

  render(<Filter filter={''} setFilter={filterList.getFilter} />);

  it('should call the corresponding filter', () => {
    const items = screen.getAllByRole('listitem');

    items.forEach((item, index) => {
      fireEvent.click(item);
      expect(spy).toHaveBeenCalledWith(filterList.filters[index]);
    });
  });

  it('should call the function on every click', () => {
    expect(spy).toHaveBeenCalledTimes(filterList.filters.length);
  });

  it('should show that the filter is selected', () => {
    filterList.filters.forEach((filter, index) => {
      cleanup();

      render(<Filter filter={filter} setFilter={filterList.getFilter} />);
      const items = screen.getAllByRole('listitem');

      expect(items[index]).toHaveClass('text-primary');
    });
  });
});
