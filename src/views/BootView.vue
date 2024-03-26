<script setup>
import gsap from 'gsap';
// import { SplitText } from 'gsap';
// import { onMounted } from 'vue';
</script>
<template>
    <div >
      <br>
      <div>
        <el-progress type="dashboard" :percentage="percentage" :color="colors" />
      </div>
      <br>
      <el-button @click="startBios" :disabled="step !== 1">启动 BIOS</el-button>
      <el-button @click="startBootLoader" :disabled="step !== 2">启动 Boot Loader</el-button>
      <el-button @click="startOsKernel" :disabled="step !== 3">启动操作系统内核</el-button>
      <br>
      <div class="flex flex-col items-center">
        <br>
        <el-steps style="width: 55vh" :active="active" align-center>
          <el-step title="启动 BIOS" description="" />
          <el-step title="启动 Boot Loader" description="" />
          <el-step title="启动操作系统内核" description="" />
        </el-steps>
      </div>
      <div class="CPU"><img src="@/assets/CPU.svg"></div>
      <br>
      <div>CPU 模式：{{ cpuMode }}</div>
      <div>内存状态：{{ memoryStatus }}</div>
      <div class=" justify-center items-center flex">
        <!-- <transition-group name="fade" tag="div"> -->
        <el-timeline >
          <el-timeline-item v-for="(detail,index) in details" :key="detail" :timestamp="'第'+index+'步'" placement="top" class="typing ">
            {{ detail }}
          </el-timeline-item>
        </el-timeline>
      <!-- </transition-group> -->
      </div>
      <!-- ... -->
    </div>
  </template>
  
<script>
import {ref}from 'vue';
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]

  export default {
    data() {
      return {
        cpuMode: '实模式',
        percentage :ref(10),
        memoryStatus: '未初始化',
        step: 1,
        active:0,
        details: [
        ]
        // ...
      }
    },
    methods: {
      startBios() {
        gsap.to(".CPU", {duration: 2,rotation: 360});
        this.percentage+=30;
        this.cpuMode = '实模式';
        this.memoryStatus = 'BIOS 初始化';
        this.step++;
        this.active++;
        this.details = ['CPU开始从一个固定的物理地址0x000ffff0开始执行代码。这个地址位于ROM BIOS的最顶端，占据了64KB的内存空间',
          'ROM BIOS是只读存储器中的基本输入输出系统，负责在计算机启动时进行硬件检测、初始化，并加载操作系统',
          '下一步设置中断描述符表，它告诉CPU当特定的中断发生（比如按下键盘上某个按键）时应该执行哪些代码',
          'BIOS接着会初始化连接到计算机的各种硬件设备,然后会初始化PCI总线,它还会初始化它所知道的所有重要设备，比如网络卡、声卡等。',
          'BIOS接下来会寻找可启动设备，当BIOS找到一个可启动设备（例如，一个有启动扇区的硬盘）时，它会读取这个设备的引导扇区',
          'BIOS从找到的引导设备中读取引导加载程序（boot loader），并将计算机的控制权转交给它。'
        ];
      },
      startBootLoader() {
        this.cpuMode = '保护模式';
        this.memoryStatus = 'Boot Loader 初始化';
        this.step++;
        this.percentage+=30;
        this.active++;
        this.details = [
          '硬盘驱动器的第一个扇区通常为 主引导记录(MBR)，大小为 512 字节，主要包含 Boot Loader 和分区表两个部分',
          'BIOS 最后会将 512 字节的引导扇区加载到物理地址 0x7c00 到 0x7dff 的内存中，其中包含了 Boot Loader 程序。',
          '随后使用指令 jmp并将控制权传递给 Boot Loader，最后 Boot Loader 负责将 OS 从磁盘加载到内存中。',
          'Boot Loader 拿到控制权后会先执行启用A20线，使得可以访问超过1MB的内存地址。',
          'A20 线开启后接下来将16位实模式切换到32位保护模式。',
          'Boot Loader 结束并将控制权最后交给内核'
        ]
        // ...
      },
      startOsKernel() {
        this.memoryStatus = '操作系统内核初始化';
        this.step++;
        this.percentage+=30;
        this.active++;
        this.details = [
          '得到控制权之后，内核会检测并初始化计算机上的硬件设备，如磁盘驱动器、网络接口卡、图形卡等。',
          '之后内核会设置虚拟内存管理，为进程提供独立的地址空间。',
          '下一步内核会加载需要的设备驱动程序，以便操作系统可以与硬件设备进行交互。',
          '然后内核会启动第一个用户空间程序，通常是一个用于启动其他应用程序的 shell 或者服务。',
          '最后内核会进入多任务模式，开始调度并执行用户空间的进程。'
        ]
        // ...
      },
    }
  }



</script>
<style>
.CPU {
  justify-content: center;
  display: flex;
}
.typing {
    /* color: white;
    font-size: 2em;
    width: 21em;
    height: 2em; */
    border-right: 1px solid transparent;
    animation: typing 2s steps(42, end), blink-caret .75s step-end infinite;
    /* font-family: Consolas, Monaco; */
    word-break: break-all;
    overflow: hidden;
}
/* 打印效果 */
@keyframes typing {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}

/* 光标 */
/* @keyframes blink-caret {

    from,
    to {
        border-color: transparent;
    }

    50% {
        border-color: currentColor;
    }
} */
</style>