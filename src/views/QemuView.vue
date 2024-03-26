<template>
    <main>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </main>
</template>
<script>
    
</script>