<template>
    <div class="min-h-screen flex flex-col items-center justify-center">
        <img src="@/assets/computer.svg" class="w-50 h-50 " />
        <RouterLink to="poweron"><button class="w-40 h-20 rounded-md transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">开始演示</button></RouterLink>
    </div>
</template>
<script>
export default {
    name: 'workShows'
}
</script>