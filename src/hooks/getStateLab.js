import myAxios from "@/utils/myAxios.js";
import emitter from "@/utils/emitter.js";
export default function () {
  async function getStatusLab(week, dayOfWeek, section) {
    console.log("week,dayOfWeek,section", week, dayOfWeek, section);
    const response = await myAxios.get(
      `/user/free-slots/${week}/${dayOfWeek}/${section}`
    );
    console.log("空闲实验室",response);
    if (response.data.code !== 200) {
      emitter.emit("alert", {
        alertType: "error",
        alertText: "获取空闲实验室错误",
      });
    } else {
      return response.data.data;
    }
  }
  return {
    getStatusLab,
  };
}
