// {
//     "teacherName": "王波",
//     "course": {
//         "name": "电磁场与电磁波",
//         "class": "电子信息类2023-06",
//         "week": "13周",
//         "session": "01-02"
//     }
// }

import myAxios from "@/utils/myAxios.js";
import emitter from "@/utils/emitter.js";
import { ref } from "vue";
export default function () {
  const labReveals = ref([]);
  async function getAllLabs() {
    const response = await myAxios.get("user/labs");
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      emitter.emit("alert", {
        alertType: "error",
        alertText: "实验室获取信息失败",
      });
      return;
    }
  }
  async function postCourseLab(week, dayOfWeek, section, labId) {
    const response = await myAxios.post("user/reserveTemporary", {
      courseId: "12046159231",
      courseName: "temp",
      week,
      dayOfWeek,
      section,
      labId,
    });
    if (response.data.code === 200) {
      emitter.emit("alert", {
        alertType: "success",
        alertText: "预约成功",
      });
      return response.data.data;
    }
  }
  async function putLabDescriptionAndState(id, description, state) {
    console.log("id, description,state", id, description, state);
    const response = await myAxios.put(
      `/admin/labs/description/${id}?description=${encodeURIComponent(
        description
      )}`
    );
    const response1 = await myAxios.put(
      `/admin/labs/state/${id}?state=${state}`
    );

    console.log("response response1", response, response1);
    if (response.data.code === 200 && response1.data.code === 200) {
      console.log("response", response);
      emitter.emit("alert", {
        alertType: "success",
        alertText: "更改状态成功",
      });
      emitter.emit("labStatus");
    } else {
      emitter.emit("alert", {
        alertType: "error",
        alertText: "更改状态失败",
      });
    }
  }
  return {
    labReveals,
    getAllLabs,
    postCourseLab,
    putLabDescriptionAndState,
  };
}
