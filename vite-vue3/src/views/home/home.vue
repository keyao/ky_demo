<template>
  <div></div>
  <hello-world />
  <div @click="goTo">跳轉</div>
</template>
<script setup lang="ts">
import HelloWorld from '../../components/HelloWorld.vue'
import { useRouter } from 'vue-router'
const router = useRouter()


const goTo = () => {
  router.push({
    path: '/about'
  })
}
// 传入两个对象数组 对比找出其中id相同的项，然后返回一个新的对象数组
const compare = (arr1, arr2) => {
  const result = []
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i].id === arr2[j].id) {
        result.push(arr1[i])
      }
    }
  }
  return result
}
// 计数器方法

/**
 * 创建一个计数器
 * @returns {Ref<number>} 计数器的引用
 */ 
const count = () => {
  const count = ref(0)
  const interval = setInterval(() => {
    count.value++
  }, 1000)
  onUnmounted(() => {
    clearInterval(interval)
  })
  return count
}

</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}


.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>