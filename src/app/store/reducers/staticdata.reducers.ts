
import { createReducer, on } from "@ngrx/store";
import { StaticData } from "src/app/mms-models/staticdata.model";
import * as fromStaticDataActions from '../actions/staticdata.actions'

export interface State {
    loading: boolean;
    staticData: StaticData;
    error: '';
}


const initialState: State = {
    loading: false,
    staticData: null,
    error: '',
};
  

export const staticDataReducers = createReducer(
    initialState,
    on(fromStaticDataActions.loadStaicData, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(fromStaticDataActions.loadStaicDataSuccess, (state, { payload: staticData }) => ({
      ...state,
      staticData: staticData,
      loading: false,
    })),
    on(fromStaticDataActions.loadStaicDataFail, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
    
);
  