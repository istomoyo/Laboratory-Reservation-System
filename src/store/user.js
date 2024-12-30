// {
//     "id": "1319917133948092416",
//     "name": "BO",
//     "account": "user1",
//     "role": "user",
//     "createTime": "2024-12-21T14:37:26",
//     "updateTime": "2024-12-25T18:25:07"
// }

import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import myAxios from "@/utils/MyAxios";
import getAnnouncement from "@/hooks/announcement.js";
import getUserInfos from "../hooks/getUserInfo.js";
const { unLocalAnnouncement } = getAnnouncement();
const { setUserInfo, getUserInfo } = getUserInfos();
export const useUserStore = defineStore("nowDay", () => {
  const tokneAddress = "NEFU_LABORATORY_RESERVATION_SYSTEM_TOKEN";
  const user = ref({
    role: getUserInfo().role,
    name: getUserInfo().name,
  });
  function userLogin(urole, uname) {
    user.value.role = urole;
    user.value.name = uname;
    setUserInfo(uname, urole);
  }
  function userUnLogin() {
    sessionStorage.setItem(tokneAddress, "");
    user.value.name = "";
    user.value.role = "";
    unLocalAnnouncement();
  }
  return { user, userLogin, userUnLogin };
});
