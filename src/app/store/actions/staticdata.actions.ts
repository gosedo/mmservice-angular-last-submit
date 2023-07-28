import { createAction, props } from "@ngrx/store";
import { StaticData } from "src/app/mms-models/staticdata.model";


export enum StaicDataActionTypes {
    LoadStaicData = '[StaticData] Load Static Data',
    LoadStaicDataSuccess = '[StaticData] Load Static Data Success',
    LoadStaicDataFail = '[StaticData] Static Data Fail',
  }
//Static Data needed to create Issues

export const loadStaicData = createAction(
    StaicDataActionTypes.LoadStaicData );
  
export const loadStaicDataSuccess = createAction(
    StaicDataActionTypes.LoadStaicDataSuccess
    , props<{ payload: StaticData }>()
  );
  
  export const loadStaicDataFail = createAction(
    StaicDataActionTypes.LoadStaicDataFail
    , props<{ error: any }>()
  );

