import { supabase } from "../../components/superbase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "Todo/fetchTodos",
  async (_, thunkAPI) => {
    try {
      let { data: Todos, error } = await supabase.from("Todos").select("*");

      if (error) {
        throw Error(error);
      }
      return Todos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const createTodo = createAsyncThunk(
  "Todo/createTodo",
  async (_data, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("Todos")
        .insert([..._data])
        .select();

      if (error) {
        throw Error(error);
      }
      return data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateTodo = createAsyncThunk(
  "Todo/updateTodo",
  async (_data, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("Todos")
        .update({ done: _data.done })
        .eq("id", _data.id)
        .select();
      if (error) {
        throw Error(error);
      }
      return data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const editTodo = createAsyncThunk(
  "Todo/editTodo",
  async (_data, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("Todos")
        .update({ title: _data.title })
        .eq("id", _data.id)
        .select();
      if (error) {
        throw Error(error);
      }
      return data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteTodo = createAsyncThunk(
  "Todo/deleteTodo",
  async (id, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("Todos")
        .delete()
        .eq("id", id)
        .select();
      if (error) {
        throw Error(error);
      }
      return data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updateTodo = state.todos.find(
          (item) => item.id === action.payload.id
        );
        updateTodo.done = action.payload.done;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (item) => item.id != action.payload.id
        );
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const editTodo = state.todos.find(
          (item) => item.id === action.payload.id
        );
        editTodo.title = action.payload.title;
      });
  },
});
export default todoSlice.reducer;
