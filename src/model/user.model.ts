import { Project } from './projects.model';

export interface User {
  id: string;
  rol: 'admin' | 'worker' | '';
  projects: Project[];
  name: string;
}

export interface RegisterDTO extends Pick<User, 'rol'> {
  email: string;
  password: string;
  name: string;
}

export type IWorker = Pick<User, 'name' | 'id'>;
