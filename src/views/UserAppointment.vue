<template>
  <div class="max-lg:mt-[10vh] p-10 overflow-y-scroll h-screen" id="lenisTable">
    <table class="table" v-if="userReservations">
      <!-- head -->
      <thead>
        <tr class="">
          <th></th>
          <th>课程名称</th>
          <th>教师</th>
          <th>节次</th>
          <th>星期</th>
          <th>周次</th>
          <th>实验室名称</th>
        </tr>
      </thead>
      <tbody class="">
        <!-- row 1 -->
        <tr
          v-for="(ur, index) in userReservations"
          class="hover:bg-[#87CEEB] transition-opacity hover:text-white"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ ur.courseName }}</td>
          <td>{{ ur.teacherName }}</td>
          <td>{{ dateCourse[+ur.section - 1].str }}</td>
          <td>周{{ week[+ur.dayOfWeek - 1] }}</td>
          <td>{{ ur.week }}</td>
          <td>{{ ur.labName }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="flex">
      <span class="m-auto ">您暂时没有预约记录</span>
    </div>
  </div>
</template>

<script setup>
import Lenis from "lenis";
import { onMounted, ref } from "vue";
import getUserReservations from "@/hooks/userReservation.js";
const { getReservations } = getUserReservations();
const userReservations = ref([]);
const dateCourse = ref([
  { str: "一二节", time: "8:00~9:35" },
  { str: "三四节", time: "9:55~11:30" },
  { str: "五六节", time: "13:40~15:15" },
  { str: "七八节", time: "15:35~17:10" },
  { str: "九十节", time: "18:00~19:35" },
  { str: "十一十二节", time: "19:40~21:15" },
]);
const week = ["一", "二", "三", "四", "五", "六", "日"];
onMounted(() => {
  const lenis = new Lenis({
    wrapper: document.getElementById("lenisTable"),
    autoRaf: true,
  });
  getReservations().then((reservations) => {
    console.log("reservations", reservations);
    userReservations.value = reservations;
  });
});
</script>

<style lang="scss" scoped></style>
