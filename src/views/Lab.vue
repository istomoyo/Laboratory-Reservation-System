<template>
  <div class="w-full h-screen overflow-y-scroll" id="labTable">
    <table class="table" v-if="list.length !== 0">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>课程名称</th>
          <th>周次</th>
          <th>预约教师</th>
          <th>星期</th>
          <th>节次</th>
        </tr>
      </thead>
      <tbody class="w-fit">
        <!-- row 1 -->
        <tr v-for="(l, index) in list" class="hover">
          <th>{{ index + 1 }}</th>
          <td>
            <div class="avatar placeholder">
              <div class="w-8 rounded-full bg-neutral text-neutral-content">
                <span class="text-xs">{{ l.teacherName.slice(-2) }}</span>
              </div>
            </div>
          </td>
          <td>{{ l.courseName }}</td>
          <td>{{ l.week }}</td>
          <td>{{ l.teacherName }}</td>
          <td>周{{ getDayOfWeek(l.dayOfWeek) }}</td>
          <td>{{ getSection(l.section) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="flex">
      <div class="m-auto">暂无信息</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect, onUnmounted } from "vue";
import emitter from "@/utils/emitter";
import { useRoute } from "vue-router";
import myAxios from "@/utils/myAxios.js";
import { storeToRefs } from "pinia";
import Lenis from "lenis";
const route = useRoute();
const list = ref([]);
const tabel = ref();
function getDayOfWeek(i) {
  const daysOfWeek = ["一", "二", "三", "四", "五", "六", "日"];
  return daysOfWeek[i];
}
function getSection(i) {
  const dateCourse = [
    { str: "一二节", time: "8:00~9:35" },
    { str: "三四节", time: "9:55~11:30" },
    { str: "五六节", time: "13:40~15:15" },
    { str: "七八节", time: "15:35~17:10" },
    { str: "九十节", time: "18:00~19:35" },
    { str: "十一十二节", time: "19:40~21:15" },
  ];
  return dateCourse[i - 1].str;
}
let lenis;
// 打印params参数
console.log("route.params", route.params);
onMounted(() => {
  lenis = new Lenis({
    wrapper: document.getElementById("labTable"),
    autoRaf: true,
  });
  watchEffect(() => {
    myAxios
      .get(`/user/lab/${route.params.id}/reservations`)
      .then((response) => {
        if (response.data.code === 200) {
          list.value = response.data.data;
          console.log("list.value", list.value);
        } else {
          emitter.emit("alert", {
            alertType: "error",
            alertText: "获取实验室预约信息失败",
          });
        }
      });
  });
});
onUnmounted(() => {
  lenis.destroy();
});
</script>

<style lang="scss" scoped></style>
