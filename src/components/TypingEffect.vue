<template>
  <div class="relative">
    <span
      ref="textElement"
      class="inline-block font-mono text-gray-800"
    ></span>
    <span
      v-show="isTyping"
      class="absolute hidden w-1 h-5 -translate-x-1/2 -translate-y-1/2 bg-black right-1/2 top-1/2 animate-blink"
    ></span>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// 注册插件
gsap.registerPlugin(TextPlugin);

export default {
  name: "TypingEffect",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const textElement = ref(null);
    const isTyping = ref(true);

    // 随机生成打字速度
    const getRandomSpeed = () => {
      return Math.random() * (1 - 0.5) + 0.8; // 随机在0.5到1秒之间
    };

    const typeText = () => {
      // 使用 TextPlugin 创建打字机效果
      gsap.to(textElement.value, {
        duration: getRandomSpeed(), // 设置动画总时长
        text: props.text, // 动画化文本
        ease: "power1.inOut", // 放慢动画效果
        onComplete: () => {
          isTyping.value = false; // 动画完成后隐藏光标
        },
      });
    };

    onMounted(() => {
      typeText(); // 在组件挂载后启动打字动画
    });

    return {
      textElement,
      isTyping,
    };
  },
};
</script>

<style scoped>
@keyframes blink {
  50% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 0.7s infinite step-start;
}
</style>
