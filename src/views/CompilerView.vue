<template>
    <br>
    <main class="flex  items-center h-screen space-x-10" v-loading="startloader">
        <br>
        <div class="h-screen w-50vh ">
            <el-form :model="form">
                <div class="flex">
                    <el-form-item label="选择语言：" class=" mr-36">
                        <el-select v-model="form.lang" placeholder="请选择语言" style="width:20vh" @change="onlanguagechange">
                            <el-option v-for="lang in langs" :key="lang" :label="lang.name" :value="lang.id" :id="lang.id">{{ lang.name }}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择编译器">
                        <el-select v-model="form.compiler" placeholder="请选择编译器" style="width: 20vh;" :disabled="compilerselect" v-loading="selectloader">
                            <el-option v-for="compiler in compilers" :key="compiler" :label="compiler.name" :value="compiler.id">{{ compiler.name }}</el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <el-form-item label="源代码">
                    <vue-monaco-editor  v-model:value="this.form.source" :options="MONACO_EDITOR_OPTIONS" style="width: 70vh; height:90vh;" :language="this.form.lang">你好</vue-monaco-editor>
                </el-form-item>
            </el-form>
        </div>
        <div class="h-screen w-50vh">
                <el-form class="flex flex-col space-y-5">
                    <el-form-label label="点击编译">
                        <el-button type="primary" @click="onCompiler">编译</el-button>
                    </el-form-label>
                    <el-input type="textarea" v-model="result" style="width: 70vh; " readonly="true" v-loading="resultloader">
                    </el-input>
                </el-form>
        </div>
        <div class=" space-y-6"> 
            <el-drawer v-model="drawer" title="中间代码（Bytecode）" :with-header="true">
                <span>
                    <p>Java 中存在一个中间代码名为 bytecode，是 Java 代码编译后的中间代码格式。JVM 需要读取并解析字节码才能执行相应的任务</p><br>
                    <p>从技术人员的角度看，Java 字节码是 JVM 的指令集。JVM 加载字节码格式的 class 文件，校验之后通过 JIT 编译器转换为本地机器代码执行</p><br>
                    <p>我们可以用 javap 指令反编译.class 文件或者在此网站中编译以查看字节码</p>
                </span>
            </el-drawer>
            <el-drawer v-model="drawerc" :with-header="true" title="编译过程解释" class="h-screen">
                <span>
                    <p>  编译器 (Compiler) 将每个源文件从某门高级编程语言转化为汇编语言，注意此时源文件仍然是一个 ASCII 或其他编码的文本文件；</p><br>
                    <p>汇编器 (Assembler) 将上一步的每个源文件中的文本格式的指令转化为机器码，得到一个二进制的 目标文件 (Object File)</p><br>
                    <p>链接器 (Linker) 将上一步得到的所有目标文件以及一些可能的外部目标文件链接在一起形成一个完整的可执行文件。</p><br>
                    <p>  第一件事情是将来自不同目标文件的段在目标内存布局中重新排布。如下图所示，在链接过程中，分别来自于目标文件 1.o 和 2.o 段被按照段的功能进行分类，相同功能的段被排在一起放在拼装后的目标文件 output.o 中。注意到，目标文件 1.o 和 2.o 的内存布局是存在冲突的，同一个地址在不同的内存布局中存放不同的内容。而在合并后的内存布局中，这些冲突被消除。</p>
                    <img src="@/assets/link-sections.png">
                    <p>  第二件事情是将符号替换为具体地址。这里的符号指什么呢？我们知道，在我们进行模块化编程的时候，每个模块都会提供一些向其他模块公开的全局变量、函数等供其他模块访问，也会访问其他模块向它公开的内容。要访问一个变量或者调用一个函数，在源代码级别我们只需知道它们的名字即可，这些名字被我们称为符号。取决于符号来自于模块内部还是其他模块，我们还可以进一步将符号分成内部符号和外部符号。然而，在机器码级别（也即在目标文件或可执行文件中）我们并不是通过符号来找到索引我们想要访问的变量或函数，而是直接通过变量或函数的地址。例如，如果想调用一个函数，那么在指令的机器码中我们可以找到函数入口的绝对地址或者相对于当前 PC 的相对地址。</p><br>
                    <p>  那么，符号何时被替换为具体地址呢？因为符号对应的变量或函数都是放在某个段里面的固定位置（如全局变量往往放在 .bss 或者 .data 段中，而函数则放在 .text 段中），所以我们需要等待符号所在的段确定了它们在内存布局中的位置之后才能知道它们确切的地址。当一个模块被转化为目标文件之后，它的内部符号就已经在目标文件中被转化为具体的地址了，因为目标文件给出了模块的内存布局，也就意味着模块内的各个段的位置已经被确定了。然而，此时模块所用到的外部符号的地址无法确定。我们需要将这些外部符号记录下来，放在目标文件一个名为符号表（Symbol table）的区域内。由于后续可能还需要重定位，内部符号也同样需要被记录在符号表中。</p><br>
                    <p>外部符号需要等到链接的时候才能被转化为具体地址。假设模块 1 用到了模块 2 提供的内容，当两个模块的目标文件链接到一起的时候，它们的内存布局会被合并，也就意味着两个模块的各个段的位置均被确定下来。此时，模块 1 用到的来自模块 2 的外部符号可以被转化为具体地址。同时我们还需要注意：两个模块的段在合并后的内存布局中被重新排布，其最终的位置有可能和它们在模块自身的局部内存布局中的位置相比已经发生了变化。因此，每个模块的内部符号的地址也有可能会发生变化，我们也需要进行修正。上面的过程被称为重定位（Relocation），这个过程形象一些来说很像拼图：由于模块 1 用到了模块 2 的内容，因此二者分别相当于一块凹进和凸出一部分的拼图，正因如此我们可以将它们无缝地拼接到一起。</p>
                </span>
            </el-drawer>
            <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
                中间代码
            </el-button>
            
            <el-button type="primary" style="margin-left: 16px" @click="drawerc = true" class=" text-blue-200">
                中间过程
            </el-button>
            <br>
        </div>
    </main>
</template>
<script>
import axios from 'axios';
import { reactive } from 'vue';

export default{
    mounted(){
        const getLangs = () => {
            this.startloader = true;
            axios.get("https://godbolt.org/api/languages").then(response => {
                this.langs = response.data;
                this.startloader = false;
            }).catch(err => {
                console.log(err);
                this.startloader = false;
            });
        };
        getLangs();
    },
    data(){
        return{
            compilerselect:true,
            langs:[],
            drawer:false,
            drawerc:false,
            compilers:[],
            Data:[],
            selectloader:false,
            resultloader:false,
            startloader:true,
            MONACO_EDITOR_OPTIONS :{
                automaticLayout: true,
                formatOnType: true,
                formatOnPaste: true,
            },
            form:reactive({
                soucre:"",
                compiler:"",
                options:{
                    userArguments:"",
                    compilerOptions:{
                        producePp :null,
                        produceGccDump:{

                        },
                        produceOptInfo:false,
                        produceIr:null,
                        produceOptPipeline:null,
                        produceDevice:false,
                        overrides:[

                        ]
                    },
                    filters:{

                    },
                    tools:[

                    ],
                    libraries:[

                    ],
                    executeParameters:{
                        args:"",
                        stdin:""
                    }
                },
                lang:"",
                files:[
                    
                ],
                bypassCache:0,
                allowStoreCodeDebug:true
            }),
            result:"请先编译"  
        }
    },
    methods: {
        onlanguagechange() {
            this.compilerselect = true;
            this.selectloader = true;
            axios.get("https://godbolt.org/api/compilers/"+this.form.lang).then(response => {
                this.compilers = response.data;
                this.compilerselect = false;
                this.selectloader = false;
                this.form.compile='';
            }).catch(err => {
                console.log(err);
                this.selectloader = false;
            });
        },
        onCompiler(){
            if(this.form.compiler==""){
                alert("请选择编译器");
                return;
            }
            if(this.form.source==""){
                alert("请输入源代码");
                return;
            }
            if(this.form.lang==""){
                alert("请选择语言");
                return;
            }
            this.result="正在编译........";
            this.resultloader=true;
            axios.post("https://godbolt.org/api/compiler/"+this.form.compiler+"/compile",this.form).then(response =>{
                console.log("success");
                this.Data=response.data.asm;
                this.result="";
                for(let i=0;i<this.Data.length;i++){
                    this.result+=this.Data[i].text+'\n';
                }
                this.resultloader=false;
            }).catch(err => {
                console.log(err);
                this.resultloader=false;
                this.result="编译失败";
            });
        }
    },
}
</script>

<style>
.el-textarea .el-textarea__inner{
  resize: none;
  height: 90vh;
}
.el-button{
    background-color: rgba(225,225,225,0.35);
    color: rgba(2, 75, 74, 0.7)
}
</style>