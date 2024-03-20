<template>
    <section id="io-model" class=" bg-blue-600 h-screen background-blue flex  justify-center">
        <div id="io-content" class=" relative ">
            <br>
            <br>
            <el-card style="max-width: 90%">
                <template #header>
                <div class="card-header">
                    <span>典型的桌面计算机的I/O总体架构</span>
                </div>
                </template>
                <img src="@/assets/io-arch-in-pc.png" alt="I/O模型" style="width: 100vh">
            </el-card>
        </div>
    </section>
    <section id="Programmed-io" class="h-screen bg-red-600 background-red justify-center">
        <br>
        <div id="Programmed-content" class="flex space-x-12 relative h-max">
            <br><br>
            <el-card style="max-width: 45%" class="">
                <template #header>
                <div class="card-header">
                    <span>I/O传输方式</span>
                </div>
                </template>
                <p>CPU主要有三种方式可以与外设进行数据传输：<br>Programmed I/O (简称PIO)、Interrupt、Direct Memory Access (简称DMA)，如下图所示：</p>
                <img src="@/assets/io-comm-mode.png" alt="I/O模型" style="width: 70vh">

            </el-card>
            <el-card style="width: 45%">
                <template #header>
                <div class="card-header">
                    <span>Programmed I/O</span>
                </div>
                </template>
                <p>PIO指CPU通过发出I/O指令的方式来进行数据传输。<br>
                PIO方式可以进一步细分为基于Memory-mapped的PIO（简称MMIO）和Port-mapped的PIO（简称PMIO）。<br>
                MMIO是将I/O设备物理地址映射到内存地址空间，这样CPU就可以通过普通访存指令将数据送到I/O设备在主存上的位置，从而完成数据传输。<br>
                对于采用PMIO方式的I/O设备，它们具有自己独立的地址空间，与内存地址空间分离。<br>
                CPU若要访问I/O设备，则需要使用特殊的I/O指令，如x86处理器中的 IN 、OUT 指令，这样CPU直接使用I/O指令，就可以通过PMIO方式访问设备。</p>

            </el-card>
        </div>
    </section>
    <section id="Interrupt-based" class="h-screen bg-orange-500 background-orange justify-center">
        <br>
        <div id="Interrupt-content" class="flex space-x-12 relative h-max">
            <br><br>
            <el-card style="width: 45%" class=" h-auto">
                <template #header>
                <div class="card-header">
                    <span>Interrupt based I/O</span>
                </div>
                </template>
                <p>下图为 Interrupt 模型</p>
                <img src="@/assets/interrupt-steps.png" alt="中断机制" style="width: 70vh">
                <br>
            </el-card>
            <el-card style="max-width: 45%">
                <template #header>
                <div class="card-header">
                    <span>Interrupt based I/O</span>
                </div>
                </template>
                <p>如果采用PIO方式让CPU来获取外设的执行结果，那么这样的I/O软件中有一个CPU读外设相关寄存器的循环，直到CPU收到可继续执行I/O操作的外设信息后，CPU才能进一步做其它事情。<br>
                    当外设(如串口)的处理速度远低于CPU的时候，将使CPU处于忙等的低效状态中。<br>
                    中断机制的出现，极大地缓解了CPU的负担。CPU可通过PIO方式来通知外设，只要I/O设备有了CPU需要的数据，便会发出中断请求信号。<br>
                    CPU发完通知后，就可以继续执行与I/O设备无关的其它事情。中断控制器会检查I/O设备是否准备好进行传输数据，并发出中断请求信号给CPU。<br>
                    当CPU检测到中断信号，CPU会打断当前执行，并处理I/O传输。
                </p>

            </el-card>
        </div>

    </section>
    <section id="Direct-Memory-Access" class="h-screen bg-purple-600 background-purple justify-center">
        <br>
        <br>
        <div id="Direct-Memory-content" class="flex space-x-12 relative h-max">
            <br><br>
            <el-card style="width: 45%" class="">
                <template #header>
                <div class="card-header">
                    <span>Interrupt based I/O</span>
                </div>
                </template>
                <p>下图显示了磁盘数据的DMA传输的图示例子：</p>
                <img src="@/assets/dma-steps.png" alt="DMA传输" style="width: 70vh">
                <br>
            </el-card>
            <el-card style="max-width: 45%">
                <template #header>
                <div class="card-header">
                    <span>Interrupt based I/O</span>
                </div>
                </template>
                <p>如果外设每传一个字节都要产生一次中断，那系统执行效率还是很低。<br>
                    DMA（Direct Memory Access）是一种用于在计算机系统中进行快速数据传输的技术。
                    <br>它允许设备直接将数据传输到内存中，而不必通过CPU来直接处理。这样使得CPU从I/O任务中解脱出来，从而提高了系统的整体性能。<br>
                    DMA操作通常由DMA控制器来完成。当CPU需要从内存中读取或写入设备数据时，它会提前向DMA控制器发出准备请求，然后DMA控制器会在后续阶段直接将数据传输到目标位置。
                </p>

            </el-card>
        </div>
    </section>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted } from "vue";
gsap.registerPlugin(ScrollTrigger);

export default {
    setup() {
        onMounted(() => {
            pageView();
        });
    },
};
const screenHeight = document.documentElement.clientHeight;
console.log(screenHeight)
const pageView = () => {
    ScrollTrigger.create({
        trigger: "#io-model",
        scroller: ".el-scrollbar__wrap",
        start: "top top",
        end: "40% 100vh",
        pin: "#io-content",
        // markers: true,
    });
    ScrollTrigger.create({
        trigger: "#Programmed-io",
        scroller: ".el-scrollbar__wrap",
        start: "top top",
        end: "38% 100vh",
        pin: "#Programmed-content",
        markers: true,
    });
    ScrollTrigger.create({
        trigger: "#Interrupt-based",
        scroller: ".el-scrollbar__wrap",
        start: "top top",
        end: "55% 100vh",
        pin: "#Interrupt-content",
        // markers: true,
    });
    ScrollTrigger.create({
        trigger: "#Direct-Memory-Access",
        scroller: ".el-scrollbar__wrap",
        start: "top top",
        end: "bottom bottom",
        pin: "#Direct-Memory-content",
        // markers: true,
    });
}
</script>


<style scoped>
.background-blue {
    background-image: radial-gradient(circle at 46% 40%, rgba(29, 69, 226, 0.06) 0%, rgba(14, 80, 193, 0.06) 13%,transparent 13%, transparent 100%),radial-gradient(circle at 11% 41%, rgba(21, 151, 244, 0.06) 0%, rgba(18, 42, 195, 0.06) 19%,transparent 19%, transparent 100%),radial-gradient(circle at 52% 23%, rgba(27, 21, 116, 0.06) 0%, rgba(20, 190, 125, 0.06) 69%,transparent 69%, transparent 100%),radial-gradient(circle at 13% 85%, rgba(148, 148, 148,0.06) 0%, rgba(148, 148, 148,0.06) 44%,transparent 44%, transparent 100%),radial-gradient(circle at 57% 74%, rgba(232, 232, 232,0.06) 0%, rgba(232, 232, 232,0.06) 21%,transparent 21%, transparent 100%),radial-gradient(circle at 59% 54%, rgba(39, 39, 39,0.06) 0%, rgba(39, 39, 39,0.06) 49%,transparent 49%, transparent 100%),radial-gradient(circle at 98% 38%, rgba(157, 157, 157,0.06) 0%, rgba(157, 157, 157,0.06) 24%,transparent 24%, transparent 100%),radial-gradient(circle at 8% 6%, rgba(60, 60, 60,0.06) 0%, rgba(60, 60, 60,0.06) 12%,transparent 12%, transparent 100%),linear-gradient(90deg, #2976ad, #1555b4);
}
.background-red {
    background-image: radial-gradient(circle at 47% 14%, rgba(214, 31, 31, 0.04) 0%, rgba(187, 21, 21, 0.04) 43%,transparent 43%, transparent 100%),radial-gradient(circle at 35% 12%, rgba(197, 23, 23, 0.04) 0%, rgba(215, 215, 215,0.04) 4%,transparent 4%, transparent 100%),radial-gradient(circle at 1% 35%, rgba(24, 24, 24,0.04) 0%, rgba(24, 24, 24,0.04) 37%,transparent 37%, transparent 100%),radial-gradient(circle at 21% 1%, rgba(0, 0, 0,0.04) 0%, rgba(0, 0, 0,0.04) 26%,transparent 26%, transparent 100%),radial-gradient(circle at 23% 82%, rgba(249, 249, 249,0.04) 0%, rgba(249, 249, 249,0.04) 60%,transparent 60%, transparent 100%),radial-gradient(circle at 11% 54%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 23%,transparent 23%, transparent 100%),radial-gradient(circle at 69% 68%, rgba(234, 234, 234,0.04) 0%, rgba(234, 234, 234,0.04) 10%,transparent 10%, transparent 100%),linear-gradient(90deg, #df2920,#ac250d);
}
.background-orange {
    background-image: radial-gradient(circle at 46% 40%, rgba(228, 228, 228,0.06) 0%, rgba(228, 228, 228,0.06) 13%,transparent 13%, transparent 100%),radial-gradient(circle at 11% 41%, rgba(198, 198, 198,0.06) 0%, rgba(198, 198, 198,0.06) 19%,transparent 19%, transparent 100%),radial-gradient(circle at 52% 23%, rgba(14, 14, 14,0.06) 0%, rgba(14, 14, 14,0.06) 69%,transparent 69%, transparent 100%),radial-gradient(circle at 13% 85%, rgba(148, 148, 148,0.06) 0%, rgba(148, 148, 148,0.06) 44%,transparent 44%, transparent 100%),radial-gradient(circle at 57% 74%, rgba(232, 232, 232,0.06) 0%, rgba(232, 232, 232,0.06) 21%,transparent 21%, transparent 100%),radial-gradient(circle at 59% 54%, rgba(39, 39, 39,0.06) 0%, rgba(39, 39, 39,0.06) 49%,transparent 49%, transparent 100%),radial-gradient(circle at 98% 38%, rgba(157, 157, 157,0.06) 0%, rgba(157, 157, 157,0.06) 24%,transparent 24%, transparent 100%),radial-gradient(circle at 8% 6%, rgba(60, 60, 60,0.06) 0%, rgba(60, 60, 60,0.06) 12%,transparent 12%, transparent 100%),linear-gradient(90deg, #ff7600, #ff7600);
}
.background-purple {
    background-image: radial-gradient(circle at 19% 90%, rgba(190, 190, 190,0.04) 0%, rgba(190, 190, 190,0.04) 17%,transparent 17%, transparent 100%),radial-gradient(circle at 73% 2%, rgba(78, 78, 78,0.04) 0%, rgba(78, 78, 78,0.04) 94%,transparent 94%, transparent 100%),radial-gradient(circle at 45% 2%, rgba(18, 18, 18,0.04) 0%, rgba(18, 18, 18,0.04) 55%,transparent 55%, transparent 100%),radial-gradient(circle at 76% 60%, rgba(110, 110, 110,0.04) 0%, rgba(110, 110, 110,0.04) 34%,transparent 34%, transparent 100%),radial-gradient(circle at 68% 56%, rgba(246, 246, 246,0.04) 0%, rgba(246, 246, 246,0.04) 16%,transparent 16%, transparent 100%),radial-gradient(circle at 71% 42%, rgba(156, 156, 156,0.04) 0%, rgba(156, 156, 156,0.04) 47%,transparent 47%, transparent 100%),radial-gradient(circle at 46% 82%, rgba(247, 247, 247,0.04) 0%, rgba(247, 247, 247,0.04) 39%,transparent 39%, transparent 100%),radial-gradient(circle at 50% 47%, rgba(209, 209, 209,0.04) 0%, rgba(209, 209, 209,0.04) 45%,transparent 45%, transparent 100%),linear-gradient(90deg, #8d3dae,#8d3dae);;
}
.el-card {
  background-color: rgba(255, 255, 255, 0.25);
  border-color: rgba(66, 66, 66, 0.25);
}
.el-card__body {
  border-top-color: rgba(66, 66, 66, 0.25);
}
</style>