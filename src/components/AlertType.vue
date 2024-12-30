<template>
  <div
    v-show="isVisible"
    role="alert"
    class="flex items-center w-3/5 gap-3 p-4 m-3 mx-auto rounded-lg shadow-lg max-w-[500px] select-none"
    :class="alertClasses[type]"
    ref="alertBox"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 text-green-600"
      fill="none"
      viewBox="0 0 24 24"
      v-if="type === 'success'"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 text-red-600"
      fill="none"
      viewBox="0 0 24 24"
      v-if="type === 'error'"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 text-yellow-600"
      fill="none"
      viewBox="0 0 24 24"
      v-if="type === 'warning'"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
    <span class="flex-1 text-sm md:text-base lg:text-lg"><slot></slot></span>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ["success", "error", "warning"].includes(value),
  },
  duration: {
    type: Number,
    default: 3000, // 自动隐藏持续时间
  },
});

const alertClasses = {
  success: "bg-green-100 border-l-4 border-green-500 text-green-800",
  error: "bg-red-100 border-l-4 border-red-500 text-red-800",
  warning: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800",
};

const isVisible = ref(false);
const alertBox = ref();

onMounted(() => {
  isVisible.value = true;
  console.log("type", props.type);
  gsap.fromTo(
    alertBox.value,
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" }
  );

  setTimeout(() => {
    gsap.to(alertBox.value, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power1.in",
      onComplete: () => (isVisible.value = false),
    });
  }, props.duration);
});
</script>

<style scoped>
.alert {
  transition: all 0.3s ease-in-out;
}
</style>
