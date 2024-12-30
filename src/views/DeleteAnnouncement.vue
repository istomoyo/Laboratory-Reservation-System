<template>
  <div class="overflow-x-auto">
    <table class="table max-lg:mt-[10vh]" v-if="list.length != 0">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>题目</th>
          <th>内容</th>
          <th>时间</th>
          <th></th>
        </tr>
      </thead>
      <transition-group name="fade" tag="tbody" :key="list.length">
        <tr v-for="(l, index) in list" :key="l.id" class="hover">
          <th>{{ index + 1 }}</th>
          <td>{{ l.title }}</td>
          <td>
            {{
              l.content.length <= 10 ? l.content : l.content.slice(0, 9) + "..."
            }}
          </td>
          <td>{{ l.updateTime.split("T")[0] }}</td>
          <td>
            <button
              class="btn btn-sm"
              @click="info(l.title, l.content, l.updateTime.split('T')[0])"
            >
              查看
            </button>
            <button class="btn btn-sm" @click="deleteA(l.id)">删除</button>
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import emitter from "@/utils/emitter.js";
import getAnnouncement from "@/hooks/announcement.js";
import myAxios from "@/utils/myAxios.js";
const { announcement } = getAnnouncement();
const list = ref([]);
function info(title, content, time) {
  emitter.emit("modal", {
    type: "infoAnnouncement",
    data: {
      title,
      content,
      time,
    },
  });
}
function deleteA(id) {
  myAxios.delete(`/admin/announcements/${id}`).then((response) => {
    console.log("response", response);
    if (response.data.code === 200) {
      emitter.emit("alert", {
        alertType: "success",
        alertText: "删除成功",
      });
      list.value = response.data.data;
    }
  });
}
onMounted(() => {
  announcement().then((response) => {
    console.log("response", response);
    list.value = response.reverse();
  });
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
