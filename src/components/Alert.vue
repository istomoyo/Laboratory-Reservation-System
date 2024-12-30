<template>
  <div
    class="fixed w-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-[10%] z-[110] m-2 tracking-widest"
  >
    <AlertType
      v-for="(e, index) in alertArr"
      :type="e.alertType"
      :key="e.alertText"
      >{{ e.alertText }}</AlertType
    >
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import emitter from "@/utils/emitter";
import AlertType from "./AlertType.vue";
const alertArr = ref([]);
onMounted(() => {
  emitter.on("alert", (value) => {
    // 确保 `alertArr` 的每一项是一个对象
    alertArr.value.unshift({
      alertType: value.alertType,
      alertText: value.alertText,
    });
    console.log("接收到的警告类型:", value.alertType);
  });
});
</script>
