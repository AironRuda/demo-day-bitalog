import { getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSelectedProject } from '../../context/projectsSlice';
import { getCurrentProject } from '../../context/selectors';
import { searInventory } from '../../firebase/queries';
import { Material } from '../../model/material.model';
import { Project } from '../../model/projects.model';
import SelectProjectMessage from '../common/SelectProjectMessage';
import PieChart from './PieChart';
import SpentsTable from './SpentsTable';

const Inventory: React.FunctionComponent = () => {
  const currentProjectId = useSelector(getSelectedProject);

  const currentProject: any = useSelector(
    (state: { projects: { projects: Project[] } }) =>
      getCurrentProject(state, currentProjectId)
  );

  const [inventory, setInventory] = useState<Material[]>([]);

  useEffect(() => {
    if (currentProjectId) {
      const inventoryId = currentProject.inventoryId;
      getDoc(searInventory(inventoryId)).then((res) => {
        const data = res.data();
        if (data) {
          setInventory(data.materials);
        }
      });
    }
  }, [currentProjectId]);

  return (
    <div className='w-full h-full flex items-center justify-center flex-col my-5'>
      <h1 className='text-center text-4xl text-slate-700 font-bold mb-5'>
        GASTOS
      </h1>
      {!!currentProject ? (
        <div className='w-full h-full mt-5 flex flex-wrap lg:gap-10 gap-4 justify-center [&>*]:text-center lg:mr-20'>
          {inventory && inventory.length ? (
            <div className='w-full h-full flex items-center lg:flex-row flex-col'>
              <SpentsTable inventory={inventory} />
              <PieChart spents={inventory} />
            </div>
          ) : (
            <p className='text-3xl text-center px-20 text-secondary'>
              No se han gastado materiales hasta el momento. <br />
              Se ha de cumplir alguna actividad para que se visualice en el
              inventario 🤓 
            </p>
          )}
        </div>
      ) : (
        <SelectProjectMessage />
      )}
    </div>
  );
};

export default Inventory;
