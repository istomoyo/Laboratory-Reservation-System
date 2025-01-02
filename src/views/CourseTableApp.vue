<template>
  <div class="flex w-full h-screen min-h-screen">
    <div
      class="m-auto max-lg:mt-[10vh] w-fit min-w-[60vh] shadow-xl rounded-lg bg-white p-5"
    >
      <div class="w-4/5 p-3 mx-auto">
        <label class="w-full max-w-xs form-control">
          <div class="label">
            <span class="label-text">课程名称</span>
          </div>
          <select
            class="w-full max-w-xs select select-bordered"
            v-model="course"
          >
            <option
              v-for="(c, index) in courseList"
              :key="c.id"
              :value="{ id: c.id, name: c.name, lesson: c.lesson }"
            >
              {{ c.name }}
            </option>
          </select>
        </label>
      </div>
      <div class="w-4/5 p-3 mx-auto">
        <button class="block w-full mx-auto btn btn-ghost" @click="selectWeek">
          选择周次
        </button>
        <div class="text-center" v-if="courseTextResult.length > 0">
          你选择的是<span v-for="(r, i) in courseTextResult">{{
            `${r} ${i + 1 === courseTextResult.length ? "" : ","}`
          }}</span>
          周
        </div>
      </div>
      <div class="w-4/5 p-3 mx-auto">
        <button class="block w-full mx-auto btn btn-ghost" @click="selectTime">
          选择时间
        </button>
        <div class="text-center" v-if="courseSectionArraryData.length > 0">
          你选择的是<span v-for="(c, i) in courseSectionArraryData">{{
            `${daysOfWeek[c.dayOfWeek - 1]}-第${
              dateCourse[c.section - 1].str
            } ${i + 1 === courseSectionArraryData.length ? "" : ","}`
          }}</span>
        </div>
      </div>
      <div class="w-4/5 p-3 mx-auto">
        <label class="w-full max-w-xs form-control">
          <div class="label">
            <span class="label-text">选择实验室</span>
          </div>
          <select class="select select-bordered" v-model="lab">
            <option v-for="(c, i) in courseAllLabs" :key="i" :value="c.id">
              {{ c.name }}
            </option>
          </select>
        </label>
      </div>
      <div class="flex justify-around w-4/5 p-3 mx-auto">
        <button class="w-1/4 btn-primary btn" @click="submit">提交</button>
        <button class="w-1/4 btn" @click="fresh">取消</button>
        <label
          for="fileUpload"
          class="flex flex-col items-center cursor-pointer btn"
        >
          <span class="icon-[mdi--import] text-2xl"></span>
          <span class="text-sm">导入</span>
          <!-- 隐藏的文件输入框 -->
          <input
            type="file"
            id="fileUpload"
            ref="fileUpload"
            class="hidden"
            @change="handleFileUpload"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import getUserCourses from "@/hooks/userCourse";
import AllLabs from "@/components/AllLabs.vue";
import teachersSchedule from "@/utils/teachersSchedule.js";
import weekArr from "@/utils/weekArrary.js";
import * as XLSX from "xlsx";
import getputCourseWeeks from "@/hooks/putCourseWeeks.js";
import getlab from "@/hooks/lab.js";
const { getUserCourse } = getUserCourses();
const { putCourseWeeks } = getputCourseWeeks();
import emitter from "@/utils/emitter";
const courseList = ref([]);
const courseWeekArraryData = ref([]);
const courseSectionArraryData = ref([]);
const courseTextResult = ref([]);
const course = ref();
const dateCourse = ref([
  { str: "一二节", time: "8:00~9:35" },
  { str: "三四节", time: "9:55~11:30" },
  { str: "五六节", time: "13:40~15:15" },
  { str: "七八节", time: "15:35~17:10" },
  { str: "九十节", time: "18:00~19:35" },
  { str: "十一十二节", time: "19:40~21:15" },
]);
const daysOfWeek = ref([
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
]);
const courseAllLabs = ref([]);
const { getAllLabs } = getlab();
const lab = ref();
function selectWeek() {
  if (!course.value) {
    emitter.emit("alert", {
      alertType: "error",
      alertText: "未选择课程",
    });
    return;
  }
  // 打开选择周次的弹窗
  emitter.emit("modal", { type: "selectWeek" });
  // 创建一次性事件监听器，避免重复监听
  const handleCourseTableApp = (data) => {
    data.sort((a, b) => a - b); // 确保按数值排序
    console.log("data", data);
    // console.log("weekArr", weekArr(data));
    courseTextResult.value = weekArr(data);
    courseWeekArraryData.value = data;

    // 移除事件监听器，避免每次调用都触发
    emitter.off("CourseTableApp", handleCourseTableApp);
  };
  // 绑定事件监听器
  emitter.on("CourseTableApp", handleCourseTableApp);
}
function selectTime() {
  if (!course.value) {
    emitter.emit("alert", {
      alertType: "error",
      alertText: "未选择课程",
    });
    return;
  }

  // 打开选择时间的弹窗
  emitter.emit("modal", {
    type: "selectTime",
    data: {
      timeLine: course.value.lesson,
      WeekNum: courseWeekArraryData.value.length,
    },
  });

  // 监听课程时间提交，且确保只执行一次
  const handleSubmitTime = (data) => {
    console.log("submiteCourseTime", data);
    // 执行完后移除监听器
    courseSectionArraryData.value = data;
    emitter.off("submiteCourseTime", handleSubmitTime);
  };

  // 使用 once 也可以简化绑定，保证事件只执行一次
  emitter.on("submiteCourseTime", handleSubmitTime);
}
function fresh() {
  location.reload();
}
function submit() {
  if (!course.value) {
    emitter.emit("alert", {
      alertType: "error",
      alertText: "未选择课程",
    });
    return;
  }
  if (courseWeekArraryData.value.length === 0) {
    emitter.emit("alert", {
      alertType: "error",
      alertText: "未选择周次",
    });
    return;
  }
  if (courseSectionArraryData.value.length === 0) {
    emitter.emit("alert", {
      alertType: "error",
      alertText: "未选择时间",
    });
    return;
  }
  if (!lab.value) {
    emitter.emit("alert", {
      alertType: "error",
      alertText: "未选择实验室",
    });
    return;
  }
  putCourseWeeks(
    course.value.id,
    course.value.name,
    courseWeekArraryData.value,
    courseSectionArraryData.value,
    lab.value
  ).then(({ isTrue, resFalse }) => {
    if (isTrue) {
      emitter.emit("alert", {
        alertType: "success",
        alertText: resFalse || "预约成功",
      });
    } else {
      emitter.emit("alert", {
        alertType: "error",
        alertText: "预约失败" + resFalse,
      });
      emitter.emit("modal", { type: "Warnning", data: resFalse });
    }
  });
}
function handleFileUpload(event) {
  const file = event.target.files[0];
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      // 获取第一个工作表
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      // 转换为 JSON 格式
      const courseTableExcelData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
      });
      // console.log(courseTableExcelData);
      console.log(
        "teachersSchedule(courseTableExcelData)",
        teachersSchedule(courseTableExcelData)
      );
      // teachersSchedule(courseTableExcelData).forEach((e) => {
      //   labReveals.value.push(e);
      // });
    };
    reader.readAsBinaryString(file);
  }
}
onMounted(() => {
  getUserCourse().then((res) => {
    console.log(res);
    courseList.value = res;
  });
  getAllLabs().then((res) => {
    console.log(res);
    courseAllLabs.value = res;
  });
});
</script>

<style lang="scss" scoped></style>
