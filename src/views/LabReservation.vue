<template>
  <div class="h-screen p-10 max-lg:mt-[10vh]">
    <div role="tablist" class="tabs tabs-lifted" v-if="allLabs.length !== 0">
      <RouterLink
        role="tab"
        class="tab"
        active-class="tab-active"
        :to="{
          name: 'lab',
          params: {
            id: a.id,
          },
        }"
        v-for="(a, index) in allLabs"
        :key="a.id"
      >
        {{ a.name }}
      </RouterLink>
    </div>
    <router-view class="min-h-screen"></router-view>
  </div>
</template>

<script setup>
import getLab from "@/hooks/lab.js";
import { onMounted, ref } from "vue";
const { getAllLabs } = getLab();
const allLabs = ref([]);

onMounted(() => {
  getAllLabs().then((response) => {
    allLabs.value = response;
    console.log("AllLabs", response);
  });
});
</script>

<style lang="scss" scoped></style>
