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
}

interface FormState {
  uncontrolledForm: FormData | null;
  hookForm: FormData | null;
  countries: string[];
}

const initialState: FormState = {
  uncontrolledForm: null,
  hookForm: null,
  countries: ['Ukraine', 'Poland', 'Germany', 'France', 'USA', 'Canada'], // додати більше країн за необхідності
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledFormData(state, action: PayloadAction<FormData>) {
      state.uncontrolledForm = action.payload;
    },
    setHookFormData(state, action: PayloadAction<FormData>) {
      state.hookForm = action.payload;
    },
  },
});

export const { setUncontrolledFormData, setHookFormData } = formSlice.actions;

export default formSlice.reducer;
