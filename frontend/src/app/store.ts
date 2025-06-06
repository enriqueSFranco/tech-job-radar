import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import jobsReducer from "@/features/jobs/jobs.slice";
import savedJobsReducer from "@/features/jobs/savedJobs.slice"
import searchReducer from "@/features/search/search.slice"

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    savedJobs: savedJobsReducer,
    formSearch: searchReducer
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk = ThunkAction<void, RootState, unknown, Action>
