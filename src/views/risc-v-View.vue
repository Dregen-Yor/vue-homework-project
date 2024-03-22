<template>
  <main>
    <el-collapse v-model="active1">
      <el-collapse-item title="RISC-V 通用寄存器" name="1">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>RISC-V 通用寄存器</span>
            </div>
          </template>
          <el-table :data="instructions" style="width: 100%">
            <el-table-column prop="register" label="寄存器"></el-table-column>
            <el-table-column prop="ABI" label="接口名称"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="callsaved" label="调用保存"></el-table-column>
            <el-table-column prop="binary" label="二进制"></el-table-column>
          </el-table>
        </el-card>
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-model="active2">
      <el-collapse-item title="RISC-V 指令集详解" name="2">
        <el-card class="text-xl">
          <template #header>
            <div class="card-header">
              <span>由于内容过多，这里不全部展示，详细可以参考<a href="http://www.robalni.org/riscv/instructions.html" target="_blank" class=" text-blue-700">这个连接</a>
                <br>这里只解析几个具体例子
              </span>
            </div>
          </template >
          可以发现，RV32I指令集中的指令命名方式有很明显的特点，即由英文首字母拼成。<br>
          实际上，RISC-V指令根据格式特点可以分为六种类型（Type）：
          <div class=" text-center text-xl">
            <ul>
              <li>R Type：用于寄存器——寄存器之间的操作 （Register）</li>
              <li>I Type：短立即数及内存访问操作（Immediate）</li>
              <li>S Type：用于内存store操作 （Store）</li>
              <li>B Type：用于条件跳转操作 （Branch）</li>
              <li>J Type：用于无条件跳转操作 （Jump）</li>
              <li>U Type：用于长立即数操作</li>
            </ul>
            如下图所示：
            <img src="@/assets/command.png" style="display: block; margin: auto;">
            其中 opcode 表示指令操作码，rs1,rs2表示源寄存器，rd表示目的寄存器，funct3,funct7表示功能码，imm表示立即数，offset表示偏移量，shamt表示移位量。<br>
            下面为部分指令的具体解析：<br>
            <div class="dashed" />
            add rd, rs1, rs2<br>
            <img src="@/assets/add.png"  style="display: block; margin: auto;">
            看图可知，0110011为 add 的指令操作码，rd为目的寄存器，rs1,rs2为源寄存器，funct3为000，funct7为0000000。<br>
            所以 add 指令的机器码为 0000000 rs2 rs1 000 rd 0110011。<br>
            <div class="dashed" />
            jal rd, imm<br>
            即数 imm（必须是 2 字节的倍数）加到程序计数器（pc）上，跳转到指定地址执行，并将跳转前下一条指令的地址（即 pc + 4）存储在目标寄存器 rd 中。<br>
            <img src="@/assets/jal.png"  style="display: block; margin: auto;">
            其中 opcode 为 1101111，rd 为目标寄存器，imm 为立即数。<br>
            <div class="dashed" />
            sb rs2, imm(rs1)<br>
            将寄存器 rs2 中的字节值存储到地址为 rs1 加上立即数 imm 的内存位置中。
            <img src="@/assets/sb.png"  style="display: block; margin: auto;">
            其中 opcode 为 0100011，rs1 为基址寄存器，rs2 为源寄存器，imm 为立即数。<br>
          </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </main>
</template>

<script>
export default {
  data() {
    return {
      active1:true,
      active2:false,
      instructions: [
        { register: 'x0', ABI: 'zero',description:"硬编码 0", callsaved:"-", binary: '00000'},
        { register: 'x1', ABI: 'ra',description:"返回地址",callsaved:'No',binary:'00001'},
        { register: 'x2',ABI:'sp',description:"栈指针", callsaved:'Yes',binary: '00010' },
        { register: 'x3',ABI:'gp',description:"全局指针", callsaved:"-",binary: '00011' },
        { register: 'x4',ABI:'tp',description:"线程指针", callsaved:"-",binary: '00100' },
        { register: 'x5',ABI:'t0',description:"临时寄存器/备用链接寄存器",callsaved:'No', binary: '00101' },
        { register: 'x6',ABI:'t1', description:"临时寄存器",callsaved:'No',binary: '00110' },
        { register: 'x7',ABI:'t2', description:"临时寄存器",callsaved:'No',binary: '00111' },
        { register: 'x8',ABI:'s0/fp',description:"保存寄存器/帧指针",callsaved:'Yes', binary: '01000' },
        { register: 'x9',ABI:'s1',description:"保存寄存器",callsaved:'Yes', binary: '01001' },
        { register: 'x10',ABI:'a0',description:"函数参数/返回值",callsaved:'No', binary: '01010' },
        { register: 'x11',ABI:'a1',description:"函数参数/返回值",callsaved:'No', binary: '01011' },
        { register: 'x12',ABI:'a2',description:"函数参数",callsaved:'No', binary: '01100' },
        { register: 'x13',ABI:'a3',description:"函数参数",callsaved:'No', binary: '01101' },
        { register: 'x14',ABI:'a4',description:"函数参数",callsaved:'No', binary: '01110' },
        { register: 'x15',ABI:'a5',description:"函数参数",callsaved:'No', binary: '01111' },
        { register: 'x16',ABI:'a6',description:"函数参数",callsaved:'No', binary: '10000' },
        { register: 'x17',ABI:'a7',description:"函数参数",callsaved:'No', binary: '10001' },
        { register: 'x18',ABI:'s2',description:"保存寄存器",callsaved:'Yes', binary: '10010' },
        { register: 'x19',ABI:'s3',description:"保存寄存器",callsaved:'Yes', binary: '10011' },
        { register: 'x20',ABI:'s4',description:"保存寄存器",callsaved:'Yes', binary: '10100' },
        { register: 'x21',ABI:'s5',description:"保存寄存器",callsaved:'Yes', binary: '10101' },
        { register: 'x22',ABI:'s6',description:"保存寄存器",callsaved:'Yes', binary: '10110' },
        { register: 'x23',ABI:'s7',description:"保存寄存器",callsaved:'Yes', binary: '10111' },
        { register: 'x24',ABI:'s8',description:"保存寄存器",callsaved:'Yes', binary: '11000' },
        { register: 'x25',ABI:'s9',description:"保存寄存器",callsaved:'Yes', binary: '11001' },
        { register: 'x26',ABI:'s10',description:"保存寄存器",callsaved:'Yes', binary: '11010' },
        { register: 'x27',ABI:'s11',description:"保存寄存器",callsaved:'Yes', binary: '11011' },
        { register: 'x28',ABI:'t3',description:"临时寄存器",callsaved:'No', binary: '11100' },
        { register: 'x29',ABI:'t4',description:"临时寄存器",callsaved:'No', binary: '11101' },
        { register: 'x30',ABI:'t5',description:"临时寄存器",callsaved:'No', binary: '11110' },
        { register: 'x31',ABI:'t6',description:"临时寄存器",callsaved:'No', binary: '11111' },
      ],
    };
  },
};
</script>

<style scoped>
main {
  padding: 20px;
}
.dashed{
  border-top: 2px dashed var(--el-border-color);
}
</style>