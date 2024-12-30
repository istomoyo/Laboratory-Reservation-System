<template>
  <div v-if="courseArrary.length != 0" class="h-screen overflow-y-scroll">
    <div class="max-lg:mt-[10vh] p-10">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>专业班级</th>
            <th>课程名称</th>
            <th>课时</th>
            <th>人数</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr class="hover" v-for="(c, index) in courseArrary">
            <th>{{ index + 1 }}</th>
            <td>{{ c.major }} {{ c.classInfo }}班</td>
            <td>{{ c.name }}</td>
            <td>{{ c.lesson }}</td>
            <td>{{ c.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex " v-else>
    <div class="m-auto text-2xl font-bold tracking-wider select-none">
      您暂时没有课程
    </div>
  </div>
</template>

<script setup>
import userCourse from "@/hooks/userCourse.js";
import { onMounted, ref } from "vue";
const { getUserCourse } = userCourse();
const courseArrary = ref([]);
onMounted(() => {
  getUserCourse().then((response) => {
    console.log("course", response);
    courseArrary.value = response;
  });
});
</script>

<style lang="scss" scoped></style>
