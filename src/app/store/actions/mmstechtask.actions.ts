import { createAction, props } from "@ngrx/store";
import { TechTask } from "src/app/mms-models/techtask.model";
import { MmsTechTaskCreateDTO } from "src/app/mms-models/techtaskcreate.model";
import { MmsTechTaskUpdateDTO } from "src/app/mms-models/techtaskupdate.model";

//Creat Tech Task in the MmService and add to the NgRx State
//========================================================
export enum createTechTaskActionTypes {
    AddNewTechTask = '[MmsTechTask] Add New Tech Task',
    AddNewTechTaskSuccess = '[MmsTechTask] Add Tech Task Success',
    AddNewTechTaskFail = '[MmsTechTask] Add Tech Task Fail',
}

export const addNewTechTask = createAction(createTechTaskActionTypes.AddNewTechTask, props<{payload: MmsTechTaskCreateDTO}>() );
export const addNewTechTaskSuccess = createAction(createTechTaskActionTypes.AddNewTechTaskSuccess, props<{ payload: TechTask }>());
export const addNewTechTaskFail = createAction(createTechTaskActionTypes.AddNewTechTaskFail, props<{ error: any }>());

//Load Tech Tasks from MmService to NgRx
//======================================
export enum loadTechTaskActionTypes {
    LoadtechTask = '[MmsTechTask] Load Tech Tasks',
    LoadtechTaskByIssueId = '[MmsTechTask] Load Tech Tasks By Issue Id',
    LoadtechTaskSuccess = '[MmsTechTask] Load Tech Tasks Success',
    LoadtechTaskFail = '[MmsTechTask] Load Tech Tasks Fail',
}
 
export const loadtechTask = createAction(loadTechTaskActionTypes.LoadtechTask );
export const loadtechTaskByIssueId = createAction(loadTechTaskActionTypes.LoadtechTaskByIssueId,props<{ issueId: number }>() );
export const loadtechTaskSuccess = createAction(loadTechTaskActionTypes.LoadtechTaskSuccess, props<{ payload: TechTask[] }>());
export const loadtechTaskFail = createAction(loadTechTaskActionTypes.LoadtechTaskFail, props<{ error: any }>());


//Update TechTask in MmSerive and NgRx
//===================================
export enum updateTechTaskActionTypes {
  UpdateTechTask = '[MmsTechTask] Update TechTask',
  UpdateTechTaskSuccess = '[MmsTechTask] Update TechTask Success',
  UpdateTechTaskFail = '[MmsTechTask] Update TechTask Fail',
}

export const updateTechTask = createAction(updateTechTaskActionTypes.UpdateTechTask, props<{payload: MmsTechTaskUpdateDTO}>() );
export const updateTechTaskSuccess = createAction(updateTechTaskActionTypes.UpdateTechTaskSuccess, props<{ payload: TechTask }>());
export const updateTechTaskFail = createAction(updateTechTaskActionTypes.UpdateTechTaskFail, props<{ error: any }>());


//Update TechTask in MmSerive and NgRx
//===================================
export enum deleteTechTaskActionTypes {
  DeleteTechTask = '[MmsTechTask] Delete TechTask',
  DeleteTechTaskSuccess = '[MmsTechTask] Delete TechTask Success',
  DeleteTechTaskFail = '[MmsTechTask] Delete TechTask Fail',
}

export const deleteTechTask = createAction(deleteTechTaskActionTypes.DeleteTechTask, props<{payload: number}>() );
export const deleteTechTaskSuccess = createAction(deleteTechTaskActionTypes.DeleteTechTaskSuccess, props<{ payload: number }>());
export const deleteTechTaskFail = createAction(deleteTechTaskActionTypes.DeleteTechTaskFail, props<{ error: any }>());