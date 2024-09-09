import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { waitTwoSeconds } from "../../utils";

export const __addToDo = createAsyncThunk(
  "__addToDo",
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    return payload;
  }
);

export const __deleteTodo = createAsyncThunk(
  "__deleteToDo",
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    return payload;
  }
);

const initialState = {
  list: [],
};

const STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(__addToDo.pending, (state, action) => {
        state.status = STATUS.PENDING;
      })
      .addCase(__addToDo.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED;
        state.list.push(action.payload);
      })
      .addCase(__addToDo.rejected, (state, action) => {
        state.status = STATUS.REJECTED;
        state.error = action.error.message;
      })
      .addCase(__deleteTodo.pending, (state, action) => {
        state.status = STATUS.PENDING;
      })
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED;
        state.list = state.list.filter((todo) => todo.id !== action.payload.id);
      })
      .addCase(__deleteTodo.rejected, (state, action) => {
        state.status = STATUS.REJECTED;
        state.error = action.error.message;
      });
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
