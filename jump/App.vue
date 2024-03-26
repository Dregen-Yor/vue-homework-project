<template>
    <main>
      <div >
        <full-page ref="fullpage" :options="options" id="fullpage" >
          <div class="section" >
            <el-text style="text-align:center;font-size: 1.5em;"> 顺序结构</el-text>
            <div class="slide" data-anchor="s1-1">
                <el-card style="width: 90vh;">
                    
                    <p>在顺序结构中，代码从前往后依次执行，不跳过任何一个</p>
                </el-card>
            </div>
            <div class="slide flex " data-anchor="s1-2">
                <div style="width: 90vh; height: 90vh">
                <el-table :data="s1table" style="width: 100% " ::row-style="rowClassName">
                    <el-table-column prop="address" label="地址" style="height: 10vh;"></el-table-column>
                    <el-table-column prop="instruction" label="指令"></el-table-column>
                    <el-table-column label="位置">
                    <template v-slot="scope">
                        <img v-if="pointerIndex === scope.$index" src="@/assets/arraw.svg" height="20px" width="20px">
                    </template>
                    </el-table-column>
                </el-table>
                <el-button @click="start1" :disabled="buttonv">开始演示</el-button>
                </div>
                
                
            </div>
          </div>
          <div class="section" >
            <p>分支结构</p>
            <div class="slide" data-anchor="slide2-1">
                <el-card style="width: 90vh;">
                    <p>在分支结构中，程序根据条件有选择的向程序运行方向执行的结构，不一定会运行所有代码</p>
                </el-card>
            </div>
            <div class="slide" data-anchor="slide2-2"> 
                <el-card style="width: 90vh;height: 50vh;; font-size: 20px;">
                    <template #header>
                        <div class="card-header">
                            <span>参考代码</span>
                        </div>
                    </template>
                    <el-input type="textarea" v-model="code1" readonly="true" style="width: 70vh; "></el-input>
                </el-card>
            </div>
            <div class="slide" data-anchor="slide2-3">
                <div style="width: 100vh; height: 90vh">
                <el-table :data="s2table" style="width: 100% " ::row-style="rowClassName">
                    <el-table-column prop="address" label="地址" style="height: 10vh;"></el-table-column>
                    <el-table-column prop="instruction" label="指令"></el-table-column>
                    <el-table-column label="位置">
                    <template v-slot="scope">
                        <img v-show="pointerIndex === scope.$index" src="@/assets/arraw.svg" height="20px" width="20px">
                    </template>
                    </el-table-column>
                </el-table>
                <el-button @click="start2" :disabled="buttonv">开始演示</el-button>
                </div>
            </div>
          </div>
          <div class="section">循环结构
            <div class="slide" data-anchor="slide3-1">
                <el-card style="width: 90vh;">
                    <p>在循环结构中，程序会根据条件重复执行某一段代码，直到条件不满足为止</p>
                </el-card>
            </div>
            <div class="slide" data-anchor="slide3-2">
                <el-card style="width: 90vh;height: 50vh;; font-size: 20px;">
                    <template #header>
                        <div class="card-header">
                            <span>参考代码</span>
                        </div>
                    </template>
                    <el-input type="textarea" v-model="code2" readonly="true" style="width: 70vh; "></el-input>
                </el-card>
            </div>
            <div class="slide" data-anchor="slide3-3">
                <div style="width: 100vh; height: 90vh">
                <el-table :data="s3table" style="width: 100% " ::row-style="rowClassName">
                    <el-table-column prop="address" label="地址" style="height: 10vh;"></el-table-column>
                    <el-table-column prop="instruction" label="指令"></el-table-column>
                    <el-table-column label="位置">
                    <template v-slot="scope">
                        <img v-show="pointerIndex === scope.$index" src="@/assets/arraw.svg" height="20px" width="20px">
                    </template>
                    </el-table-column>
                </el-table>
                <el-button @click="start3" :disabled="buttonv">开始演示</el-button>
                </div>
            </div>
          </div>
        </full-page>
      </div>
  </main>
</template>
  
<script>
export default {
    data() {
      return {
        pointerIndex: -1,
        code1:"int main(){\n    int a=1,b=2;\n    if(a>b){b++;}\n    else if(a==b){a++;}\n    else{a++;}\n    return 0;\n}",
        code2:"int main(){    for(int i=1;i<=3;i++){}\n    return 0;\n}",
        buttonv:false,
        options: {
            licenseKey: 'YOUR_KEY_HERE',
            menu: '#menu',
            anchors: ['page1', 'page2', 'page3'],
            sectionsColor: ['#41b883', '#ff5f45', '#0798ec'],
        },
        s1table:[
        { address: '0x0001', instruction: 'push    rbp' },
        { address: '0x0002', instruction: 'mov     rbp, rsp' },
        { address: '0x0003', instruction: 'mov     eax, 0' },
        { address: '0x0004', instruction: 'pop     rbp'},
        { address: '0x0005', instruction: 'ret' },
        ],
        s2table:[
        { address: '0x0001', instruction: '.main: push    rbp' },
        { address: '0x0002', instruction: 'mov     rbp, rsp' },
        { address: '0x0003', instruction: 'mov     DWORD PTR [rbp-4], 1' },
        { address: '0x0004', instruction: 'mov     DWORD PTR [rbp-8], 2'},
        { address: '0x0005', instruction: 'mov     eax, DWORD PTR [rbp-4]' },
        { address: '0x0006', instruction: 'cmp     eax, DWORD PTR [rbp-8]'},
        { address: '0x0007', instruction: 'jle     .L2'},
        { address: '0x0008', instruction: 'add     DWORD PTR [rbp-8], 1'},
        { address: '0x0009', instruction: 'jmp     .L3'},
        { address: '0x000A', instruction: '.L2: mov     eax, DWORD PTR [rbp-4]'},
        { address: '0x000B', instruction: 'cmp     eax, DWORD PTR [rbp-8]'},
        { address: '0x000C', instruction: 'jne     .L4'},
        { address: '0x000D', instruction: 'add     DWORD PTR [rbp-4], 1'},
        { address: '0x000E', instruction: 'jmp     .L3'},
        { address: '0x000F', instruction: '.L4: add     DWORD PTR [rbp-4], 1'},
        { address: '0x0010', instruction: '.L3: mov     eax, 0'},
        { address: '0x0011', instruction: 'pop     rbp'},
        { address: '0x0012', instruction: 'ret' },
        ],
        s3table:[
        { address: '0x0001', instruction: '.main: push    rbp' },
        { address: '0x0002', instruction: 'mov     rbp, rsp' },
        { address: '0x0003', instruction: 'mov     DWORD PTR [rbp-4], 1' },
        { address: '0x0004', instruction: 'jmp     .L2'},
        { address: '0x0005', instruction: '.L3: add     DWORD PTR [rbp-4], 1'},
        { address: '0x0006', instruction: '.L2:    cmp     DWORD PTR [rbp-4], 3'},
        { address: '0x0007', instruction: 'jle     .L3'},
        { address: '0x0008', instruction: 'mov     eax, 0'},
        { address: '0x0009', instruction: 'pop     rbp'},
        { address: '0x000A', instruction: 'ret' },
        ]
      };
    },
    methods: {
        nextStep() {
            if (this.step < 3) {
            this.step++;
            }
        },
        rowClassName({ rowIndex }) {
            if (this.pointerIndex === rowIndex) {
                return 'warning-row';
            }
            return '';
        },
        start1(){
            this.pointerIndex=0;
            this.buttonv=true;
            setInterval(() => {
                this.pointerIndex++;
                if(this.pointerIndex >= this.s1table.length){
                    clearInterval();
                    this.buttonv=false;
                }
            }, 1000);
            this.pointerIndex=-1;
            
        },
        start2(){
            const dir=[0,1,2,3,4,5,6,9,10,11,14,15,16,17];
            var i=0;
            this.pointerIndex=-1;
            this.buttonv=true;
            setInterval(() => {
                this.pointerIndex=dir[i];
                if(i >= dir.length){
                    clearInterval();
                    this.buttonv=false;
                }
                i++;
            }, 1000);
            this.pointerIndex=-1;
            
        },
        start3(){
            const dir=[0,1,2,3,5,6,4,5,6,4,5,6,4,5,7,8,9];
            var i=0;
            this.pointerIndex=-1;
            this.buttonv=true;
            setInterval(() => {
                this.pointerIndex=dir[i];
                if(i >= dir.length){
                    clearInterval();
                    this.buttonv=false;
                }
                i++;
            }, 1000);
            this.pointerIndex=-1;
        }
    },
  };
</script>
  
<style scoped>
.section {
    text-align:center;
  font-size: 3em;
}
.slide {
    text-align:center;
  font-size: 1.5em;
  align-items: center;
}
.content{
  margin:50px
}
.el-table {
    --el-table-border-color: transparent;
    --el-table-border: none;
    --el-table-text-color: #2b2b71;
    font-size: 20px;
    --el-table-header-text-color: #2b2b71;
    --el-table-row-hover-bg-color: rgba(255, 255, 255, 0.25);
    --el-table-current-row-bg-color: rgba(204, 32, 32, 0.25);
    --el-table-header-bg-color: transparent;
    --el-table-bg-color: rgba(255, 255, 255, 0.25);
    --el-table-tr-bg-color: rgba(255, 255, 255, 0.25);
    --el-table-expanded-cell-bg-color: rgba(255, 255, 255, 0.25);
    border-radius: 15px;
}
.warning-row {
  /* --el-table-tr-bg-color: #f56c6c; */
  background-color: #d5503b;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  background-color: #d5503b;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.el-card {
  background-color: rgba(255, 255, 255, 0.25);
  border-color: rgba(66, 66, 66, 0.25);
  border-radius: 25px;
}
.el-card__body {
  border-top-color: rgba(66, 66, 66, 0.25);
}
</style>
<style>
.el-textarea .el-textarea__inner{
  resize: none;
  height: 40vh;
  font-size: 20px;
}
</style>