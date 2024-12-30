import { ref, reactive } from "vue";

export default function () {
  function setUserInfo(name, role) {
    sessionStorage.setItem("NEFU_LABORATORY_RESERVATION_SYSTEM_USERNAME", name);
    sessionStorage.setItem("NEFU_LABORATORY_RESERVATION_SYSTEM_USERROLE", role);
  }
  function getUserInfo() {
    const name = sessionStorage.getItem(
      "NEFU_LABORATORY_RESERVATION_SYSTEM_USERNAME"
    );
    const role = sessionStorage.getItem(
      "NEFU_LABORATORY_RESERVATION_SYSTEM_USERROLE"
    );
    // console.log(` const name = sessionStorage.getItem(
    //   "NEFU_LABORATORY_RESERVATION_SYSTEM_USERNAME"
    // );`);
    return { name, role };
  }
  return {
    setUserInfo,
    getUserInfo,
  };
}
