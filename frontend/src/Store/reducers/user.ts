import { createSlice } from "@reduxjs/toolkit";

interface IUserState {
  user: {
    id: any;
    fullName: string;
    email: string;
    avatar: string;
  };
  token: string;
  isUsedApp: boolean;
  recendFood: any[];
}

const initialState: IUserState = {
  user: {
    id: "",
    fullName: "",
    email: "",
    avatar: "",
  },
  token: "",
  isUsedApp: false,
  recendFood: []
};

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    LOGIN: (
      state,
      { payload: { id, email, full_name, avatar, access, refresh } }
    ) => {
      state.user = {
        id: id,
        fullName: full_name,
        email: email,
        avatar: avatar,
      };
      state.token = access;
      state.recendFood = [];
    },
    LOGOUT: (state, { payload: {} }) => {
      state.user = initialState.user;
      state.token = initialState.token;
      state.recendFood = [];
    },
    SETISUSED: (state, { payload: {} }) => {
      state.isUsedApp = true;
    },
    UPDATEUSER: (state, { payload: {email, full_name, avatar } }) => {
      state.user.fullName = full_name;
      state.user.email = email;
      state.user.avatar = avatar;
    },
    UPDATE_RECENT: (state, { payload: _food}) => {
        state.recendFood = state.recendFood.filter(
          (s) => s.id !== _food.id
        );
        state.recendFood = [_food, ...state.recendFood];
        console.log(state.recendFood);
        },
    CLEAR_RECENT: (state, { payload: {} }) => {
      state.recendFood = [];
    },
  },
});

export const {
  LOGIN,
  LOGOUT,
  SETISUSED,
  UPDATEUSER,
  UPDATE_RECENT,
  CLEAR_RECENT,
} = slice.actions;

export const userReducers = slice.reducer;
