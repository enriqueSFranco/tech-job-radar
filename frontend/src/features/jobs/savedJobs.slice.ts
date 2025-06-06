import {createSlice} from "@reduxjs/toolkit"
import type {PayloadAction} from '@reduxjs/toolkit'
import { Job } from "@/types"

type Status = 'idle' | 'pending' | 'succeeded' | 'failed'

interface SavedJobsState {
  savedJobs: Job[],
  status: Status,
  error: null | string
}

const initialState: SavedJobsState = {
  savedJobs: [],
  status: 'idle',
  error: null
}

const savedJobsSlice = createSlice({
  name: 'savedJobs',
  initialState,
  reducers: {
    addSavedJob: (state, action: PayloadAction<Job>) => {
      const {savedJobs} = state
      const job = {...action.payload}
      const alreadySaved = savedJobs.some(j => j.id === job.id)

      if (alreadySaved) {
        console.info(`addSavedJob: El trabajo con ID "${job.id}" ya está guardado.`)
        return
      }

      state.savedJobs.push(action.payload)
    },
    removeSavedJob: (state, action: PayloadAction<Pick<Job, 'id'>>) => {
      const jobId = action.payload.id
      const {savedJobs} = state
      const exists = savedJobs.some(j => j.id === jobId)
      console.log({jobId, exists})
      if (!exists) {
        console.info(`removeSavedJob: No se encontró un trabajo con ID "${jobId}" en favoritos.`)
        return
      }
      state.savedJobs = savedJobs.filter(j => j.id !== jobId)
    },
  }
})

export const {addSavedJob, removeSavedJob} = savedJobsSlice.actions
export default savedJobsSlice.reducer
