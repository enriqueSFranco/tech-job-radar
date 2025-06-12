import { RootState } from '@/app/store'

export const selectJobs = (state: RootState) => state.jobs.jobs
export const selectTotaljobs = (state: RootState) => state.jobs.jobs.length
export const selectJobById = (state: RootState, id: string) =>  state.jobs.jobs.find(j => j.id === id)
export const selectJobsStatus = (state: RootState) => state.jobs.status
export const selectSavedJobs = (state: RootState) => state.savedJobs.savedJobs
