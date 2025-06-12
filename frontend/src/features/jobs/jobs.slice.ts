import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Job } from '@/types'
import { fetchJobs } from './jobs.thunks'

type Status = 'idle' | 'pending' | 'succeeded' | 'failed'

interface JobsState {
  jobs: Job[],
  status: Status,
  error: string | null,
}

const initialState: JobsState = {
  jobs: [],
  status: 'idle',
  error: null,
}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchJobs.pending, (state, _) => {
      state.status = 'pending'
    })
    .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
      state.status = 'succeeded'
      // console.log("case: fetchJobs.fulfilled{", action.payload,"}")
      state.jobs = action.payload
    })
    .addCase(fetchJobs.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message ?? "Unknown Error"
    })
  }
})

export default jobsSlice.reducer
