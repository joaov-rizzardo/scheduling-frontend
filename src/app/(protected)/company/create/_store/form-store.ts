import { create } from "zustand";

type Step = "basic" | "address";

interface FormStoreProps {
  basic: {
    name: string;
    email: string;
    phone: string;
    color: string;
  };
  address: {
    street: string;
    city: string;
    country: string;
    state: string;
    postalCode: string;
    number: string;
    neighborhood: string;
    additionalInformation?: string;
  };
  step: Step;
  order: Step[];
}

type FormStoreAction = {
  setBasic: (args: FormStoreProps["basic"]) => void;
  setAddress: (args: FormStoreProps["address"]) => void;
  next: () => void;
  previous: () => void;
};

export const useFormStore = create<FormStoreProps & FormStoreAction>((set) => ({
  basic: {
    name: "",
    color: "",
    email: "",
    phone: "",
  },
  address: {
    street: "",
    city: "",
    country: "",
    neighborhood: "",
    number: "",
    postalCode: "",
    state: "",
  },
  step: "basic",
  order: ["basic", "address"],
  setBasic: (basic: FormStoreProps["basic"]) =>
    set((state) => ({
      ...state,
      basic,
    })),
  setAddress: (address: FormStoreProps["address"]) =>
    set((state) => ({
      ...state,
      address,
    })),
  next: () =>
    set((state) => {
      const current = state.order.findIndex((i) => i === state.step);
      if (current === -1 || current === state.order.length - 1) return state;
      return {
        ...state,
        step: state.order[current + 1],
      };
    }),
  previous: () =>
    set((state) => {
      const current = state.order.findIndex((i) => i === state.step);
      if (current === -1 || current === 0) return state;
      return {
        ...state,
        step: state.order[current - 1],
      };
    }),
}));
