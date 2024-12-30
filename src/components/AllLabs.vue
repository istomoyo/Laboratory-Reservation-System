<!-- <template>
  <div class="flex flex-col">
    <div class="flex justify-center w-full">
      <button class="block m-3 btn w-fit" @click="nameRank">按照名称排序</button>
      <button class="block m-3 btn w-fit" @click="peopleRank">按照人数排序</button>
    </div>
    <ul class="w-full mx-auto">
      <li
        v-for="(lab, index) in aLabs"
        :key="lab.labId"
        class="flex flex-nowrap"
      >
        <div class="collapse collapse-plus bg-base-200">
          <input
            type="radio"
            name="my-accordion-3"
            :value="{ labId: lab.labId, labName: lab.labName }"
            v-model="selectId"
          />
          <div class="font-medium collapse-title flex-nowrap">
            <span class="text-sm">
              <span class="badge badge-lg badge-info">名称</span>
              {{ lab.labName }}
            </span>
            <span class="text-sm">
              <span class="badge badge-lg badge-info">容量</span>
              {{ lab.quantity }}人
            </span>
            <span class="ml-auto text-sm">
              <span class="badge badge-lg">可预约</span>
            </span>
          </div>
          <div class="collapse-content">
            <p>{{ lab.description || "这个管理员比较懒,还未添加描述" }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref, defineExpose } from "vue";

const props = defineProps(["aLabs"]);
const selectId = ref();
onMounted(() => {
  console.log("aLabs", props.aLabs);
});
defineExpose({ selectId });
</script>

<style lang="scss" scoped></style> -->

<template>
  <div class="flex flex-col">
    <!-- 排序按钮 -->
    <div class="flex justify-center w-full">
      <button class="block m-3 btn w-fit" @click="nameRank">
        按照名称排序
      </button>
      <button class="block m-3 btn w-fit" @click="peopleRank">
        按照人数排序
      </button>
    </div>

    <!-- 动画效果列表 -->
    <transition-group name="fade" tag="ul" class="w-full mx-auto">
      <li
        v-for="(lab, index) in sortedLabs"
        :key="lab.labId"
        class="flex flex-nowrap"
      >
        <div class="collapse collapse-plus bg-base-200">
          <input
            type="radio"
            name="my-accordion-3"
            :value="{ labId: lab.labId, labName: lab.labName }"
            v-model="selectId"
          />
          <div class="font-medium collapse-title flex-nowrap">
            <span class="text-sm">
              <span class="badge badge-lg badge-info">名称</span>
              {{ lab.labName }}
            </span>
            <span class="text-sm">
              <span class="badge badge-lg badge-info">容量</span>
              {{ lab.quantity }}人
            </span>
            <span class="ml-auto text-sm">
              <span class="badge badge-lg">可预约</span>
            </span>
          </div>
          <div class="collapse-content">
            <p>{{ lab.description || "这个管理员比较懒,还未添加描述" }}</p>
          </div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, computed, defineExpose } from "vue";

// 父组件传递的实验室数据
const props = defineProps(["aLabs"]);
const selectId = ref(null);

// 排序方式（默认按名称排序）
const sortKey = ref("labName");
const sortOrder = ref("asc");

// 排序后的实验室数据
const sortedLabs = computed(() => {
  const key = sortKey.value;
  const order = sortOrder.value;
  return [...props.aLabs].sort((a, b) => {
    if (order === "asc") return a[key] > b[key] ? 1 : -1;
    return a[key] < b[key] ? 1 : -1;
  });
});

// 按名称排序
const nameRank = () => {
  sortKey.value = "labName";
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
};

// 按人数排序
const peopleRank = () => {
  sortKey.value = "quantity";
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
};

defineExpose({ selectId });
</script>

<style scoped>
/* 动画样式 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
