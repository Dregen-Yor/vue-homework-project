<template>
  <main>
    <div class="w-1/2">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="instruction" label="指令"></el-table-column>
        <el-table-column label="指针">
          <template v-slot="scope">
            <img v-show="pointerIndex === scope.$index" src="@/assets/arraw.svg" height="20px" width="20px">
          </template>
        </el-table-column>
      </el-table>
    </div>
    
  </main>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { address: '0x0001', instruction: 'JUMP 0x0003' },
        { address: '0x0002', instruction: 'JUMP 0x0001' },
        { address: '0x0003', instruction: 'JUMP 0x0002' },
        // ...
      ],
      pointerIndex: 1,
    };
  },
  methods: {
    executeInstructions() {
      for (let i = 0; i < this.tableData.length; i++) {
        const instruction = this.tableData[i].instruction;
        if (instruction.startsWith('JUMP')) {
          const address = instruction.split(' ')[1];
          this.pointerIndex = this.getAddressIndex(address);
        }
      }
    },
  },
  mounted() {
    this.executeInstructions();
  },
};
</script>