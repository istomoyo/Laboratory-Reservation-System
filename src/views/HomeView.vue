<template>
  <div ref="courseTables" class="min-h-screen overflow-y-scroll">
    <div
      class="flex justify-center text-xl font-extrabold text-center max-lg:mt-20 h-[5%]"
      ref="courseTableHead"
    >
      <span
        class="icon-[material-symbols--arrow-circle-left-rounded] btn btn-sm text-base leading-4"
        @click="weekCurrentNumber--"
        :class="weekCurrentNumber <= 1 ? 'btn-disabled' : ''"
      ></span>
      <!-- <span class="mx-5 tracking-widest leading-[2rem] text-base"
        >第{{ getWeekNumber + 1 }}周</span
      > -->
      <span class="mx-5 tracking-widest leading-[2rem] text-base"
        >第
        <input
          type="text"
          class="input-sm w-[50px] input input-ghost border-0"
          v-model="weekCurrentNumber"
          @wheel="handleScrollWeek"
        />周</span
      >
      <span
        class="icon-[material-symbols--arrow-circle-right-rounded] btn btn-sm text-base leading-4"
        @click="weekCurrentNumber++"
        :class="weekCurrentNumber >= courseArrData.length ? 'btn-disabled' : ''"
      ></span>
      <span
        class="icon-[material-symbols--settings-rounded] btn btn-ghost btn-circle btn-sm text-2xl leading-4"
        @click="dateO"
      ></span>
    </div>
    <div class="flex w-full h-[95%]">
      <table
        class="z-[5] h-full text-center border-collapse table-auto bg-base-200 w-[5%]"
      >
        <tbody>
          <tr>
            <th class="border h-[30px] select-none text-base leading-4"></th>
          </tr>
          <tr>
            <td class="border">
              <span>一二节</span> <span class="my-1 text-xs">8:00~9:35</span>
            </td>
          </tr>
          <tr>
            <td class="border">
              <span>三四节</span> <span class="my-1 text-xs">9:55~11:30</span>
            </td>
          </tr>
          <tr>
            <td class="border">
              <span>五六节</span> <span class="my-1 text-xs">13:40~15:15</span>
            </td>
          </tr>
          <tr>
            <td class="border">
              <span>七八节</span> <span class="my-1 text-xs">15:35~17:10</span>
            </td>
          </tr>
          <tr>
            <td class="border">
              <span>九十节</span> <span class="my-1 text-xs">18:00~19:35</span>
            </td>
          </tr>
          <tr>
            <td class="border">
              <span>十一十二节</span>
              <span class="my-1 text-xs">19:40~21:15</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="flex flex-shrink-0 h-full overflow-x-auto courseTable w-fit z-[4]"
        ref="courseTable"
        id="courseTable"
        v-if="freshCourseTable"
        @click="handleClick"
      >
        <CourseTableItem
          v-if="courseArrData[getWeekNumber] && reservationsArray.length != 0"
          :weekInfo="courseArrData[getWeekNumber]"
          :reservationsArray="reservationsArray[getWeekNumber]"
          :today="today"
          :week="getWeekNumber"
          :key="getWeekNumber + reservationsArray[getWeekNumber].length"
          class="courseItemRefs"
        ></CourseTableItem>
      </div>
    </div>
  </div>
</template>

<script setup>
import throttle from "@/utils/throttle.js";
import getWeekInfo from "@/utils/day.js";
import date from "@/hooks/date.js";
import CourseTableItem from "@/components/CourseTableItem.vue";
import { onMounted, ref, reactive, nextTick, watch, computed } from "vue";
import lab from "@/hooks/lab.js";
import emitter from "@/utils/emitter.js";
import isAfterTimeRange from "@/utils/timeRange.js";
import getUserReservations from "@/hooks/userReservation.js";
import userCoure from "@/hooks/userCourse.js";
const today = ref(getWeekInfo(new Date()).today);
const Items = ref(null);
const courseTable = ref(null);
const courseTables = ref(null);
const courseTableHead = ref(null);
const my_modal_1f = ref(null);
const { courseArraryDataAction, courseArraryData } = date();
// 具体课程数据
const courseArrData = ref([]);
const courseItemRefs = ref([]);
const getWeekNumber = ref(0);
const freshCourseTable = ref(true);
const count = ref(0);
const { labReveals } = lab();
const weekCurrentNumber = ref(1);
const { getReservations } = getUserReservations();
const userReservations = ref(null);
function isRange(num) {
  if (num > 0 && num <= courseArrData.value.length) {
    return true;
  } else {
    return false;
  }
}
function dateO() {
  emitter.emit("modal", { type: "date" });
}
function handleClick(event) {
  // 使用 closest() 查找最近的 div
  const clickedDiv = event.target.closest(".courseButton");
  const dateCourse = [
    { str: "一二节", time: "8:00~9:35" },
    { str: "三四节", time: "9:55~11:30" },
    { str: "五六节", time: "13:40~15:15" },
    { str: "七八节", time: "15:35~17:10" },
    { str: "九十节", time: "18:00~19:35" },
    { str: "十一十二节", time: "19:40~21:15" },
  ];
  if (clickedDiv.dataset.hascourse) {
    let date = clickedDiv.dataset.date;
    let year = clickedDiv.dataset.year;
    let section = clickedDiv.dataset.section;
    const labCourse = {
      day: clickedDiv.dataset.day,
      labName: clickedDiv.dataset.labname,
      teacherName: clickedDiv.dataset.teachername,
      section: clickedDiv.dataset.section,
      courseName: clickedDiv.dataset.coursename,
      id: clickedDiv.dataset.id,
      week: +getWeekNumber.value + 1,
    };
    if (isAfterTimeRange(`${year}-${date} ${dateCourse[section - 1].time}`)) {
      emitter.emit("modal", {
        type: "deleteReservation",
        data: labCourse,
        canDelete: false,
      });
    } else {
      emitter.emit("modal", {
        type: "deleteReservation",
        data: labCourse,
        canDelete: true,
      });
    }
  } else {
    const labCourse = {
      section: clickedDiv.dataset.section,
      weekday: clickedDiv.dataset.weekday,
      week: +getWeekNumber.value + 1,
      day: clickedDiv.dataset.day,
      date: clickedDiv.dataset.date,
      year: clickedDiv.dataset.year,
    };
    if (
      isAfterTimeRange(
        `${labCourse.year}-${labCourse.date} ${
          dateCourse[labCourse.section - 1].time
        }`
      )
    ) {
      emitter.emit("alert", {
        alertType: "error",
        alertText: "人生真是匆匆啊",
      });
    } else {
      emitter.emit("modal", { type: "course", labCourse });
    }
  }
  // console.log("ladbCourse", labCourse);
}
const lastScrollTop = ref(0);
const handleScrollWeek = throttle((event) => {
  // 阻止页面的默认滚动行为
  event.preventDefault();

  // 禁用页面滚动
  document.body.style.overflow = "hidden"; // 禁止滚动

  // 根据滚动方向修改 weekCurrentNumber
  if (event.deltaY > 0) {
    console.log("向下滚动");
    weekCurrentNumber.value++;
  } else {
    console.log("向上滚动");
    weekCurrentNumber.value--;
  }

  // 解除禁用页面滚动
  setTimeout(() => {
    document.body.style.overflow = ""; // 恢复滚动
  }, 100); // 根据需求调整延时
}, 100);

const reservationsArray = ref([]);
function updateData() {
  console.log("updateData");
  setTimeout(() => {
    courseArraryDataAction();
    courseArrData.value.splice(0, courseArrData.value.length);
    courseArrData.value = courseArraryData.value;
    emitter.on("date", ({ arr }) => {
      courseArrData.value.splice(0, courseArrData.value.length);
      courseArrData.value = arr;
    });

    console.log("courseArrData", courseArrData.value);
  }, 0);
  getReservations().then((reservations) => {
    console.log("reservations", reservations);
    let reservationsArr = reservations.map(
      ({
        courseName,
        labId,
        labName,
        section,
        teacherName,
        week,
        dayOfWeek,
        id,
      }) => {
        return {
          courseName,
          labId,
          labName,
          section,
          teacherName,
          week,
          dayOfWeek,
          id,
        };
      }
    );
    let reservationsArray_value = Array.from(
      { length: courseArrData.value.length },
      () => []
    );

    reservationsArr.forEach((r) => {
      if (
        Number.isInteger(r.week) &&
        r.week > 0 &&
        r.week <= reservationsArray_value.length
      ) {
        reservationsArray_value[r.week - 1].push(r); // 正常添加
      }
    });

    reservationsArray.value = [...reservationsArray_value];
    console.log("reservationsArray", reservationsArray.value);
  });
}
onMounted(() => {
  //周次
  emitter.on("refersh", (response) => {
    console.log("refersh", response);
    let reservationsArr = response.map(
      ({
        courseName,
        labId,
        labName,
        section,
        teacherName,
        week,
        dayOfWeek,
        id,
      }) => {
        return {
          courseName,
          labId,
          labName,
          section,
          teacherName,
          week,
          dayOfWeek,
          id,
        };
      }
    );
    console.log("fresh");
    updateData();
  });
  const stopWatch = watch(weekCurrentNumber, (newValue, oldValue) => {
    console.log("weekCurrentNumber", newValue, oldValue);
    if (!weekCurrentNumber.value) return;
    if (isRange(newValue)) {
      getWeekNumber.value = newValue - 1;
    } else if (newValue > courseArrData.value.length) {
      weekCurrentNumber.value = courseArrData.value.length;
    } else if (newValue < 1) {
      weekCurrentNumber.value = 1;
    }
  });

  updateData();
});
</script>

<style scoped>
th.border {
  width: 100px;
  min-width: 100px;
}
td.border {
  width: 100px;
  height: 100px;
  max-height: 100px;
  min-width: 100px;
}
</style>
