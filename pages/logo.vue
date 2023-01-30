<template>
  <div class="w-full h-[50%] bg">
    <div class="flex justify-center">
      <div class="w-[1000px] flex items-center justify-center mt-[150px]">
        <SvgIcon :iconClass="'logo'" :className="'size2'" class="mr-1" />
        <span class="text-6xl font-black text-white"> The Rooms </span>
      </div>
    </div>
  </div>
</template>

<style>
.bg {
  background-image: linear-gradient(45deg, rgb(43, 33, 93), rgb(81, 240, 237));
}
</style>
