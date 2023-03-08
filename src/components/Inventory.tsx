import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectedProject } from "../context/selectedProjectSlice";
import { getCurrentProject } from "../context/userSelectors";
import { searInventory } from "../firebase/queries";
import { Inventory } from "../model/inventory.model";
import { Project } from "../model/projects.model";

const Inventory: React.FunctionComponent = () => {
  const currentProjectId = useSelector(selectedProject);

  const currentProject: any = useSelector(
    (state: { user: { projects: Project[] } }) =>
      getCurrentProject(state, currentProjectId)
  );

  const [inventory, setInventory] = useState<Inventory>();

  useEffect(() => {
    if (currentProjectId) {
      const inventoryId = currentProject.inventoryId;
      getDoc(searInventory(inventoryId)).then((res) => {
        if (res) setInventory(res.data() as Inventory);
      });
    }
  }, [currentProjectId]);

  return (
    <main className="flex items-center flex-col m-5">
      <h1 className="items-center font-bold text-3xl ">
        Lista de trabajadores
      </h1>
      <ul>
        {currentProjectId && inventory && inventory.materials ? (
          inventory.materials.map((item) => (
            <li
              key={item.material}
              className="flex flex-col items-center p-2 m-2 rounded-xl"
              style={{ background: "#31C48D" }}
            >
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {item.material}
              </h5>
              <span className="text-sm text-black dark:text-gray-400">
                Cantidad gastada: {item.amount} {item.unit}
              </span>
              <p></p>
            </li>
          ))
        ) : (
          <li className="flex flex-col items-center p-2 m-2 rounded-xl">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              No hay materiales gastados
            </h5>
          </li>
        )}
      </ul>
    </main>
  );
};

export default Inventory;
