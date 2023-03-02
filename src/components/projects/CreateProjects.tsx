import { Form, Formik } from "formik";
import { createProjectDTO } from "../../model/projects.model";
import CreateListItems from "../form/CreateListItems";
import TextFieldFormik from "../form/TextFieldFormik";

const INITIAL_VALUES: createProjectDTO = {
  name: "",
  workers: ["worker 1"],
};

const CreateProjects: React.FunctionComponent = (props) => {
  return (
    <div>
      <h1>
        crear project por nombre y asignar trabajadores de un pool mediante
        select y asignalo a array mediante el currentUser, mediante adminId
      </h1>
      <Formik initialValues={INITIAL_VALUES} onSubmit={() => {}}>
        {({ values }) => (
          <Form>
            <TextFieldFormik name="name" placeholder="Project Name" />

            <div>
              <CreateListItems name={"workers"} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProjects;
