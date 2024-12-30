<template>
  <div class="flex">
    <div
      class="w-4/5 m-auto text-center border border-base-content card bg-base-100 aspect-video"
    >
      <div class="card-body">
        <label class="w-full max-w-xs mx-auto form-control">
          <div class="label">
            <span class="font-semibold label-text">输入标题</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="w-full max-w-xs input input-bordered"
            v-model="title"
          />
        </label>
        <label class="form-control">
          <div class="label">
            <span class="font-semibold label-text">输入内容</span>
          </div>
          <textarea
            class="h-40 resize-none textarea textarea-bordered"
            cols="30"
            rows="20"
            placeholder="输入内容"
            v-model="content"
          ></textarea>
        </label>
        <div class="flex mt-10">
          <button
            class="block w-2/5 py-2 mx-auto font-semibold text-white transition-all rounded-md btn btn-primary"
            @click="submitAnnouncement"
          >
            提交
          </button>
          <button
            class="py-2 font-semibold text-[#333] transition-all rounded-md btn w-2/5 mx-auto block"
            @click="clearAnnouncement"
          >
            清空
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import emitter from "@/utils/emitter.js";
import myAxios from "@/utils/myAxios.js";
import { ref } from "vue";
const title = ref("");
const content = ref("");
function submitAnnouncement() {
  myAxios
    .post("/admin/announcements", {
      title: title.value,
      content: content.value,
    })
    .then((response) => {
      if (response.data.code === 200) {
        emitter.emit("alert", {
          alertType: "success",
          alertText: "发布成功",
        });
      } else {
        emitter.emit("alert", {
          alertType: "error",
          alertText: "发布失败",
        });
      }
      clearAnnouncement();
    })
    .catch((err) => {
      emitter.emit("alert", {
        alertType: "error",
        alertText: err,
      });
    });
}
function clearAnnouncement() {
  title.value = "";
  content.value = "";
}
</script>

<style lang="scss" scoped></style>
