<template>
  <div class="drawer lg:drawer-open max-lg:fixed max-lg:z-10">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="flex flex-col items-center justify-center drawer-content">
      <!-- Page content here -->
      <!-- <label for="my-drawer-2" class="btn drawer-button lg:hidden">
        Open drawer
      </label> -->
      <div class="shadow-xl lg:hidden navbar bg-base-100">
        <div class="navbar-start">
          <div class="dropdown">
            <label
              tabindex="0"
              for="my-drawer-2"
              role="button"
              class="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
        </div>
        <div class="navbar-center">
          <a class="text-xl btn btn-ghost">NEFU Laboratory</a>
        </div>
        <div class="navbar-end">
          <button class="btn btn-ghost btn-circle">
            <div class="avatar placeholder">
              <div class="w-8 rounded-full bg-neutral text-neutral-content">
                <span class="text-xs">{{ user.name.substr(0, 2) }}</span>
              </div>
            </div>
          </button>
          <button class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span class="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="min-h-full p-4 menu bg-base-200 text-base-content w-80">
        <!-- Sidebar content here -->
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup name="NavBar">
import { useUserStore } from "@/store/user.js";
import { storeToRefs } from "pinia";
const { user } = storeToRefs(useUserStore());
</script>

<style lang="scss" scoped></style>
