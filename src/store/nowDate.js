import { defineStore } from "pinia";
import { reactive,ref } from "vue";

export const useNowDateStore = defineStore("nowDay", () => {
  const nowday = ref(false);
  function changeNowDay() {
    nowday.value = true;
  }
  return { nowday, changeNowDay };
});
