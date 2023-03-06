import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectedProject } from "../context/selectedProjectSlice";
import { getCurrentProject } from "../context/userSelectors";
import { searInventory } from "../firebase/queries";
import { Inventory } from "../model/inventory.model";
import { Material } from "../model/material.model";
import { Project } from "../model/projects.model";

const Inventory: React.FunctionComponent = (props) => {
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

  useEffect(() => {
    console.log(inventory);
  }, [inventory]);
  return (
    <main>
      <h1>Lista de Gastos</h1>
      <ul>
        {currentProjectId && inventory ? (
          inventory.materials.map((item) => (
            <li key={item.material}>
              <h1>material: {item.material}</h1>
              <p>
                Cantidad gastada: {item.amount} {item.unit}
              </p>
            </li>
          ))
        ) : (
          <li>No hay materiales gastados</li>
        )}
      </ul>
    </main>
  );
};

export default Inventory;
