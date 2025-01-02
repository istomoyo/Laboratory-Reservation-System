<template>
  <!-- <button class="btn" onclick="my_modal_1.showModal()">open modal</button> -->
  <dialog
    id="my_modal_1"
    class="fixed -translate-x-1/2 -translate-y-1/2 modal top-1/2 left-1/2 z-[100]"
    ref="my_modal_1"
  >
    <div class="modal-box" v-if="modalBox === 'login'">
      <div class="" id="loginBox">
        <h3 class="text-lg font-extrabold">Login</h3>
        <div class="block mx-auto avatar placeholder w-fit">
          <div class="w-24 rounded-full bg-neutral text-neutral-content">
            <span class="text-3xl">{{ uname.substr(0, 4) }}</span>
          </div>
        </div>
        <label
          class="flex items-center w-3/5 gap-2 m-5 mx-auto input input-bordered"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
            />
          </svg>
          <input
            type="text"
            class="grow"
            placeholder="Username"
            v-model="uname"
          />
        </label>
        <label
          class="flex items-center w-3/5 gap-2 m-5 mx-auto input input-bordered"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="password"
            class="grow"
            v-model="upwd"
            placeholder="Password"
            @keyup.enter="submitData"
          />
        </label>
        <div class="flex justify-center m-5" v-if="isBot">
          <input
            type="text"
            placeholder="输入验证码"
            class="w-1/3 max-w-xs mx-5 input input-bordered"
            v-model="userCode"
          /><vue-verify-code
            @getCode="getCode"
            class="mx-5"
            :length="5"
            :size="40"
            :bgColor="'#f0f0f0'"
            :color="'#ff6600'"
            :fontSize="45"
            :timer="true"
          ></vue-verify-code>
        </div>
        <button class="block w-1/4 mx-auto btn btn-primary" @click="submitData">
          提交
        </button>
      </div>
    </div>
    <div
      class="p-6 bg-white rounded-lg shadow-lg modal-box"
      v-else-if="modalBox === 'date'"
    >
      <h2 class="mb-4 text-2xl font-bold text-center">选择日期范围</h2>
      <label class="flex flex-col w-full mb-5">
        <span class="mb-2 text-lg font-medium">选择起始日期</span>
        <input
          type="date"
          class="w-3/5 px-4 py-2 mx-auto rounded-md input input-bordered input-primary"
          v-model="my_modal_1_start_date"
        />
      </label>
      <label class="flex flex-col w-full mb-8">
        <span class="mb-2 text-lg font-medium">选择截至日期</span>
        <input
          type="date"
          class="w-3/5 px-4 py-2 mx-auto rounded-md input input-bordered input-primary"
          v-model="my_modal_1_end_date"
          @keyup.enter="submitDate"
        />
      </label>
      <div class="flex">
        <button
          class="block w-2/5 py-2 mx-auto font-semibold text-white transition-all rounded-md btn btn-primary"
          @click="submitDate"
        >
          提交
        </button>
        <button
          class="py-2 font-semibold text-[#333] transition-all rounded-md btn w-2/5 mx-auto block"
          onclick="my_modal_1.close()"
        >
          取消
        </button>
      </div>
    </div>
    <div
      class="w-11/12 max-w-5xl p-6 overflow-y-scroll bg-white rounded-lg shadow-lg modal-box"
      v-else-if="modalBox === 'course'"
    >
      <h3 class="text-2xl font-bold">临时预约</h3>
      <div class="flex justify-between p-10 max-lg:flex-col">
        <div class="flex w-1/2 max-lg:w-full max-lg:my-5">
          <ul class="m-auto w-fit">
            <li
              class="block mx-auto text-xl font-semibold tracking-widest text-center"
            >
              周次:<span class="mx-5 badge">{{ labCourse?.week }}</span>
            </li>
            <li
              class="block mx-auto text-xl font-semibold tracking-widest text-center"
            >
              日期:<span class="mx-5 badge">{{ labCourse?.date }}</span>
            </li>
            <li
              class="block mx-auto text-xl font-semibold tracking-widest text-center"
            >
              星期:<span class="mx-5 badge">{{ labCourse?.day }}</span>
            </li>
            <li
              class="block mx-auto text-xl font-semibold tracking-widest text-center"
            >
              节次:<span class="mx-5 badge">{{
                dateCourse[labCourse?.section - 1]?.str
              }}</span>
            </li>
            <li
              class="block mx-auto text-xl font-semibold tracking-widest text-center"
            >
              时间:<span class="mx-5 badge">{{
                dateCourse[labCourse?.section - 1]?.time
              }}</span>
            </li>
            <li
              class="block mx-auto text-xl font-semibold tracking-widest text-center"
            >
              实验室:{{ AllLabsCom?.selectId?.labName }}
            </li>
          </ul>
        </div>
        <AllLabs
          class="w-1/2 max-lg:w-full"
          :aLabs="allLabs"
          v-if="allLabs.length != 0"
          ref="AllLabsCom"
        ></AllLabs>
      </div>
      <div class="flex">
        <button
          class="block w-2/5 py-2 mx-auto font-semibold text-white transition-all rounded-md btn btn-primary"
          @click="submitCourse"
        >
          确认
        </button>
        <button
          class="py-2 font-semibold text-[#333] transition-all rounded-md btn w-2/5 mx-auto block"
          onclick="my_modal_1.close()"
        >
          取消
        </button>
      </div>
    </div>
    <div class="modal-box" v-else-if="modalBox === 'password'">
      <h3 class="font-bold btn btn-sm">更改密码</h3>
      <label class="block max-w-[80%] mx-auto my-2 p-3">
        <span class="font-bold">新密码:</span>
        <label class="flex items-center gap-2 input input-bordered">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"
            />
          </svg>
          <input type="password" class="grow" v-model="oldPassword" />
        </label>
      </label>
      <label class="block max-w-[80%] mx-auto my-2 p-3">
        <span class="font-bold">再次输入:</span>
        <label class="flex items-center gap-2 input input-bordered">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="password"
            class="grow"
            v-model="newPassword"
            @keyup.enter="submitPassword"
          />
        </label>
      </label>
      <div class="flex my-3">
        <button
          class="block w-2/5 py-2 mx-auto font-semibold text-white transition-all rounded-md btn btn-primary"
          @click="submitPassword"
        >
          确认
        </button>
        <button
          class="py-2 font-semibold text-[#333] transition-all rounded-md btn w-2/5 mx-auto block"
          onclick="my_modal_1.close()"
        >
          取消
        </button>
      </div>
    </div>
    <div class="modal-box" v-else-if="modalBox === 'deleteReservation'">
      <h3 class="text-2xl font-bold">详细信息</h3>
      <ul class="p-5 m-5 mx-auto w-fit" v-if="unLabCourse">
        <li class="font-semibold tracking-wider">
          周次:{{ unLabCourse.week }}
        </li>
        <li class="font-semibold tracking-wider">星期:{{ unLabCourse.day }}</li>
        <li class="font-semibold tracking-wider">
          实验室名称:{{ unLabCourse.labName }}
        </li>
        <li class="font-semibold tracking-wider">
          课程名称：{{ unLabCourse.courseName }}
        </li>
        <li class="font-semibold tracking-wider">
          教师名称：{{ unLabCourse.teacherName }}
        </li>
        <li class="font-semibold tracking-wider">
          节次: {{ unLabCourse.section }}
        </li>
      </ul>
      <div class="flex">
        <button
          class="block w-2/5 py-2 mx-auto font-semibold text-white transition-all rounded-md btn btn-primary"
          @click="submitUnLabCourse"
          v-if="canDelete"
        >
          取消预约
        </button>
        <button
          class="py-2 font-semibold text-[#333] transition-all rounded-md btn w-2/5 mx-auto block"
          onclick="my_modal_1.close()"
        >
          取消
        </button>
      </div>
    </div>
    <div class="modal-box" v-else-if="modalBox === 'infoAnnouncement'">
      <h3 class="text-2xl font-bold">详细信息</h3>
      <div v-if="infoAnnouncementData">
        <h3 class="my-5 text-xl font-semibold text-center">
          {{ infoAnnouncementData.title }}
        </h3>
        <h5 class="text-sm text-right">{{ infoAnnouncementData.time }}</h5>
        <div class="text-lg font-light text-center">
          {{ infoAnnouncementData.content }}
        </div>
        <div class="flex my-5">
          <button
            class="py-2 font-semibold text-[#333] transition-all rounded-md btn w-2/5 mx-auto block"
            onclick="my_modal_1.close()"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
    <div
      class="modal-box"
      v-else-if="modalBox === 'changeLabDecorption' && decoration"
    >
      <h3 class="text-xl">修改介绍</h3>
      <div class="m-3">
        <h4 class="p-3 text-xl font-bold tracking-widest text-center">
          {{ decoration.name }}
        </h4>

        <textarea
          class="w-full h-20 resize-none textarea textarea-bordered"
          cols="30"
          rows="20"
          placeholder="输入内容"
          v-model="decoration.description"
        ></textarea>
      </div>
      <div class="flex justify-center m-5">
        <label class="flex mx-5">
          <span class="flex mx-2"><span class="m-auto">空闲</span></span>
          <input
            type="radio"
            name="radio-1"
            class="radio"
            v-model="decoration.state"
            :value="1"
        /></label>
        <label for="" class="flex mx-5">
          <span class="flex mx-2"><span class="m-auto">占用</span></span>
          <input
            type="radio"
            name="radio-1"
            class="radio"
            :value="0"
            v-model="decoration.state"
          />
        </label>
      </div>
      <div class="flex m-3">
        <button
          class="block w-2/5 py-2 mx-auto font-semibold text-white transition-all rounded-md btn btn-primary"
          @click="submitDescription"
        >
          确认
        </button>
        <button
          class="py-2 font-semibold text-[#333] transition-all rounded-md btn w-2/5 mx-auto block"
          onclick="my_modal_1.close()"
        >
          取消
        </button>
      </div>
    </div>
    <div class="modal-box" v-else-if="modalBox === 'selectWeek'">
      <h3 class="text-2xl font-medium">选择周次</h3>
      <div class="grid grid-cols-7 gap-2 my-5">
        <div class="form-control" v-for="i in 25">
          <label class="cursor-pointer label">
            <span class="label-text">{{ i }}</span>
            <input
              type="checkbox"
              class="checkbox checkbox-secondary"
              :value="i"
              v-model="selectCourseWeek"
            />
          </label>
        </div>
      </div>
      <div class="flex">
        <button
          class="block w-2/5 py-2 mx-auto font-semibold text-white transition-all rounded-md btn btn-primary"
          @click="submiteCourseWeek"
        >
          确定
        </button>
        <button
          class="py-2 font-semibold text-[#333] transition-all rounded-md btn w-2/5 mx-auto block"
          onclick="my_modal_1.close()"
        >
          取消
        </button>
      </div>
    </div>
    <div
      class="w-11/12 max-w-5xl modal-box aspect-video"
      v-else-if="modalBox === 'selectTime'"
    >
      <h3 class="text-2xl font-medium">选择时间</h3>
      <div
        class="w-max h-full flex-shrink-0 min-w-[1000px] courseTableItem courseTableItem1 max-h-screen p-5 flex"
      >
        <table
          class="h-full text-center border-collapse table-auto bg-base-200 w-[5%]"
        >
          <tbody>
            <tr>
              <th class="border h-[30px] select-none text-base leading-4"></th>
            </tr>
            <tr>
              <td class="border">
                <span>一二节</span>
                <span class="my-1 text-xs">8:00~9:35</span>
              </td>
            </tr>
            <tr>
              <td class="border">
                <span>三四节</span>
                <span class="my-1 text-xs">9:55~11:30</span>
              </td>
            </tr>
            <tr>
              <td class="border">
                <span>五六节</span>
                <span class="my-1 text-xs">13:40~15:15</span>
              </td>
            </tr>
            <tr>
              <td class="border">
                <span>七八节</span>
                <span class="my-1 text-xs">15:35~17:10</span>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          class="w-full h-full max-h-screen text-center border border-collapse table-auto tabel"
        >
          <thead class="">
            <tr>
              <th
                class="border h-[30px] select-none text-nowrap"
                v-for="i in 7"
              >
                {{ daysOfWeek[i - 1] }}
              </th>
            </tr>
          </thead>
          <tbody ref="Items">
            <!-- 示例行 -->
            <tr v-for="(e, ei) in 4" :key="ei">
              <td class="border" v-for="(p, pi) in 7" :key="pi">
                <label class="text-2xl swap swap-flip">
                  <!-- this hidden checkbox controls the state -->
                  <input
                    type="checkbox"
                    class="block w-full h-full"
                    v-model="selectTime"
                    :value="{ dayOfWeek: pi + 1, section: ei + 1 }"
                  />
                  <div class="swap-on">😈</div>
                  <div class="swap-off">😇</div>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex w-4/5 mx-auto">
        <button
          class="block w-2/5 py-2 mx-auto font-semibold text-white transition-all rounded-md btn btn-primary"
          :class="
            selectTime.length * 2 * WeekNum > timeLine ? 'btn-disabled' : ''
          "
          @click="submiteCourseTime"
        >
          确定
        </button>
        <button
          class="py-2 font-semibold text-[#333] transition-all rounded-md btn w-2/5 mx-auto block"
          onclick="my_modal_1.close()"
        >
          取消
        </button>
      </div>
    </div>
    <div class="modal-box" v-else-if="modalBox === 'selectLabs'">
      <h3 class="text-2xl font-medium">选择实验室</h3>
      <div class="w-full">
        <AllLabs></AllLabs>
      </div>
      <div class="flex">
        <button
          class="block w-2/5 py-2 mx-auto font-semibold text-white transition-all rounded-md btn btn-primary"
          @click="submiteCourseLab"
        >
          确定
        </button>
        <button
          class="py-2 font-semibold text-[#333] transition-all rounded-md btn w-2/5 mx-auto block"
          onclick="my_modal_1.close()"
        >
          取消
        </button>
      </div>
    </div>
    <div class="modal-box" v-else-if="modalBox === 'Warnning'">
      <h3 class="text-2xl font-medium">Warnning</h3>
      <div class="w-full">{{ warnningData.message }}</div>
      <button
        class="py-2 font-semibold text-[#333] transition-all rounded-md btn w-2/5 mx-auto block"
        onclick="my_modal_1.close()"
      >
        关闭
      </button>
    </div>
  </dialog>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import date from "@/hooks/date.js";
import login from "@/hooks/login.js";
import usePassword from "@/hooks/userPassword.js";
import emitter from "@/utils/emitter";
import VueVerifyCode from "vue-verify-code";
import getUserReservation from "@/hooks/userReservation.js";
import lab from "@/hooks/lab.js";
import AllLabs from "./AllLabs.vue";
import getAllStateLabs from "@/hooks/getStateLab.js";
const { getStatusLab } = getAllStateLabs();
const { upwd, uname, loginUser, isTokenCurrent } = login();
const { oldPassword, newPassword, changePassword } = usePassword();
const { getAllLabs, postCourseLab, putLabDescriptionAndState } = lab();
const decoration = ref({});
const modalBox = ref(null);
const isBot = ref();
const userCode = ref();
const labCourse = ref();
const selectCourseWeek = ref([]);
const warnningData = ref();
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
const selectTime = ref([]);
let currentCode;
const AllLabsCom = ref();
const timeLine = ref();
const WeekNum = ref();
const {
  courseArraryDataAction,
  my_modal_1_start_date,
  my_modal_1_end_date,
  courseArraryData,
  getSchoolDay,
} = date();
const allLabs = ref([]);
const unLabCourse = ref();
const canDelete = ref();
const { deleteReservation } = getUserReservation();
function submitData() {
  if (uname.value == "" || upwd.value == "") {
    emitter.emit("alert", {
      alertType: "error",
      alertText: "用户名或密码格式错误",
    });
    return;
  }
  loginUser(my_modal_1_close);
}
const infoAnnouncementData = ref(null);
const submitDate = () => {
  const deadLine = "2020-01-01";
  console.log("my_modal_1_start_date", my_modal_1_start_date.value);
  console.log("my_modal_1_end_date", my_modal_1_end_date.value);
  const startDate = new Date(my_modal_1_start_date.value);
  const endDate = new Date(my_modal_1_end_date.value);
  const deadDate = new Date(deadLine);
  if (
    isNaN(startDate) ||
    isNaN(endDate) ||
    !startDate ||
    !endDate ||
    startDate <= deadDate ||
    endDate <= deadDate
  ) {
    emitter.emit("alert", {
      alertType: "error",
      alertText: "无效的日期",
    });
    return;
  }
  // 比较日期
  if (startDate >= endDate) {
    emitter.emit("alert", {
      alertType: "error",
      alertText: "无效的日期",
    });
    return;
  }
  console.log("getSchoolDay()");
  getSchoolDay();
  // emitter.emit("",)
  // console.log("courseArraryData.value", courseArraryData.value);
  emitter.emit("date", {
    arr: courseArraryData.value,
  });
  my_modal_1_close();
};
function submitPassword() {
  if (!oldPassword.value || !newPassword.value) {
    emitter.emit("alert", {
      alertType: "error",
      alertText: "密码不能为空",
    });
    return;
  }
  if (oldPassword.value !== newPassword.value) {
    emitter.emit("alert", {
      alertType: "error",
      alertText: "两次密码不一致",
    });
    return;
  }
  changePassword();
}
function getCode(code) {
  // 接收正确的验证码
  currentCode = code;

  // console.log(code);
}
function my_modal_1_close() {
  setTimeout(() => {
    my_modal_1.close();
  }, 0);
}

function submitUnLabCourse() {
  deleteReservation(unLabCourse.value.id).then((response) => {
    emitter.emit("refersh", response);
    my_modal_1_close();
  });
}

function submitCourse() {
  if (AllLabsCom.value.selectId) {
    postCourseLab(
      +labCourse.value.week,
      +labCourse.value.weekday,
      `${labCourse.value.section}`,
      AllLabsCom.value?.selectId?.labId
    ).then((response) => {
      console.log("refersh_submitCourse", response);
      emitter.emit("refersh", response);

      my_modal_1_close();
    });
  } else {
    emitter.emit("alert", {
      alertType: "warning",
      alertText: "请选择实验室",
    });
  }
}

function submitDescription() {
  // console.log(
  //   "decoration.value.id, decoration.value.description",
  //   decoration.value.id,
  //   decoration.value.description
  // );
  putLabDescriptionAndState(
    decoration.value.id,
    decoration.value.description,
    decoration.value.state
  );
  my_modal_1_close();
}
function submiteCourseTime() {
  console.log("submiteCourseTime", selectTime.value);
  emitter.emit("submiteCourseTime", selectTime.value);
  my_modal_1_close();
}
function submiteCourseWeek() {
  // console.log("selectCourseWeek", selectCourseWeek.value);
  emitter.emit("CourseTableApp", selectCourseWeek.value);
  my_modal_1_close();
}
function submiteCourseLab() {}
onMounted(() => {
  emitter.on("modal", (item) => {
    modalBox.value = item.type;
    setTimeout(() => {
      my_modal_1.showModal();
      if (modalBox.value === "date") {
        courseArraryDataAction();
        emitter.emit("date", {
          arr: courseArraryData.value,
        });
      } else if (modalBox.value === "course") {
        console.log("item.labCourse", item.labCourse);
        // getAllLabs().then((response) => {
        //   console.log("getAllLabs().then", response);
        //   allLabs.value = response;
        // });
        getStatusLab(
          item.labCourse.week,
          item.labCourse.weekday,
          item.labCourse.section
        ).then((data) => {
          console.log("getStatusLab", data);
          allLabs.value = data;
        });
        labCourse.value = item.labCourse;
      } else if (modalBox.value === "deleteReservation") {
        unLabCourse.value = item.data;
        canDelete.value = item.canDelete;
      } else if (modalBox.value === "infoAnnouncement") {
        infoAnnouncementData.value = {
          title: item.data.title,
          content: item.data.content,
          time: item.data.time,
        };
      } else if (modalBox.value === "changeLabDecorption") {
        decoration.value = {
          id: item.data.id,
          description: item.data.description,
          name: item.data.name,
          state: item.data.state,
        };
      } else if (modalBox.value === "selectTime") {
        timeLine.value = item.data.timeLine;
        WeekNum.value = item.data.WeekNum;
        console.log("timeLine WeekNum", timeLine.value, WeekNum.value);
      } else if (modalBox.value === "Warnning") {
        warnningData.value = item.data;
        console.log("warnningData", item.data);
      }
    }, 0);
  });
});
</script>

<style lang="scss" scoped></style>
