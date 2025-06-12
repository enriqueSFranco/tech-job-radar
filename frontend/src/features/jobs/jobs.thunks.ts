import {createAsyncThunk} from "@reduxjs/toolkit"
import {findJobs} from "@/services/job.service"
import { AppThunk } from "@/app/store";

// Thunk para buscar vacantes
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({keyword, location}:{keyword: string, location: string}, thunkApi) => {
    try {
      console.log("se busco: ", keyword, location)
      const response = await findJobs(keyword, location)
      if (response.status !== 200) {
        return thunkApi.rejectWithValue({
          message: "Failed to fetch jobs"
        })
      }
      return response.data
    } catch (error) {}
  }
)

export const fetchSavedJob = createAsyncThunk(
  'jobs/fetchSavedJob',
  async () => {}
)
