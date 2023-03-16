import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';
import SelectFormik from '../../../components/common/form/SelectFormik';
import { unorderedActivities } from '../../mocks/activities.mock';

describe('SelectFormik', () => {
  beforeEach(() => {
    render(
      <Formik
        initialValues={{
          select: [],
        }}
        onSubmit={() => {}}
      >
        <Form>
          <SelectFormik
            name='select'
            options={unorderedActivities.map(
              (activities) => activities.activityName
            )}
            placeholder='Selecciona la actividad'
            renderList
          />
        </Form>
      </Formik>
    );
  });

  afterEach(() => cleanup());

  it('should render the list of options', async () => {
    const select = await screen.findByRole('listbox');

    userEvent.click(select);

    const options = await screen.findAllByRole('listitem');

    options.forEach((option, index) => {
      expect(option.innerHTML).toBe(unorderedActivities[index].activityName);
    });
  });

  it('should a list with the selected options', async () => {
    await act(async () => {
      const select = await screen.findByRole('listbox');
      userEvent.setup();

      userEvent.click(select);

      const options = await screen.findAllByRole('listitem');

      userEvent.click(options[0]);

      const itemsList = await screen.findByRole('list');

      const item = await screen.findByText('sad');
    });
  });
});
