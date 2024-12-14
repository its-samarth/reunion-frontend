import React, { useEffect, useState } from 'react';
import TaskTable from './TaskTable';
import { getTasks } from '@/services/authService';
import { log } from 'console';
import SetTask from './SetTasks';
 // Assuming you have imported the getTasks function

const TasksList = () => {
  

  return (
    <div>
      
      <TaskTable  /> 
      
    </div>
  );
};

export default TasksList;
