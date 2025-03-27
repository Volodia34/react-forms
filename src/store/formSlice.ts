import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: string;
  country: string;
  timestamp: number;
}

interface FormState {
  uncontrolledForm: FormData[];
  hookForm: FormData[];
  countries: string[];
}

const initialState: FormState = {
  uncontrolledForm: [],
  hookForm: [],
  countries: ['Ukraine', 'Poland', 'Germany', 'France', 'USA', 'Canada'],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledFormData(state, action: PayloadAction<FormData>) {
      state.uncontrolledForm.push(action.payload);
    },
    setHookFormData(state, action: PayloadAction<FormData>) {
      state.hookForm.push(action.payload);
    },
  },
});

export const { setUncontrolledFormData, setHookFormData } = formSlice.actions;

export default formSlice.reducer;
