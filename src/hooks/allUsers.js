import myAxios from "@/utils/myAxios.js";
import emitter from "@/utils/emitter.js";
export default function () {
  async function getAllUsers() {
    const response = await myAxios.get("/admin/getUsers");
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      emitter.emit("alert", {
        alertType: "error",
        alertText: "获取信息失败",
      });
    }
  }

  return { getAllUsers };
}
