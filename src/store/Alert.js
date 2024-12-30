import { defineStore } from "pinia";

export const useTalkStore = defineStore("Alert", () => {
  const booleanKey = ref(false);
  const string = ref("");
  function my_modal_1_showModal() {
    booleanKey = !booleanKey;
  }
  return {
    booleanKey,
    my_modal_1_showModal,
  };
});
