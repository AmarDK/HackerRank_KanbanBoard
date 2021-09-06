import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  taskName = "";
  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  getNewTaskData () {
    if(this.taskName){
      let taskObj = {
        name:this.taskName,
        stage:0
      }
      this.stagesTasks[0].push(taskObj);
      this.taskName = null;
    }else return;

  }

  moveToNextStage(index, taskData){
    let findStageIndex = this.stagesTasks[index].findIndex((data) => data.name == taskData.name);
    this.stagesTasks[index].splice(findStageIndex, 1);
    taskData.stage = index+1;
    this.stagesTasks[index+1].push(taskData);
  }

  moveToLastStage(index, taskData){
    let findStageIndex = this.stagesTasks[index].findIndex((data) => data.name == taskData.name);
    this.stagesTasks[index].splice(findStageIndex, 1);
    taskData.stage = index-1;
    this.stagesTasks[index-1].push(taskData);
  }

  deleteTaskData(index, taskData) {
    let findStageIndex = this.stagesTasks[index].findIndex((data) => data.name == taskData.name);
    this.stagesTasks[index].splice(findStageIndex, 1);
  }

  checkForBackButton(index){
    if(index == 0) return true;
    else return false;
  }
s
  checkForForwardButton(index){
    if(index == 3) return true;
    else return false;
  }
}

interface Task {
  name: string;
  stage: number;
}