import { ref, reactive } from "vue";
import getWeekInfo from "@/utils/day.js";
import getSunDay from "@/utils/getSunDay.js";
import deepUnique from "@/utils/deepUnique.js";
export default function () {
  const my_modal_1_start_date = ref(null);
  const my_modal_1_end_date = ref(null);
  // 具体课程数据
  const courseArraryData = ref([]);
  const courseItemRefs = ref([]);
  const getWeekNumber = ref(0);
  const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;
  const weekInfoP = reactive(
    getWeekInfo(new Date() - sevenDaysInMillis).weekDates
  );
  const weekInfoT = reactive(getWeekInfo(new Date()).weekDates);
  const weekInfoA = reactive(
    getWeekInfo(new Date(new Date().getTime() + sevenDaysInMillis)).weekDates
  );
  function courseArraryDataAction() {
    // 获取开始与结束时间
    const start_Date = localStorage.getItem(
      "NEFU_LABORATORY_RESERVATION_SYSTEM_COURSSTARTDATE"
    );
    const end_Date = localStorage.getItem(
      "NEFU_LABORATORY_RESERVATION_SYSTEM_COURSENDDATE"
    );
    if (start_Date && end_Date) {
      // 赋值
      my_modal_1_start_date.value = JSON.parse(start_Date);
      my_modal_1_end_date.value = JSON.parse(end_Date);

      let start_date = my_modal_1_start_date.value;
      let end_date = my_modal_1_end_date.value;
      const d1 = new Date(start_date);
      const d2 = new Date(end_date);
      let dataArrary = [];
      dataArrary.push(
        getWeekInfo(new Date(d1.getTime() - sevenDaysInMillis)).weekDates
      );
      getSunDay(start_date, end_date).forEach((e) => {
        dataArrary.push(getWeekInfo(e).weekDates);
      });
      dataArrary.push(getWeekInfo(d1).weekDates);
      dataArrary.push(getWeekInfo(d2).weekDates);
      dataArrary.push(
        getWeekInfo(new Date(d2.getTime() + sevenDaysInMillis)).weekDates
      );
      dataArrary = deepUnique(dataArrary);
      console.log(dataArrary);
      courseArraryData.value = dataArrary;
    } else {
      courseArraryData.value.push(weekInfoP);
      courseArraryData.value.push(weekInfoT);
      courseArraryData.value.push(weekInfoA);
    }
  }
  function getSchoolDay() {
    console.log("触发getSchoolDay");
    let start_date = my_modal_1_start_date.value;
    let end_date = my_modal_1_end_date.value;

    const d1 = new Date(start_date);
    const d2 = new Date(end_date);
    let dataArrary = [];
    dataArrary.push(
      getWeekInfo(new Date(d1 - sevenDaysInMillis)).weekDates
    );
    getSunDay(start_date, end_date).forEach((e) => {
      dataArrary.push(getWeekInfo(e).weekDates);
    });
    dataArrary.push(getWeekInfo(d1).weekDates);
    dataArrary.push(getWeekInfo(d2).weekDates);
    dataArrary.push(getWeekInfo(new Date(d2 + sevenDaysInMillis)).weekDates);
    dataArrary = deepUnique(dataArrary);
    console.log("dataArrary", dataArrary);
    courseArraryData.value = dataArrary;
    localStorage.setItem(
      "NEFU_LABORATORY_RESERVATION_SYSTEM_COURSSTARTDATE",
      JSON.stringify(start_date)
    );
    localStorage.setItem(
      "NEFU_LABORATORY_RESERVATION_SYSTEM_COURSENDDATE",
      JSON.stringify(end_date)
    );
  }
  return {
    my_modal_1_start_date,
    my_modal_1_end_date,
    courseArraryDataAction,
    getSchoolDay,
    courseArraryData,
  };
}
