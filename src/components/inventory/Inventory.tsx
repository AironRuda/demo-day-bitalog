import { getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSelectedProject } from '../../context/projectsSlice';
import { getCurrentProject } from '../../context/selectors';
import { searInventory } from '../../firebase/queries';
import { Material } from '../../model/material.model';
import { Project } from '../../model/projects.model';
import SelectProjectMessage from '../common/SelectProjectMessage';
import Spent from './Spent';

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
    <div className='flex items-center flex-col my-5 mx-2'>
      <h1 className='text-center text-4xl text-slate-700 font-bold'>GASTOS</h1>
      {!!currentProject ? (
        <ul className='mt-10 flex flex-wrap lg:gap-10 gap-4 justify-center [&>*]:text-center'>
          {inventory && inventory.length ? (
            inventory
              .sort((a, b) => {
                if (a.material > b.material) return 1;
                if (a.material < b.material) return -1;
                else return 0;
              })
              .map((item) => <Spent key={item.material} spent={item} />)
          ) : (
            <p className='text-3xl text-center px-20 text-secondary'>
              No se han gastado materiales hasta ahora
            </p>
          )}
        </ul>
      ) : (
        <SelectProjectMessage />
      )}
    </div>
  );
};

export default Inventory;
