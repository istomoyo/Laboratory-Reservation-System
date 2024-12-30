<template>
  <div class="fixed drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div
      class="flex flex-col items-center justify-center w-full drawer-content"
    >
      <RouterView class="w-full min-h-screen"></RouterView>
      <div class="fixed top-0 shadow-xl lg:hidden navbar bg-base-100 z-[10]">
        <div class="navbar-start">
          <div class="dropdown">
            <label
              tabindex="0"
              for="my-drawer-2"
              role="button"
              class="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
        </div>
        <div class="navbar-center">
          <a class="text-xl btn btn-ghost">NEFU Laboratory</a>
        </div>
        <div class="navbar-end">
          <button
            class="btn btn-ghost btn-circle"
            @click="router.push('/userSetting')"
          >
            <div class="avatar placeholder">
              <div class="w-8 rounded-full bg-neutral text-neutral-content">
                <span class="text-xs">{{ userName?.slice(-2) }}</span>
              </div>
            </div>
          </button>
          <button
            class="btn btn-ghost btn-circle"
            @click="router.push('/announcement')"
          >
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                class="badge badge-xs badge-primary indicator-item"
                v-if="hasNewAnnoucement"
              ></span>
            </div>
          </button>
          <button class="btn btn-ghost btn-circle">
            <label class="w-8 swap swap-rotate">
              <!-- this hidden checkbox controls the state -->
              <input type="checkbox" @click="changeTheme" />

              <!-- sun icon -->
              <svg
                class="w-8 h-8 fill-current swap-on"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                />
              </svg>

              <!-- moon icon -->
              <svg
                class="w-8 h-8 fill-current swap-off"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                />
              </svg>
            </label>
          </button>
        </div>
      </div>
    </div>
    <div class="drawer-side z-[10]">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul
        class="min-h-full p-4 overflow-hidden menu bg-base-200 text-base-content w-80"
      >
        <div class="mb-10">
          <button
            class="block mx-auto text-xl btn btn-wide"
            @click="router.push('/home')"
          >
            NEFU Laboratory
          </button>
          <div class="flex justify-center p-4">
            <div class="mx-2 avatar placeholder">
              <div class="w-12 rounded-full bg-neutral text-neutral-content">
                <span>{{ userName?.substr(0, 4) }}</span>
              </div>
            </div>
            <div class="flex w-auto mx-2">
              <span class="m-auto text-xl font-medium tracking-wide">
                hello! {{ userName }}
              </span>
            </div>
          </div>
        </div>

        <li>
          <RouterLink
            class="font-bold tracking-wider"
            :to="{ path: '/home' }"
            replace
          >
            <span class="icon-[mi--home] text-xl"></span>
            首页
          </RouterLink>
        </li>
        <li>
          <details open>
            <summary class="font-bold">
              <span class="icon-[octicon--person-16] text-xl"></span> 个人信息
            </summary>
            <ul>
              <li>
                <RouterLink
                  class="tracking-wider"
                  :to="{ path: '/userCourse' }"
                >
                  <span class="icon-[streamline--class-lesson-solid]"></span>
                  我的课程
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="tracking-wider"
                  :to="{ path: '/userAppointment' }"
                >
                  <span class="icon-[solar--notebook-bold]"></span>
                  我的预约
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="tracking-wider"
                  :to="{ path: '/userSetting' }"
                >
                  <span
                    class="icon-[material-symbols--settings-rounded]"
                  ></span>
                  设置
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details open v-if="isAdmin()">
            <summary class="font-bold">
              <span class="icon-[eos-icons--admin-outlined] text-xl"></span
              >管理员
            </summary>
            <ul>
              <li>
                <RouterLink
                  class="tracking-wider"
                  :to="{ path: '/writeAnnouncement' }"
                >
                  <span class="icon-[ix--publish-document] text-xl"></span>
                  发布公告
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="tracking-wider"
                  :to="{ path: '/deleteAnnouncement' }"
                >
                  <span class="icon-[material-symbols--delete] text-xl"></span>
                  删除公告
                </RouterLink>
              </li>
              <li>
                <RouterLink class="tracking-wider" :to="{ path: '/allUsers' }">
                  <span class="icon-[lsicon--user-crowd-filled] text-xl"></span>
                  所有用户
                </RouterLink>
              </li>
              <li>
                <details open>
                  <summary class="font-bold">
                    <span class="icon-[medical-icon--laboratory] text-xl"></span
                    >实验室信息
                  </summary>
                  <ul>
                    <li>
                      <RouterLink
                        class="tracking-wider"
                        :to="{ path: '/labReservation' }"
                      >
                        <span
                          class="icon-[material-symbols--list-alt-add-sharp] text-xl"
                        ></span>
                        实验室预约记录
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink
                        class="tracking-wider"
                        :to="{ path: '/labStatus' }"
                      >
                        <span
                          class="icon-[dashicons--admin-network] text-xl"
                        ></span>
                        实验室管理
                      </RouterLink>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li class="">
          <RouterLink :to="{ path: '/announcement' }" class="font-bold">
            <span
              class="icon-[streamline--annoncement-megaphone-solid] text-xl"
            ></span>
            公告
          </RouterLink>
        </li>
        <ul
          class="flex justify-center w-full mt-auto menu menu-horizontal bg-base-200 rounded-box max-lg:hidden"
        >
          <li>
            <a>
              <label class="w-5 swap swap-rotate">
                <!-- this hidden checkbox controls the state -->
                <input type="checkbox" @click="changeTheme" />

                <!-- sun icon -->
                <svg
                  class="w-5 h-5 fill-current swap-on"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                  />
                </svg>

                <!-- moon icon -->
                <svg
                  class="w-5 h-5 fill-current swap-off"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                  />
                </svg>
              </label>
            </a>
          </li>
          <li>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </li>
          <li>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </a>
          </li>
        </ul>
      </ul>
    </div>
  </div>
  <Toast></Toast>
  <Alert></Alert>
</template>

<script setup name="App">
import { ref } from "vue";
import Lenis from "lenis";
import { onMounted, onUnmounted, computed } from "vue";
import Toast from "@/components/Modal.vue";
import Alert from "@/components/Alert.vue";
import emitter from "@/utils/emitter";
import login from "@/hooks/login.js";
const { isTokenCurrent } = login();
import { useUserStore } from "@/store/user.js";
import getUser from "@/hooks/getUserInfo.js";
import { storeToRefs } from "pinia";
import router from "./router";
import { RouterLink } from "vue-router";
const uesrStore = useUserStore();
const { user } = storeToRefs(uesrStore);
const { setUserInfo, getUserInfo } = getUser();
const userName = ref("");
import getAnnouncements from "@/hooks/announcement.js";
const { announcement, localAnnouncement } = getAnnouncements();
const hasNewAnnoucement = ref(false);
const changeTheme = () => {
  const htmlTheme = document.documentElement.dataset.theme;
  if (htmlTheme === "business") {
    document.documentElement.dataset.theme = "winter";
    localStorage.setItem(
      "NEFU_LABORATORY_RESERVATION_SYSTEM_HTMLTHEME",
      "winter"
    );
  } else if (htmlTheme === "winter") {
    document.documentElement.dataset.theme = "business";
    localStorage.setItem(
      "NEFU_LABORATORY_RESERVATION_SYSTEM_HTMLTHEME",
      "business"
    );
  }
};

const htmlThemeFisrt = () => {
  localStorage.getItem("NEFU_LABORATORY_RESERVATION_SYSTEM_HTMLTHEME") ||
    localStorage.setItem(
      "NEFU_LABORATORY_RESERVATION_SYSTEM_HTMLTHEME",
      "winter"
    );
  document.documentElement.dataset.theme = localStorage.getItem(
    "NEFU_LABORATORY_RESERVATION_SYSTEM_HTMLTHEME"
  );
};
function isAdmin() {
  console.log("user.value.role", user.value.role);
  return user.value.role === "admin";
}
onMounted(() => {
  htmlThemeFisrt();
  setTimeout(() => {
    console.log("isTokenCurrent执行了");
    isTokenCurrent().then((isCurrent) => {
      if (isCurrent) {
        emitter.emit("alert", {
          alertType: "success",
          alertText: "欢迎回来",
        });
      } else {
        emitter.emit("modal", { type: "login" });
        console.log("emit login");
      }
    });
  }, 0);

  uesrStore.$subscribe((mutate, state) => {
    // console.log("talkStore里面保存的数据发生了变化", mutate, state);
    console.log("state.user", state.user);
    setUserInfo(state.user.name, state.user.role);
    // console.log("user", user.value.name);
    userName.value = getUserInfo().name;
  });
  // console.log("user", user.value);
  userName.value = getUserInfo().name;

  announcement().then((response) => {
    const announcementId = response.reverse()[0].id;
    console.log("announcementId", announcementId);
    hasNewAnnoucement.value = localAnnouncement(announcementId);
    if (hasNewAnnoucement.value) {
      emitter.emit("alert", {
        alertType: "warning",
        alertText: "你有新公告未阅读",
      });
    }
  });
  emitter.on("hasNewAnnoucement", ({ data }) => {
    hasNewAnnoucement.value = data;
  });
});
</script>

<style lang="scss" scoped></style>
