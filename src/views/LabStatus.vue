<template>
  <div>
    <div class="max-lg:mt-[10vh] overflow-y-scroll h-screen">
      <table class="table" v-if="list.length != 0">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>实验室名称</th>
            <th>实验室容量</th>
            <th>实验室状态</th>
            <th>实验室简介</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="(l, index) in list" :key="l.id">
            <th>{{ index + 1 }}</th>
            <td>{{ l.name }}</td>
            <td>{{ l.quantity }}</td>

            <td>{{ l.state === 1 ? "空闲" : "占用" }}</td>
            <td>{{ l.description || "管理员很懒，没有给他添加描述" }}</td>
            <td>
              <button
                class="btn btn-sm"
                @click="changeLab(l.id, l.description, l.name, +l.state)"
              >
                修改
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import emitter from "@/utils/emitter.js";
import getAllLab from "@/hooks/lab.js";
const { getAllLabs, putLabState } = getAllLab();
const list = ref([]);
function changeLab(id, description, name, state) {
  emitter.emit("modal", {
    type: "changeLabDecorption",
    data: {
      id,
      description,
      name,
      state,
    },
  });
  //   putLabDescription(id, description);
}
onMounted(() => {
  emitter.on("labStatus", () => {
    console.log("触发labStatus");
    getAllLabs().then((response) => {
      list.value = response;
      console.log(response);
    });
  });
  getAllLabs().then((response) => {
    list.value = response;
    console.log(response);
  });
});
</script>

<style lang="scss" scoped></style>
