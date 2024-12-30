<template>
  <div class="flex w-full h-full">
    <div class="flex flex-col p-5 m-auto shadow-xl rounded-2xl max-w-[80%]">
      <div class="flex w-full">
        <div class="mx-5 avatar placeholder">
          <div class="w-24 h-24 rounded-full bg-neutral text-neutral-content">
            <span class="text-3xl">{{ getUserInfo().name }}</span>
          </div>
        </div>
        <div class="flex mx-5">
          <TypingEffect
            :text="
              'Hello ' + getUserInfo().name + ',你的身份是' + getUserInfo().role
            "
            class="m-auto text-2xl font-semibold"
          ></TypingEffect>
        </div>
      </div>
      <div class="flex justify-around w-full my-7">
        <button class="btn btn-primary" @click="changePassword">
          修改密码
        </button>
        <button class="btn" @click="UnLogin">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import TypingEffect from "@/components/TypingEffect.vue";
import getUser from "@/hooks/getUserInfo.js";
import router from "@/router";
import { useUserStore } from "@/store/user.js";
import { onMounted } from "vue";
import emitter from "@/utils/emitter.js";
const { setUserInfo, getUserInfo } = getUser();
const uesrStore = useUserStore();
function UnLogin() {
  uesrStore.userUnLogin();
  router.push("/home");
  emitter.emit("alert", {
    alertType: "warning",
    alertText: "您已退出登录",
  });
  setTimeout(() => {
    emitter.emit("modal", { type: "login" });
  }, 500);
}
function changePassword() {
  emitter.emit("modal", { type: "password" });
}
onMounted(() => {
  console.log("uesrStore", uesrStore.userUnLogin);
});
</script>

<style lang="scss" scoped></style>
