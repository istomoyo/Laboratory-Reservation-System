import { ref } from "vue";
import myAxios from "../utils/myAxios";
// import axios from "axios";
import emitter from "@/utils/emitter.js";
export default function () {
  async function getReservations() {
    const response = await myAxios.get("/user/teacher/reservations");
    if (response.data.code === 200) {
      if (response.data.data.length === 0) {
        emitter.emit("alert", {
          alertType: "warning",
          alertText: "您未预约实验室",
        });
      }
      console.log("response.data.data", response.data.data);
      return response.data.data;
    } else {
      emitter.emit("alert", {
        alertType: "error",
        alertText: "获取预约信息失败",
      });
    }
  }
  async function deleteReservation(id) {
    const response = await myAxios.delete(`/user/reservation/${id}`);
    if (response.data.code === 200) {
      emitter.emit("alert", {
        alertType: "success",
        alertText: "取消预约成功",
      });
      return response.data.data;
    } else {
      emitter.emit("alert", {
        alertType: "error",
        alertText: "取消预约失败",
      });
    }
  }
  return {
    getReservations,
    deleteReservation,
  };
}
