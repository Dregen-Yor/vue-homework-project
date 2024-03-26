<template>
  <br>
  <div class="flex flex-col justify-center items-center">
    <el-card class="w-1/4 bg-gray-100 pai">
      <h1>整数、浮点数与二进制的转换</h1>
      <div style="text-align: center;">
        <label>数据类型：</label>
        <el-radio-group v-model="radio1">
          <el-radio value="1" size="large">整数</el-radio>
          <el-radio value="2" size="large">浮点数</el-radio>
        </el-radio-group>
      </div>
    </el-card>
  </div>

  <br><br>
  <div>
    <Transition>
      <span :key="radio1" class="flex flex-col justify-center items-center">
        <el-card class="h-screen w-5/6 relative">
          <div v-if="radio1 === '1'" class="relative">
            <h2>十进制整数转二进制</h2>
            <el-input v-model="input1" placeholder="请输入整数(-128~+127)" class="InputStyle"></el-input>
            <Transition>
              <span :key="input1">
                <p style="text-align: center;"> 原码：{{ IntegerSourceCode }} </p>
                <p style="text-align: center;"> 反码：{{ IntegerInverseCode }} </p>
                <p style="text-align: center;"> 补码：{{ IntegerComplement }} </p>
                <p style="width: 80%; margin: auto; display: block;">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机器数通常是带有符号的（指有正数和负数之分），计算机用最高位存放符号，这个 bit 一般叫做符号位。 正数的符号位为
                  0，
                  负数的符号位为
                  1。比如，十进制中的数 +7 ，计算机字长为8位，转换成二进制就是 0 0 0 0 0 1 1 1（一个 byte 有 8bit，有效的取值范围是 -128 ~ +127）。
                </p>
                <p style="width: 80%; margin: auto; display: block;">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;十进制数据的二进制表现形式就是原码，原码最左边的一个数字就是符号位，0为正，1为负。
                </p>
                <p style="width: 80%; margin: auto; display: block;">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正数的反码是其本身（等于原码），负数的反码是符号位保持不变，其余位取反。
                  反码的存在是为了正确计算负数，因为原码不能用于计算负数。
                </p>
                <p style="width: 80%; margin: auto; display: block;">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正数的补码是其本身，负数的补码等于其反码 +1。因为反码不能解决负数跨零（类似于 -6 + 7）的问题，所以补码出现了。
                </p>
                <p style="width: 80%; margin: auto; display: block;">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在计算机当中都是使用补码来进行计算和存储的。补码很好的解决了反码负数不能跨零计算的弊端，并且补码还可以记录一个特殊的值
                  -128，这个数据在
                  1 个字节下是没有原码和反码。
                </p>
                <div style="text-align: center;">
                  <el-table :data="tableData" border style="width: 80%; display: inline-block;">
                    <el-table-column prop="Ten" label="十进制数字" width="180" header-align="center" align="center" />
                    <el-table-column prop="Source" label="原码" width="180" header-align="center" align="center" />
                    <el-table-column prop="Inverse" label="反码" header-align="center" align="center" />
                    <el-table-column prop="Complement" label="补码" header-align="center" align="center" />
                  </el-table>
                </div>
              </span>
            </Transition>
          </div>
          <div v-else class="relative">

            <h2>十进制浮点数转二进制</h2>
            <el-input v-model="input2" placeholder="请输入浮点数" class="InputStyle"></el-input>
            <Transition>
              <span :key="FloatIEEECode">

                <p style="text-align: center;"> IEEE 754 浮点数计数标准：{{ FloatIEEECode }} </p>
                <div style="text-align: center;">
                  <p> Sign(符号位) </p>
                  <div>
                    <el-button
                      :style="{ 'background-color': buttons[0] === 1 ? 'red' : 'white', margin: '1px', width: '30px' }">31</el-button>
                  </div>
                  <p> {{ SignNum }} </p>
                  <p> Exponent(阶码部分) </p>
                  <div>
                    <el-button v-for="(button, index) in buttons.slice(1, 9)" :key="index"
                      :style="{ 'background-color': button === 1 ? 'red' : 'white', margin: '1px', width: '30px' }">{{
          30 - index }}</el-button>
                  </div>
                  <p v-for="(item, index) in ExponentNum" :key="index" style="margin:12px; display: inline-block;">{{
          item }}</p>
                  <p> Mantissa(尾数部分) </p>
                  <div>
                    <el-button v-for="(button, index) in buttons.slice(9, 32)" :key="index"
                      :style="{ 'background-color': button === 1 ? 'red' : 'white', margin: '1px', width: '30px' }">{{
          22 - index }}</el-button>
                  </div>
                  <p v-for="(item, index) in MantissaNum" :key="index" style="margin:12px; display: inline-block;">{{
                    item }}</p>
                </div>
                <h1>IEEE 754标准原理</h1>
                <img src="../assets/IEEElatex.png" alt="IEEE 表达式" style="display: block; margin: auto; width: 25%;" />
                <p>1. 符号位（S）：0表示正数，1表示负数</p>
                <p>2. 阶码部分（E）：用偏移量表示，即真实值加上一个固定值，这个固定值是2的n次方-1，n是阶码的位数。以float为例，该固定值为127</p>
                <p>3. 尾数部分（M）：尾数部分的值是1.xxxxxx，其中xxxxxx是小数部分的二进制表示</p>
                <p>4. 由于阶码部分和尾数部分都是用补码表示，所以阶码部分的真实值是阶码部分的值减去固定值，尾数部分的真实值是1+尾数部分的值</p>
                <img src="../assets/FloatIEEE.png" alt="IEEE 754标准原理" style="width: 100%;" />
              </span>

            </Transition>
          </div>
        </el-card>
      </span>
    </Transition>



  </div>


</template>

<script>
export default {
  data() {
    return {
      radio1: '1',
      input1: '',
      input2: '',
      IntegerSourceCode: '',
      IntegerInverseCode: '',
      IntegerComplement: '',
      FloatIEEECode: '',
      SignNum: '1',
      ExponentNum: Array(8).fill(0),
      MantissaNum: Array(23).fill(0),
      buttons: Array(32).fill(0),
      tableData: [
        {
          Ten: '+0',
          Source: '0000 0000',
          Inverse: '0000 0000',
          Complement: '0000 0000'
        },
        {
          Ten: '-0',
          Source: '1000 0000',
          Inverse: '1111 1111',
          Complement: '0000 0000'
        },
        {
          Ten: '-1',
          Source: '1000 0001',
          Inverse: '1111 1110',
          Complement: '1111 1111'
        },
        {
          Ten: '-2',
          Source: '1000 0010',
          Inverse: '1111 1101',
          Complement: '1111 1110'
        },
        {
          Ten: '...',
          Source: '...',
          Inverse: '...',
          Complement: '...'
        },
        {
          Ten: '-127',
          Source: '1111 1111',
          Inverse: '1000 0000',
          Complement: '1000 0001'
        },
        {
          Ten: '-128',
          Source: '无',
          Inverse: '无',
          Complement: '1000 0000'
        },
      ]
    }
  },
  methods: {
    IntegerToSourceCode(data) {
      let intValue = parseInt(data);
      let binaryArray = Array(8).fill(0);
      if (intValue < 0 || data[0] === '-') {
        binaryArray[0] = 1;
        intValue = -intValue;
      }
      for (let i = 7; i > 0; i--) {
        binaryArray[i] = intValue % 2;
        intValue = Math.floor(intValue / 2);
        if (intValue === 0) {
          break;
        }
      }
      return binaryArray.join('');
    },
    IntegerToInverseCode(data) {
      let binaryArray = data.split('');
      if (binaryArray[0] === '0') {
        return binaryArray.join('');
      }
      for (let i = 1; i < binaryArray.length; i++) {
        binaryArray[i] = binaryArray[i] === '0' ? '1' : '0';
      }
      return binaryArray.join('');
    },
    IntegerToComplement(data) {
      let binaryArray = data.split('');
      if (binaryArray[0] === '0') {
        return binaryArray.join('');
      }
      let carry = 1;
      for (let i = 7; i >= 0; i--) {
        let sum = parseInt(binaryArray[i]) + carry;
        binaryArray[i] = sum % 2;
        carry = Math.floor(sum / 2);
      }
      return binaryArray.join('');
    },
    FloatToIEEECode(data) {
      let floatValue = parseFloat(data);
      let integerPart = Math.floor(floatValue);
      let decimalPart = floatValue - integerPart;
      let operator = 0;
      if (integerPart < 0) {
        operator = 1;
        integerPart = -integerPart;
      }
      let BinaryArray = Array(64).fill(0);
      let exp = 0;
      let id = 0;
      for (let i = 15; i >= 0; i--) {
        BinaryArray[i] = integerPart % 2;
        integerPart = Math.floor(integerPart / 2);
        if (integerPart === 0) {
          break;
        }
      }
      for (let i = 16; i < 64; i++) {
        decimalPart *= 2;
        BinaryArray[i] = Math.floor(decimalPart);
        decimalPart -= Math.floor(decimalPart);
      }
      console.log(BinaryArray);
      for (let i = 0; i < 64; i++) {
        if (BinaryArray[i] === 1) {
          exp = 15 - i;
          id = i + 1;
          break;
        }
      }
      exp += 127;

      let expArray = Array(32).fill(0);
      for (let i = 8; i >= 1; i--) {
        expArray[i] = exp % 2;
        exp = Math.floor(exp / 2);
        if (exp === 0) {
          break;
        }
      }
      expArray[0] = operator;
      for (let i = 9; i < 32; i++, id++) {
        expArray[i] = BinaryArray[id];
      }
      this.FloatIEEECode = expArray.join('').match(/.{1,8}/g).join(' ');
      this.SignNum = expArray[0];
      for (let i = 0; i < 8; i++) {
        this.ExponentNum[i] = expArray[i + 1];
      }
      for (let i = 0; i < 23; i++) {
        this.MantissaNum[i] = expArray[i + 9];
      }
      for (let i = 0; i < 32; i++) {
        if (expArray[i] === 1) {
          this.buttons[i] = 1;
        } else {
          this.buttons[i] = 0;
        }
      }
    }
  },
  watch: {
    input1(newValue) {
      if (newValue === '' || newValue < -128 || newValue > 127) {
        this.IntegerSourceCode = '';
        this.IntegerInverseCode = '';
        this.IntegerComplement = '';
        return;
      }
      if (newValue == -128) {
        this.IntegerSourceCode = '';
        this.IntegerInverseCode = '';
        this.IntegerComplement = '10000000';
        return;
      }
      this.IntegerSourceCode = this.IntegerToSourceCode(newValue);
      this.IntegerInverseCode = this.IntegerToInverseCode(this.IntegerSourceCode);
      this.IntegerComplement = this.IntegerToComplement(this.IntegerInverseCode);
    },
    input2(newValue) {
      if (newValue === '') {
        this.FloatIEEECode = '';
        return;
      }
      this.FloatToIEEECode(newValue);
    }

  }
}
</script>

<style scoped>
p {
  font-size: 1.2rem;
  color: #014839;
}

h1,
h2 {
  font-size: large;
  text-align: center;
}

.pai {
  border-width: 20px;
  border-color: #00372b;
  border-style: outset;
  /* padding: 100px; */
  margin: 5x;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
  position: absolute;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.InputStyle {
  width: 200px;
  display: block;
  margin: auto;
}
</style>