import Myaxios from "@/utils/myAxios.js";
import { ref } from "vue";

export default function () {
  async function putCourseWeeks(
    courseId,
    courseName,
    courseWeekArraryData,
    courseSectionArraryData,
    lab
  ) {
    console.log(
      `courseId,
    courseWeekArraryData,
    courseSectionArraryData,
    lab`,
      courseId,
      courseWeekArraryData,
      courseSectionArraryData,
      lab
    );
    let result = [];
    let temp = [];
    let isTrue = true;
    for (let i = 0; i < courseWeekArraryData.length; i++) {
      // 如果当前元素是第一个元素或当前元素与前一个元素不连续
      if (
        i === 0 ||
        courseWeekArraryData[i] !== courseWeekArraryData[i - 1] + 1
      ) {
        // 如果 temp 数组已有元素，合并成范围字符串
        if (temp.length > 1) {
          result.push({ startWeek: temp[0], endWeek: temp[temp.length - 1] });
        } else if (temp.length === 1) {
          result.push({ startWeek: temp[0], endWeek: temp[0] });
        }
        // 重新开始新的连续序列
        temp = [courseWeekArraryData[i]];
      } else {
        temp.push(courseWeekArraryData[i]);
      }
    }

    // 最后处理一次 temp 中的元素
    if (temp.length > 1) {
      result.push({ startWeek: temp[0], endWeek: temp[temp.length - 1] });
    } else if (temp.length === 1) {
      result.push({ startWeek: temp[0], endWeek: temp[0] });
    }

    // result.forEach((item) => {
    //   courseSectionArraryData.forEach((section) => {
    //     Myaxios.post("/admin/user/reserve-range", {
    //       courseId: courseId,
    //       startWeek: item.startWeek,
    //       endWeek: item.endWeek,
    //       dayOfWeek: section.dayOfWeek,
    //       section: section.section,
    //       labId: lab,
    //     });
    //   });
    // });
    const requests = [];
    result.forEach((item) => {
      courseSectionArraryData.forEach((section) => {
        requests.push(
          Myaxios.post("/user/reserve-range", {
            courseId: courseId,
            courseName: courseName,
            startWeek: item.startWeek,
            endWeek: item.endWeek,
            dayOfWeek: section.dayOfWeek,
            section: section.section,
            labId: lab,
          })
          //   console.log({
          //     courseId: courseId,
          //     courseName: courseName,
          //     startWeek: item.startWeek,
          //     endWeek: item.endWeek,
          //     dayOfWeek: section.dayOfWeek,
          //     section: section.section,
          //     labId: lab,
          //   })
        );
      });
    });
    let resFalse = [];
    // 使用 Promise.all 并行发送所有请求
    const responses = await Promise.all(requests);
    console.log(responses);
    responses.forEach((response) => {
      if (response.data.code !== 200) {
        isTrue = false;
        resFalse.push(response.data);
      }
    });
    return { isTrue, resFalse };
  }
  return {
    putCourseWeeks,
  };
}
