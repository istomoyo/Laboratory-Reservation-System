import { ref } from "vue";
import myAxios from "@/utils/myAxios.js";
import emitter from "@/utils/emitter.js";
import { useUserStore } from "@/store/user.js";
import { storeToRefs } from "pinia";
import router from "@/router";
export default function () {
  const upwd = ref("123456");
  const uname = ref("user1");
  const tokneAddress = "NEFU_LABORATORY_RESERVATION_SYSTEM_TOKEN";
  const userStore = useUserStore();
  function loginUser(my_modal_1_close) {
    const data = {
      account: uname.value,
      password: upwd.value,
    };
    myAxios
      .post("login", data)
      .then((response) => {
        // console.log("响应数据:", response);
        if (response.data.code === 200) {
          const token = response.headers["token"];
          const { name, role } = response.data.data;
          if (token) {
            sessionStorage.setItem(tokneAddress, token);
            // console.log("Token 已保存:", token);
            emitter.emit("alert", {
              alertType: "success",
              alertText: "欢迎" + name,
            });
            userStore.userLogin(role, name);
            my_modal_1_close();
            location.reload();
            if (data.account == data.password) {
              emitter.emit("alert", {
                alertType: "warning",
                alertText: "请更改密码",
              });
            }
          }
        } else {
          emitter.emit("alert", {
            alertType: "error",
            alertText: response.data.message,
          });
        }
      })
      .catch((error) => {
        console.error("发生错误:", error);
        // emitter.emit("alert", {
        //   alertType: "error",
        //   alertText: "错误",
        // });
      });
  }
  async function isTokenCurrent() {
    try {
      const response = await myAxios.get("user/courses");
      if (response.data.code === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  return {
    upwd,
    uname,
    loginUser,
    isTokenCurrent,
  };
}
