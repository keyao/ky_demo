<script setup lang="ts">
import Logo from "./logo.vue";
import { useRoute,useRouter } from "vue-router";
import { emitter } from "@/utils/mitt";
import SidebarItem from "./sidebarItem.vue";
import LeftCollapse from "./leftCollapse.vue";
import { useNav } from "@/layout/hooks/useNav";
import CenterCollapse from "./centerCollapse.vue";
import { responsiveStorageNameSpace } from "@/config";
import { storageLocal, isAllEmpty } from "@pureadmin/utils";
import { findRouteByPath, getParentPaths } from "@/router/utils";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import LogoIcon from "./LogoIcon.vue";
import { debug } from "node:console";
const route = useRoute();
const router = useRouter();
const isShow = ref(false);
const showLogo = ref(
  storageLocal().getItem<StorageConfigs>(
    `${responsiveStorageNameSpace()}configure`
  )?.showLogo ?? true
);

const {
  device,
  pureApp,
  isCollapse,
  tooltipEffect,
  menuSelect,
  toggleSideBar
} = useNav();

const subMenuData = ref([]);

const menuData = computed(() => {
  return pureApp.layout === "mix" && device.value !== "mobile"
    ? subMenuData.value
    : usePermissionStoreHook().wholeMenus;
});

const loading = computed(() =>
  pureApp.layout === "mix" ? false : menuData.value.length === 0 ? true : false
);

const defaultActive = computed(() =>
  !isAllEmpty(route.meta?.activePath) ? route.meta.activePath : route.path
);
const acitveNav = (route)=>{
  if(route.path !== '/') {
    return route.path === defaultActive.value
  } else {
    return route.redirect === defaultActive.value
  }
  
}

function getSubMenuData() {
  let path = "";
  path = defaultActive.value;
  subMenuData.value = [];
  // path的上级路由组成的数组
  const parentPathArr = getParentPaths(
    path,
    usePermissionStoreHook().wholeMenus
  );
  // 当前路由的父级路由信息
  const parenetRoute = findRouteByPath(
    parentPathArr[0] || path,
    usePermissionStoreHook().wholeMenus
  );
  if (!parenetRoute?.children) return;
  subMenuData.value = parenetRoute?.children;
}
function goto(route){
  
  router.push(route.path === '/'? route.redirect:route.path)
}
watch(
  () => [route.path, usePermissionStoreHook().wholeMenus],
  () => {
    if (route.path.includes("/redirect")) return;
    getSubMenuData();
    menuSelect(route.path);
  }
);

onMounted(() => {
  getSubMenuData();

  emitter.on("logoChange", key => {
    showLogo.value = key;
  });
});

onBeforeUnmount(() => {
  // 解绑`logoChange`公共事件，防止多次触发
  emitter.off("logoChange");
});
</script>

<template>
  <div
    v-loading="loading"
    :class="['sidebar-container', showLogo ? 'has-logo' : 'no-logo']"
    @mouseenter.prevent="isShow = true"
    @mouseleave.prevent="isShow = false"
  >
    <LogoIcon></LogoIcon>
    {{ defaultActive }}
    <el-scrollbar
      wrap-class="scrollbar-wrapper"
      :class="[device === 'mobile' ? 'mobile' : 'pc']"
    >
      <ul class="router-ul">
        <li @click="goto(routes)" v-for="routes in menuData"   :class="[acitveNav(routes)?'border-l-white border-sky-500 text-sky-500':'']"> 
          <i >
            <IconifyIconOnline :class="[acitveNav(routes)?'acitv':'']" width="24px" height="24px" :icon="routes.meta?.icon"/>
          </i>
          <span>{{ routes.meta?.title }}</span>
        </li> 
       </ul>
      <!-- <el-menu
        router
        unique-opened
        mode="vertical"
        popper-class="pure-scrollbar"
        class="outer-most select-none"
        :collapse="isCollapse"
        :collapse-transition="false"
        :popper-effect="tooltipEffect"
        :default-active="defaultActive"
      >
        <sidebar-item
          v-for="routes in menuData"
          :key="routes.path"
          :item="routes"
          :base-path="routes.path"
          class="outer-most select-none"
        />
      </el-menu> -->
    </el-scrollbar>
    <!-- <CenterCollapse
      v-if="device !== 'mobile' && (isShow || isCollapse)"
      :is-active="pureApp.sidebar.opened"
      @toggleClick="toggleSideBar"
    />
    <LeftCollapse
      v-if="device !== 'mobile'"
      :is-active="pureApp.sidebar.opened"
      @toggleClick="toggleSideBar"
    /> -->
  </div>
</template>

<style scoped lang="scss">
:deep(.el-loading-mask) {
  opacity: 0.45;
}
.router-ul{
  >li{
    cursor: pointer;
    font-size: 14px;
    text-align: center;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
    >.acitv{
      color:rgb(255 255 255 / var(--tw-border-opacity))
    }
  }
 
}
</style>
