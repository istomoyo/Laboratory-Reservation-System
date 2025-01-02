import { createRouter, createWebHistory } from "vue-router";
import getUserInfoS from "@/hooks/getUserInfo.js";

import emitter from "@/utils/emitter.js";
const { getUserInfo } = getUserInfoS();
import HomeView from "@/views/HomeView.vue";
import userAppointment from "@/views/UserAppointment.vue";
import userSetting from "@/views/UserSetting.vue";
import Announcement from "@/views/Announcement.vue";
import UserCourse from "@/views/UserCourse.vue";
import WriteAnnouncement from "@/views/WriteAnnouncement.vue";
import LabReservation from "@/views/LabReservation.vue";
import Lab from "@/views/Lab.vue";
import DeleteAnnouncement from "@/views/DeleteAnnouncement.vue";
import LabStatus from "@/views/LabStatus.vue";
import AllUsers from "@/views/AllUsers.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      component: HomeView,
    },
    {
      path: "/userAppointment",
      component: userAppointment,
    },
    {
      path: "/userSetting",
      component: userSetting,
    },
    {
      path: "/announcement",
      component: Announcement,
    },
    {
      path: "/userCourse",
      component: UserCourse,
    },
    {
      path: "/writeAnnouncement",
      component: WriteAnnouncement,
      meta: { requiresAuth: true },
    },
    {
      path: "/labReservation",
      component: LabReservation,
      meta: { requiresAuth: true },
      children: [
        {
          name: "lab",
          path: "lab/:id",
          component: Lab,
        },
      ],
    },
    {
      path: "/DeleteAnnouncement",
      component: DeleteAnnouncement,
      meta: { requiresAuth: true },
    },
    {
      path: "/labStatus",
      component: LabStatus,
      meta: { requiresAuth: true },
    },
    {
      path: "/allUsers",
      component: AllUsers,
      meta: { requiresAuth: true },
    },
    {
      path: "/courseTableApp",
      component: () => import("@/views/CourseTableApp.vue"),
    },

    {
      path: "/",
      redirect: "/home",
    },
  ],
});
// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log("全局前置守卫触发");

  // 判断路由是否需要权限
  if (to.meta.requiresAuth) {
    const isAuthenticated = getUserInfo().role === "admin"; // 模拟用户未登录
    if (!isAuthenticated) {
      emitter.emit("alert", {
        alertType: "error",
        alertText: "非法访问",
      });
      return next("/home"); // 跳转到登录页
    }
  }
  next(); // 继续导航
});
export default router;
