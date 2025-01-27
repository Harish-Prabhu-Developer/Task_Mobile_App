import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [
      { id: 1, fullName: "New User", designation: "Designer", email: "user@email.com", role: "Developer", active: true },
      { id: 2, fullName: "Emily Wilson", designation: "Data Analyst", email: "user@email.com", role: "Analyst", active: true },
      { id: 3, fullName: "Alex Johnson", designation: "UX Designer", email: "user@email.com", role: "Designer", active: true },
      { id: 4, fullName: "Jane Smith", designation: "Product Manager", email: "user@email.com", role: "Manager", active: false },
      { id: 5, fullName: "Codewave Asante", designation: "Administrator", email: "user@email.com", role: "Admin", active: false },
    ],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push({ id: state.users.length + 1, ...action.payload });
    },
    editUser: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload.data };
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
