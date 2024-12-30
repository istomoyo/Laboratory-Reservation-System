import { ref } from "vue";
import myAxios from "../utils/myAxios";
import axios from "axios";
import emitter from "@/utils/emitter.js";

export default function () {
  async function getUserCourse() {
    const response = await myAxios.get("user/courses");
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      emitter.emit("alert", {
        alertType: "error",
        alertText: "获取课程信息失效",
      });
    }
  }

  return { getUserCourse };
}
