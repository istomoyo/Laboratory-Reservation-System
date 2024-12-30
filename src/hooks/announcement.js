import myAxios from "@/utils/myAxios.js";
import emitter from "@/utils/emitter.js";
export default function () {
  async function announcement() {
    const response = await myAxios.get("user/announcements");
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      emitter.emit("alert", {
        alertType: "error",
        alertText: "公告获取失败",
      });
    }
  }
  function localAnnouncement(announcementId) {
    const local = "NEFU_LABORATORY_RESERVATION_SYSTEM_ANNOUNCEMENTFIRST";
    if (!localStorage.getItem(local)) {
      localStorage.setItem(local, announcementId);
      return true;
    }
    if (announcementId === localStorage.getItem(local)) {
      return false;
    } else {
      return true;
    }
  }
  function unLocalAnnouncement() {
    const local = "NEFU_LABORATORY_RESERVATION_SYSTEM_ANNOUNCEMENTFIRST";
    localStorage.removeItem(local);
  }

  return { announcement, localAnnouncement, unLocalAnnouncement };
}
