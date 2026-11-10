import { useContext } from 'react'; import { TaskContext } from '../context/TaskContext'; export const useCollection = () => useContext(TaskContext);
