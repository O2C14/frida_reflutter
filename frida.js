var BaseAddr = null;
const idaBase = ptr('0x180001000');
function to_VA(addr) {//IDA 的'RVA' 转换成VA
    if (addr.includes('0x') == false) {
        addr = '0x' + addr;
    }
    var offset = ptr(addr).sub(idaBase);
    var result = (BaseAddr.add(offset)).add(ptr('0x1000'));
    //console.log('[+] 转换结果:', result);
    return result;
}
function app_so(addr) {
    if (addr.includes('0x') == false) {
        addr = '0x' + addr;
    }
    return ((ptr(addr)).sub(ptr(VA_kDartVmSnapshotInstructions))).add(_kDartVmSnapshotInstructions);
}
function alog(...arg) {
    console.log(...arg);
}


function flutterAt() {

}
function get_kDartVmSnapshotInstructions() {
    Interceptor.attach(to_VA('18078A580'), {
        onEnter: function () {
            var pointer = this.context.rbp
            //pointer.readAnsiString();.readAnsiString()
            //alog(pointer);
            //alog(pointer.readAnsiString());
            if (pointer.readAnsiString() === '_kDartVmSnapshotInstructions') {
                _kDartVmSnapshotInstructions = pointer;
                alog(_kDartVmSnapshotInstructions);
                hookflutterinit();
            }
        }
    });
}
function hookflutterinit() {
    Interceptor.attach(app_so('50C314'), {
        onEnter: function () {
            alog('这是构造函数');
        },
        onLeave: function () {
            var thiss = this.context.rax;
            alog(thiss);
            alog(Memory.readS32(thiss.add(0x1f)));
        }
    });
}
function arrr() {
    function rp(arg0) {
        return Memory.readPointer(arg0);
    }
    function ru64(arg0) {
        return Memory.readU64(arg0);
    }
    function length_(array) {
        return ru64((rp(array.add(8))).add(15));
        //return ru64(array.add(15));
    }
    //console.clear();
    var tls_index = {};
    function clearConsole() {
        console.log("\n".repeat(process.stdout.rows));
    }

    /**    Interceptor.attach(to_VA('1806921C9'), {
          onEnter: function (args) {
             
              if (args[2] == 89) {
                  alog(this.context.rcx, this.context.rdx, this.context.r8);
              }
  
          },
          onLeave: function (retval) {
              
              if (length_(retval) < 1000) {
                  alog(length_(this.context.rax));
              } 
  
              if(ptr(this.context.rax)in tls_index){
                  tls_index.ptr(this.context.rax)+=1;
              }else{
                  tls_index.ptr(this.context.rax)=0;
              }
              clearConsole();
              alog((this.context.rax));
              
          }
      });
  
      Interceptor.attach(to_VA('1806F327E'), {
          onEnter: function (args) {
              //alog('tls',this.context.rcx);
              //this.context.rcx+=1;
              if (this.context.r8 == 0x5) {
                  //alog(this.context.rcx, this.context.rdx, this.context.r8);
                  //var context = Stalker.parse(this).context;
                  //alog(context.gs);
                  //alog(rp(to_VA('180F96030')));
              }
          },
      });*/

}
function hookflutter() {
    function handles(ObjectPtr, arg3) {
        var Zone = Handle;
        var Object__HandleImpl = new NativeFunction(to_VA('180691720'), 'pointer', ['pointer', 'pointer', 'int64']);
        return Object__HandleImpl(Zone, ObjectPtr, arg3);
    }
    var Class__Handle = new NativeFunction(to_VA('1806BC2A0'), 'pointer', []);
    alog('Class::Handle', to_VA('1806BC2A0'));
    function Class__Handle2() {
        //Class::Handle
        return handles(nullptr(), 5);
    }
    function Function__Handle() {
        //Function::Handle
        return handles(nullptr(), 7);
    }
    function Field__Handle(arg0) {
        //Field::Handle
        if (arg0 === 0) {
            arg0 = nullptr();
        }
        return handles(arg0, 11);
    }
    function Instance__Handle() {
        //Instance::Handle
        return handles(nullptr(), 43);
    }
    function AbstractType__Handle() {
        //AbstractType::Handle
        return handles(nullptr(), 46);
    }
    function Array__Handle(arg0) {
        //Array::Handle
        if (arg0 === 0) {
            arg0 = nullptr();
            return handles(arg0, 89);
        } else {
            //var atmp = Array__Handle(0);
            //wp(atmp.add(8), arg0);
            return handles(arg0, 89);
        }

    }
    function String__Handle() {
        //String::Handle
        return handles(nullptr(), 92);
    }

    var Class__ToCString = new NativeFunction(to_VA('1806F3210'), 'pointer', ['pointer']);
    //alog(to_VA('1806F3210'))

    //var Function__IsLocalFunction =  new NativeFunction(to_VA(''), 'pointer', []);

    //var Function__InternalSignature =  new NativeFunction(to_VA(''), 'pointer', []);

    //var Class__DictionaryName = new NativeFunction(to_VA('1806E9FE0'), 'pointer', ['pointer', 'pointer']);

    var String__ToCString = new NativeFunction(to_VA('180712CD0'), 'pointer', ['pointer']);
    //alog(to_VA('180712CD0'))

    var AbstractType__operator = new NativeFunction(to_VA('1806915C0'), 'pointer', ['pointer', 'pointer']);
    //AbstractType::operator=^
    //alog(to_VA('1806915C0'))

    function Class__SuperClass(arg0) {
        var a2 = Memory.alloc(8);
        var ClassSuperClass = new NativeFunction(to_VA('1806EAA80'), 'pointer', ['pointer', 'pointer', 'int']);
        ClassSuperClass(arg0, a2, 0);
        return rp(a2);
    }
    //class,string
    function toCString(arg0) {
        //alog(rp((rp(arg0)).add(0x2B0)));
        var CString = new NativeFunction(rp((rp(arg0)).add(0x2B0)), 'pointer', ['pointer']);
        return CString(arg0);
    }
    //class
    function clsname(cls) {
        return rp((rp(cls.add(8))).add(0x07));
    }
    //class
    function clsfunctions(cls) {
        return rp((rp(cls.add(8))).add(0xf));//原来是0x17
    }
    //class
    function clsfields(cls) {
        return rp((rp(cls.add(8))).add(0x1f));//原来是0x27
    }

    function clsinterfaces(cls) {
        return rp((rp(cls.add(8))).add(0x2f));//原来是0x37
        //dart::ClassFinalizer::PrintClassInformation
    }
    function rp(arg0) {
        return Memory.readPointer(arg0);
    }
    function ru64(arg0) {
        return Memory.readU64(arg0);
    }
    function wu64(arg0, arg1) {
        return Memory.writeU64(arg0, arg1);
    }
    function ru32(arg0) {
        return Memory.readU32(arg0);
    }
    function wp(arg0, arg1) {
        Memory.writePointer(arg0, arg1);
    }

    //array
    function length_(array) {
        return rp((rp(array.add(8))).add(0x0f));
        //return ru64(array.add(15));
    }

    function nullptr() {
        return rp(to_VA('180F96030'));
    }        //funcs=Array__Handle2();

    var teb_tlsindex = null;
    var canlog = 1;
    var Handle;
    function getgs() {
        Interceptor.attach(to_VA('1806BC2C5'), {
            onEnter: function () {
                if (canlog === 1) {
                    teb_tlsindex = this.context.rax;
                    Handle = rp(teb_tlsindex.add(24));
                    alog('Handle', Handle);
                    alog('typepointer', teb_tlsindex);
                }
            },
        });
    }
    var typelist = [
        "IsClass",
        "IsPatchClass",
        "IsFunction",
        "IsTypeParameters",
        "IsClosureData",
        "IsFfiTrampolineData",
        "IsField",
        "IsScript",
        "IsLibrary",
        "IsNamespace",
        "IsKernelProgramInfo",
        "IsWeakSerializationReference",
        "IsCode",
        "IsInstructions",
        "IsInstructionsSection",
        "IsInstructionsTable",
        "IsObjectPool",
        "IsPcDescriptors",
        "IsCodeSourceMap",
        "IsCompressedStackMaps",
        "IsLocalVarDescriptors",
        "IsExceptionHandlers",
        "IsContext",
        "IsContextScope",
        "IsSentinel",
        "IsSingleTargetCache",
        "IsUnlinkedCall",
        "IsMonomorphicSmiableCall",
        "IsCallSiteData",
        "IsICData",
        "IsMegamorphicCache",
        "IsSubtypeTestCache",
        "IsLoadingUnit",
        "IsError",
        "IsApiError",
        "IsLanguageError",
        "IsUnhandledException",
        "IsUnwindError",
        "IsInstance",
        "IsLibraryPrefix",
        "IsTypeArguments",
        "IsAbstractType",
        "IsType",
        "IsFunctionType",
        "IsRecordType",
        "IsTypeRef",
        "IsTypeParameter",
        "IsFinalizerBase",
        "IsFinalizer",
        "IsNativeFinalizer",
        "IsFinalizerEntry",
        "IsClosure",
        "IsNumber",
        "IsInteger",
        "IsSmi",
        "IsMint",
        "IsDouble",
        "IsBool",
        "IsFloat32x4",
        "IsInt32x4",
        "IsFloat64x2",
        "IsRecord",
        "IsTypedDataBase",
        "IsTypedData",
        "IsExternalTypedData",
        "IsTypedDataView",
        "IsPointer",
        "IsDynamicLibrary",
        "IsCapability",
        "IsReceivePort",
        "IsSendPort",
        "IsStackTrace",
        "IsSuspendState",
        "IsRegExp",
        "IsWeakProperty",
        "IsWeakReference",
        "IsMirrorReference",
        "IsFutureOr",
        "IsUserTag",
        "IsTransferableTypedData",
        "IsMap",
        "IsSet",
        "IsArray",
        "IsGrowableObjectArray",
        "IsString"
    ];
    function logtype(ObjectPtr) {
        var tmpstr = "type is:";
        for (var i = 1; i < 86; i += 1) {
            var tmpfun = new NativeFunction(rp((rp(ObjectPtr)).add(8 * i)), 'uint8', ['pointer']);
            if (tmpfun(ObjectPtr) === 1) {
                tmpstr += typelist[i - 1];
                tmpstr += " ";
            }
        }
        alog(tmpstr);
    }
    Interceptor.replace(to_VA('1806BC2D0'), new NativeCallback(function (arg0) {
        alog('目标位置', to_VA('1806BC2D0'));
        //var v8 = Memory.alloc(8);
        //var supname = 0;
        //var supcls = 0;
        //var interfaces = 0;
        //var interface__ = 0;
        var thiss = arg0;
        var classnum = ru32(thiss.add(0x10));
        getgs();
        var cls = Class__Handle();
        Interceptor.detachAll();
        canlog = 0;
        cls = Class__Handle2();
        //var name = String__Handle();


        for (var i = 1; i < classnum; i += 1) {
            //&& i === 56
            if (((rp((rp(thiss.add(0x30))).add(8 * i))).toString() != (nullptr()).toString()) && (rp((rp(thiss.add(0x30))).add(8 * i))) != 0x0) {

                wp((cls.add(8)), rp((rp(thiss.add(0x30))).add(8 * i)));
                var classText = Memory.readCString(toCString(cls));
                var tmpst = Memory.readCString(toCString(cls));
                if ("Library:'dart:io' Class: _ResourceHandleImpl@14069316" == classText) {
                    alog('target', i)
                }
                //Class name
                var supname = String__Handle();
                var supcls = Class__Handle2();
                if ((Class__SuperClass(cls)).toString() != (nullptr()).toString()) {
                    wp(supcls.add(8), Class__SuperClass(cls));
                    wp(supname.add(8), clsname(supcls));
                    classText += (" extends " + Memory.readCString(toCString(supname)));
                }
                var interfaces = Array__Handle(clsinterfaces(cls));
                var interfacesptr = rp(interfaces.add(8));
                var interface1 = Instance__Handle();
                if ((interfacesptr).toString() != (nullptr()).toString()) {
                    var lenn = ru64((interfacesptr).add(0xf)) / 2;
                    for (var in_ = 0; in_ < lenn; in_ += 1) {
                        AbstractType__operator(interface1, rp((interfacesptr).add(in_ * 8 + 23)));
                        if (in_ == 0) {
                            classText += ' implements ';
                        }
                        if (in_ > 0) {
                            classText += ' , ';
                        }
                        classText += Memory.readCString(toCString(interface1));
                    }
                }
                classText += ' {\n';
                //if (i === 55) {

                if (i === 56) {//1989
                //if (i === 1974) {//来自ClassFinalizer.cc
                    var fields = Array__Handle(clsfields(cls));
                    var fieldsptr = rp(fields.add(8));
                    var field = Field__Handle(0);
                    var fieldType = AbstractType__Handle();
                    var finame = String__Handle();
                    var instance2 = Instance__Handle()
                    if (fieldsptr.toString() != (nullptr()).toString()) {
                        var fieldsnum = ru64(fieldsptr.add(0xf)) / 2;
                        for (var f = 0; f < fieldsnum; f += 1) {
                            wp(field.add(8), rp(fieldsptr.add(f * 8 + 8 * 2 + 7)));
                            var fieldptr = rp(field.add(8));
                            //alog('fieldptr', fieldptr);
                            //alog(i,tmpst,ru32(fieldptr.add(8 * 4 + 7+1)));
                            wp(finame.add(8), rp(fieldptr.add(7)));
                            AbstractType__operator(fieldType, rp(fieldptr.add(8 * 2 + 7)));
                            //alog('field',Memory.readCString(toCString(field)))
                            //logtype(fieldType);
                            classText += (Memory.readCString(toCString(fieldType)) + "  " + Memory.readCString(toCString(finame)));
                            if (ru32(fieldptr.add(8 * 4 + 7 + 1)) != 0) {
                                //这个是我观察出来的
                                if (ru64((fieldptr.add(39))) % 2 != 0) {
                                    var tmp1 = ru64((fieldptr.add(39))).sub(1);
                                } else {
                                    var tmp1 = ru64((fieldptr.add(39)));
                                }
                                //alog(1,rp(teb_tlsindex.add(80)))
                                //alog(2,rp(rp(teb_tlsindex.add(80)).add(64)))
                                //alog(3,rp(rp(rp(teb_tlsindex.add(80)).add(64)).add(24)))
                                //alog(4,rp(rp(rp(rp(teb_tlsindex.add(80)).add(64)).add(24)).add(4*tmp1)))
                                //来自Field::InitializeStatic() 
                                AbstractType__operator(instance2, rp(rp(rp(rp(teb_tlsindex.add(80)).add(64)).add(24)).add(4 * tmp1)));
                                //alog('alog', Memory.readCString(toCString(instance2)));
                                classText+=(' = '+Memory.readCString(toCString(instance2))+";\n");
                            }else{
                                classText+=' = nonstatic;\n'
                            }
                        } 
                    }
                    alog("class", rp(cls.add(8)));
                    alog('nullptr', nullptr());
                    var funcs = Array__Handle(clsfunctions(cls));
                    var funcsptr = rp(funcs.add(8));
                    alog('funcsptr',funcsptr);
                    var signature = String__Handle();
                    if (funcsptr.toString() != (nullptr()).toString()) {
                        var funcsum = ru64(funcsptr.add(0xf)) / 2;
                        for (var c = 0; c < funcsum; c += 1) {
                            var func = Function__Handle();
                            wp(func.add(8),rp(funcsptr.add(c * 8 + 8 * 2 + 7)));
                            classText+=(Memory.readCString(toCString(func))+";\n");

                            //来自Function::PrintName
                            //alog(c,'func',Memory.readCString(toCString(func)));
                           // alog(c);

                        }
                    }alog(classText);

                }
                if (i === 1358) {
                    //alog(classText += (Memory.readCString(fieldnameptr, namelen) + '\n'));

                }
            }
        }
    }, 'void', ['pointer']));
}
function callfunc(name, ...args) {
    send({
        "callfunc": name,
        "arg": args
    });
}

var Modulename = "flutter_windows.dll";
var VA_kDartVmSnapshotInstructions = '0x21CDF9';
var _kDartVmSnapshotInstructions = 0;
function main() {
    alog('脚本加载成功');
    while (BaseAddr === null) {
        alog("尝试查找" + Modulename + "的基址");
        BaseAddr = Module.findBaseAddress(Modulename);
    }
    alog("基址: " + BaseAddr);
    //hook_function(); 
    //hooktest();
    //get_kDartVmSnapshotInstructions();
    arrr();
    hookflutter();
    // 
    rpc.exports = {
        onchange: function (result) {
            alog(result.id);
            switch (result.id) {
                case 3:
                    if (result.event == 'changeslider') {
                        alog(result.value);
                    }
            }
        },
        unloadscript: function () {
            Interceptor.detachAll();
            //session.detach();
        }
    };
}
main();
