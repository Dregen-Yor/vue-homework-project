<template>
    <div class="flex flex-col justify-center items-center">
    <el-card class="w-1/4 bg-gray-100 pai">
      <h1 class="text-center text-2xl">QEMU开机过程</h1>
    </el-card>
  </div>
    <main class="h-screen items-center justify-center">
        <br><br>
        <el-carousel :interval="4000" type="card" height="800px" :autoplay=false :motion-blur=true>
            <el-carousel-item v-for="item in data" :key="item">
            <div class="h-full justify-center items-center flex  flex-col ">><p class="text-2xl w-5/6">{{ item }} </p> </div>
            </el-carousel-item>
        </el-carousel>
    </main>
</template>
<script>
export default {
  data() {
    return {
      data:[
        "第一阶段：将必要的文件载入到 Qemu 物理内存之后，Qemu CPU 的程序计数器（PC, Program Counter）会被初始化为 0x1000 ，因此 Qemu 实际执行的第一条指令位于物理地址 0x1000 ，接下来它将执行寥寥数条指令并跳转到物理地址 0x80000000 对应的指令处并进入第二阶段。从后面的调试过程可以看出，该地址 0x80000000 被固化在 Qemu 中，作为 Qemu 的使用者，我们在不触及 Qemu 源代码的情况下无法进行更改。",
        "第二阶段：由于 Qemu 的第一阶段固定跳转到 0x80000000 ，我们需要将负责第二阶段的 bootloader rustsbi-qemu.bin 放在以物理地址 0x80000000 开头的物理内存中，这样就能保证 0x80000000 处正好保存 bootloader 的第一条指令。在这一阶段，bootloader 负责对计算机进行一些初始化工作，并跳转到下一阶段软件的入口，在 Qemu 上即可实现将计算机控制权移交给我们的内核镜像 os.bin ",
        "第三阶段：为了正确地和上一阶段的 RustSBI 对接，我们需要保证内核的第一条指令位于物理地址 0x80200000 处。为此，我们需要将内核镜像预先加载到 Qemu 物理内存以地址 0x80200000 开头的区域上。一旦 CPU 开始执行内核的第一条指令，证明计算机的控制权已经被移交给我们的内核。"
      ]
    };
  }
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 800px;
  margin: 0;
  text-align: center;
  border-radius: 15px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #598acf;
  border-radius: 15px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #263f5d;
  border-radius: 15px;
}
.pai {
  border-width: 20px;
  border-color: #00372b;
  border-style: outset;
  /* padding: 100px; */
  margin: 5x;
}
</style>