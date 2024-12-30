<template>
  <div class="h-screen p-10 overflow-y-auto max-lg:mt-[10vh]">
    <label
      for="fileUpload"
      class="flex flex-col items-center w-24 cursor-pointer btn"
    >
      <span class="icon-[mdi--import] text-2xl"></span>
      <span class="text-sm">导入</span>
      <!-- 隐藏的文件输入框 -->
      <input
        type="file"
        id="fileUpload"
        ref="fileUpload"
        class="hidden"
        @change="handleFileUpload"
      />
    </label>
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>课程名称</th>
          <th>Job</th>
          <th>Favorite Color</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover">
          <th>1</th>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
          <td>Purple</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import * as XLSX from "xlsx";
import teachersSchedule from "@/utils/teachersSchedule.js";
function handleFileUpload(event) {
  const file = event.target.files[0];
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      // 获取第一个工作表
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      // 转换为 JSON 格式
      const courseTableExcelData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
      });
      console.log(courseTableExcelData);
      console.log(
        "teachersSchedule(courseTableExcelData)",
        teachersSchedule(courseTableExcelData)
      );
      // teachersSchedule(courseTableExcelData).forEach((e) => {
      //   labReveals.value.push(e);
      // });
    };
    reader.readAsBinaryString(file);
  }
}
</script>

<style lang="scss" scoped></style>
