<template>
  <div class="flex overflow-hidden">
    <div class="m-auto stack w-fit">
      <div
        class="text-center border border-base-content card bg-base-100 w-[50vw] aspect-video"
        v-if="announcements"
        v-for="(ann, i) in announcements"
        :key="ann.id"
      >
        <div class="card-body">
          <h3 class="text-3xl font-bold tracking-wider max-lg:text-xl">
            {{ i + 1 }}: {{ ann.title }}
          </h3>
          <h4 class="text-sm text-right">
            更新时间：{{ ann.updateTime.replace("T", " ") }}
          </h4>
          <div class="p-3 m-5 text-xl">
            {{ ann.content }}
          </div>
          <button
            class="btn w-[30%] max-lg:w-[80%] mx-auto block"
            @click="iAgree"
          >
            我知道了
          </button>
        </div>
      </div>
      <div
        class="text-center border flex border-base-content card bg-base-100 w-[50vw] aspect-video"
      >
        <div class="m-auto text-2xl font-extrabold card-body">暂无公告</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import emitter from "@/utils/emitter.js";
import getAnnouncements from "@/hooks/announcement.js";
const { announcement, localAnnouncement } = getAnnouncements();
const announcements = ref(null);
function iAgree() {
  announcements.value.shift();
}
onMounted(() => {
  announcement().then((response) => {
    announcements.value = response.reverse();
  });
  emitter.emit("hasNewAnnoucement", {
    data: false,
  });
});
</script>

<style lang="scss" scoped></style>
