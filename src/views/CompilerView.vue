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
        <div>
            <el-drawer v-model="drawer" title="I am the title" :with-header="false">
                <span>
                    <p>Java 中存在一个中间代码名为 bytecode，是 Java 代码编译后的中间代码格式。JVM 需要读取并解析字节码才能执行相应的任务</p><br>
                    <p>从技术人员的角度看，Java 字节码是 JVM 的指令集。JVM 加载字节码格式的 class 文件，校验之后通过 JIT 编译器转换为本地机器代码执行</p><br>
                    <p>我们可以用 javap 指令反编译.class 文件或者在此网站中编译以查看字节码</p>
                </span>
            </el-drawer>
            <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
                中间代码
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
            console.log(this.form.soucre);
            console.log(11111111);
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
</style>