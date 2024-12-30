import { ref } from "vue";
import myAxios from "@/utils/myAxios.js";
import emitter from "@/utils/emitter.js";
import router from "@/router";
import { useUserStore } from "@/store/user.js";
export default function () {
  const oldPassword = ref("");
  const newPassword = ref("");
  const uesrStore = useUserStore();
  function changePassword() {
    myAxios
      .patch(`/user/password/${newPassword.value}`, {
        password: newPassword.value,
      })
      .then((response) => {
        console.log("更改", response.data);
        if (response.data.code === 200) {
          emitter.emit("alert", {
            alertType: "success",
            alertText: response.data.message,
          });
          uesrStore.userUnLogin();
          router.push("/");
          emitter.emit("modal", { type: "login" });
        } else {
          emitter.emit("alert", {
            alertType: "error",
            alertText: "更改失败",
          });
        }
      });
  }
  return {
    oldPassword,
    newPassword,
    changePassword,
  };
}
