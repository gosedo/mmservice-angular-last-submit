import { createReducer, on } from "@ngrx/store";
import { TechTask } from "src/app/mms-models/techtask.model";
import * as MmsTechTaskActions from '../actions/mmstechtask.actions'

    

export interface State {
    loading: boolean;
    techtasks: TechTask[];
    error: '';
  }
  
  const initialState: State = {
    loading: false,
    techtasks: [],
    error: '',
  };
    
  export const techTaskReducers = createReducer(
    initialState,
    on(MmsTechTaskActions.addNewTechTask, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(MmsTechTaskActions.addNewTechTaskSuccess, (state, {payload: techTask}) =>({
      ...state,
      techtasks: [...state.techtasks, techTask],
      loading: false
    })
    ),
    on(MmsTechTaskActions.addNewTechTaskFail, (state, { error }) => ({
      ...state,
      error
    })),
    on(MmsTechTaskActions.loadtechTask,(state)=>({
      ...state,
      techtasks: [],
      loading: true,
      error: null,
    })),
    on(MmsTechTaskActions.loadtechTaskByIssueId,(state)=>({
      ...state,
      techtasks: [],
      loading: true,
      error: null,
    })),
    
    on(MmsTechTaskActions.loadtechTaskSuccess,(state,{payload: listOfTechTasks})=>({
      ...state,
      loading: false,
      techtasks: [...listOfTechTasks]
      
    })),
    on(MmsTechTaskActions.loadtechTaskFail,(state,{error})=>({
      ...state,
      error
    })),
    on(MmsTechTaskActions.updateTechTask,(state)=>({
      ...state,
      loading: true,
      error: null,
    })),
    on(MmsTechTaskActions.updateTechTaskSuccess,(state,{payload: updateTechTasks})=>({
      ...state,
      loading: false,
      techtasks: state.techtasks.map(techTaskInStore => {
        
        if (techTaskInStore.techTaskId === updateTechTasks.techTaskId ) {
          return updateTechTasks;
        }
        return techTaskInStore;
      })
      
    })),
    on(MmsTechTaskActions.updateTechTaskFail,(state,{error})=>({
      ...state,
      error
    })),
      
);