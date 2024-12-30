<template>
  <div class="h-screen p-10 overflow-y-auto">
    <table class="table max-lg:mt-[10vh]">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>用户名</th>
          <th>角色</th>
          <th>创建时间</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="(u, index) in userLists" :key="u.id" class=" hover">
          <th>
            {{ index + 1 }}
          </th>
          <td>
            <div class="avatar placeholder">
              <div class="w-12 rounded-full bg-neutral text-neutral-content">
                <span>{{ u.name.slice(-2) }}</span>
              </div>
            </div>
          </td>
          <td>
            {{ u.name }}
          </td>
          <td>
            <div class="badge badge-ghost">{{ u.role }}</div>
          </td>
          <td>
            {{ u.createTime.split("T")[0] }}
          </td>
        </tr>
        <!-- row 2 -->
      </tbody>
      <!-- foot -->
      <tfoot>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Job</th>
          <th>Favorite Color</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import getAlluserss from "@/hooks/allUsers.js";
import { onMounted, ref } from "vue";
const { getAllUsers } = getAlluserss();
const userLists = ref([]);
onMounted(() => {
  getAllUsers().then((response) => {
    userLists.value = response;
    console.log(response);
  });
});
</script>

<style lang="scss" scoped></style>
