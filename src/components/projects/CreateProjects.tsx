import { getDocs } from "firebase/firestore";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addProject } from "../../context/projectsSlice";
import { searchWorkers } from "../../firebase/queries";
import { handleCreateProject } from "../../handlers/handleProject";
import { createProjectDTO } from "../../model/projects.model";
import { CREATE_PROJECT_VALIDATION_SCHEMA } from "../../utilities/formValidations";
import SelectFormik from "../form/SelectFormik";
import TextFieldFormik from "../form/TextFieldFormik";

const INITIAL_VALUES: createProjectDTO = {
  name: "",
  workers: [],
};

const CreateProjects: React.FunctionComponent = (props) => {
  const [avalaibleWorkers, setAvalaibleWorkers] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getDocs(searchWorkers).then((res) => {
      const workers = res.docs.map((doc) => doc.id);
      setAvalaibleWorkers(workers);
    });
  }, []);

  const handleSubmit = async (
    values: createProjectDTO,
    helpers: FormikHelpers<createProjectDTO>
  ) => {
    const newProject = await handleCreateProject(values);
    if (typeof newProject === "string") helpers.setStatus(newProject);
    else if (newProject) {
      helpers.resetForm();
      dispatch(addProject(newProject));
      Swal.fire({
        text: "Se ha creado el proyecto de forma exitosa",
        icon: "success",
        confirmButtonColor: "#31C48D",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={CREATE_PROJECT_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ status }) => (
        <Form className="h-11/12 md:w-1/3 mx-2 flex flex-col items-center gap-5 border-2 border-secondary p-10 overflow-y-auto">
          <TextFieldFormik name="name" placeholder="Project Name" />
          <SelectFormik
            name="workers"
            options={avalaibleWorkers}
            placeholder="Selecciona a los encargados"
            renderList
          />
          <button type="submit" className="btn btn-primary text-white w-full">
            Create
          </button>
          {!!status && <div>{status}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default CreateProjects;
