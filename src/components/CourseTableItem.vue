<template>
  <div
    class="w-max h-full flex-shrink-0 min-w-[1000px] courseTableItem courseTableItem1 max-h-screen"
  >
    <table
      class="w-full h-full max-h-screen text-center border border-collapse table-auto tabel"
      v-if="aWeek.length !== 0"
    >
      <thead class="">
        <tr>
          <th
            class="border h-[30px] select-none text-nowrap"
            :class="
              numDay === i ? ' text-blue-500 border-blue-300 bg-blue-200' : ''
            "
            v-for="(p, i) in weekInfo"
          >
            {{ p.day }}
            <span class="text-xs">{{ p.date }}</span>
          </th>
        </tr>
      </thead>
      <tbody ref="Items">
        <!-- 示例行 -->
        <tr v-for="(e, ei) in 6" :key="ei">
          <td class="border" v-for="(p, pi) in 7" :key="pi">
            <div
              class="flex w-full h-full opacity-0 bg-slate-300 btn hover:opacity-100 courseButton"
              v-if="!aWeek[pi][ei]"
              :data-section="ei + 1"
              :data-weekday="pi + 1"
              :data-year="weekInfo[pi]?.year"
              :data-day="weekInfo[pi]?.day"
              :data-date="weekInfo[pi]?.date"
            >
              <span class="icon-[mdi--plus] text-2xl m-auto"></span>
            </div>
            <div
              class="flex w-full h-full btn courseButton bg-[#FFFFF0]"
              :data-hascourse="true"
              :data-weekday="pi + 1"
              :data-day="weekInfo[pi]?.day"
              :data-labName="aWeek[pi][ei].labName"
              :data-teacherName="aWeek[pi][ei].teacherName"
              :data-section="ei + 1"
              :data-courseName="aWeek[pi][ei].courseName"
              :data-id="aWeek[pi][ei].id"
              :data-date="weekInfo[pi]?.date"
              :data-year="weekInfo[pi]?.year"
              v-else
            >
              {{ `${aWeek[pi][ei].courseName} ${aWeek[pi][ei].labName}` }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const props = defineProps(["weekInfo", "today", "reservationsArray"]);
const numDay = ref(-1);
const nowRange = ref(false);
const aWeek = ref([]);
console.log("props.weekInfo", props.weekInfo);
onMounted(() => {
  aWeek.value = Array.from({ length: 7 }, () => []);
  // console.log("aWeek.value", aWeek.value);

  console.log("props.reservationsArray", props.reservationsArray);
  props.reservationsArray.forEach(
    ({ dayOfWeek, labName, teacherName, section, courseName, id }) => {
      // aWeek.value[dayOfWeek - 1].push({
      //   dayOfWeek,
      //   labName,
      //   teacherName,
      //   section,
      // });
      aWeek.value[dayOfWeek - 1][section - 1] = {
        dayOfWeek,
        labName,
        teacherName,
        section,
        courseName,
        id,
      };
    }
  );
  console.log("aWeek", aWeek.value);
  numDay.value = -1;
  nowRange.value = false;
  const date = props.today.date.slice(5);
  console.log("date", date);

  props.weekInfo.forEach((e) => {
    if (e.date === date) {
      numDay.value = props.today.numDay;
      // console.log("e", e);
    }
  });
  // if (props.weekInfo.some((e) => e.date === date)) {
  //   numDay.value = props.today.numDay;
  //   console.log("e.date &&&& date", e.date, date);
  // }
});
</script>

<style scoped>
th.border {
  width: 100px;
}
td.border {
  width: 100px;

  max-height: 100px;
  /* min-width: 100px; */
}
</style>
