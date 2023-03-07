import { Project } from './projects.model';

export interface User {
  id: string;
  rol: 'admin' | 'worker' | '';
  projects: Project[];
}

export interface RegisterDTO extends Pick<User, "rol"> {
  email: string,
  password: string
}
