define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'test01/index' + location.search,
                    add_url: 'test01/add',
                    edit_url: 'test01/edit',
                    del_url: 'test01/del',
                    multi_url: 'test01/multi',
                    import_url: 'test01/import',
                    table: 'test01',
                }
            });

            var table = $("#table");
            //一键修改栏目开始01
            //btn-lanmu  绑定按钮事件
            $(document).on("click", ".btn-lanmu", function () {
                var data = table.bootstrapTable('getSelections');
                var ids = [];
                if (data.length === 0) {
                    Toastr.error("请选择操作信息");
                    return;
                }
                for (var i = 0; i < data.length; i++) {
                    ids[i] = data[i]['id'] //id,传递得数据库字段
                }
                Layer.confirm(
                    '确认要修改这'+ids.length+'条信息吗?',
                    {icon: 3, title: __('Warning'), offset: '40%', shadeClose: true},
                    function (index) {
                        Layer.close(index);
                        Backend.api.ajax({
                            /*url: "lgwy/attrchg/approve?ids=" + JSON.stringify(ids),
                            //方法一：传参方式，后台需要转换变成数组
                            url: "lgwy/attrchg/approve?ids=" + (ids),
                            data: {}*/
                            //方法二：传参方式，直接是数组传递给后台
                            url: "test01/lanmu", //ajax 请求控制器方法
                            data: {ids:ids}
                        }, function(data, ret){//成功的回调
                            if (ret.code === 1) {
                                table.bootstrapTable('refresh');
                                Layer.close(index);
                            } else {
                                Layer.close(index);
                                Toastr.error(ret.msg);
                            }
                        }, function(data, ret){//失败的回调
                            console.log(ret);
                            // Toastr.error(ret.msg);
                            Layer.close(index);
                        });
                    }
                );
            });
        //一键修改栏目结束01
            //一键修改批量修改02
            $(document).on("click", ".btn-fiapro", function () {
                var data = table.bootstrapTable('getSelections');
                var ids = [];
                if (data.length === 0) {
                    Toastr.error("请选择操作信息");
                    return;
                }
                for (var i = 0; i < data.length; i++) {
                    ids[i] = data[i]['id'] //id,传递得数据库字段
                }
                 Fast.api.ajax(
                    {
                        type: 'POST',
                        url: "test01/checkids", //ajax 请求控制器方法
                        data: {ids:ids},
                   },
                    function(data, ret)
                    {//成功的回调
                    if (ret.code === 1) {
                        Toastr.success('修改成功了@@！');
                        table.bootstrapTable('refresh');
                        Layer.close(index);
                    } else {
                        Layer.close(index);
                        Toastr.error(ret.msg);
                    }
                },
                    function(data, ret){//失败的回调
                    console.log(ret);
                    // Toastr.error(ret.msg);
                    Layer.close(index);
                }
                );
            });

            //一键修改批量修改02结束
            //一键修改批量修改03
            $(document).on("click", ".btn-fiaprots", function () {
                    var datas = table.bootstrapTable('getSelections');
                    var ids = [];
                    if (datas.length === 0) {
                        Toastr.error("请选择操作信息");
                        return;
                    }
                    for (var i = 0; i < datas.length; i++) {
                        ids[i] = datas[i]['id'] //id,传递得数据库字段
                    }

                Fast.api.open("test01/checkids01?ids="+ (ids), "修改栏目", {
                        callback: function (value) {
                            Fast.api.close(data);
                            /*console.log(value);*/

                        }
                    });
            });
            //一键修改批量修改03
            // 获取选中项
           /* $(document).on("click", ".btn-selected", function () {
                Layer.alert(JSON.stringify(Table.api.selecteddata(table)));
            });*/

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                search: true, //是否启用快速搜索
                cache: false,
                commonSearch: true, //是否启用通用搜索
                searchFormVisible: false, //是否始终显示搜索表单
                titleForm: '', //为空则不显示标题，不定义默认显示：普通搜索
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'title', title: __('Title'), operate: 'LIKE'},
                        {field: 'flagdata', title: __('Flagdata'), searchList: {"h":__('Flagdata h'),"p":__('Flagdata p'),"t":__('Flagdata t'),"r":__('Flagdata r')},
                            operate:'FIND_IN_SET',
                            formatter: Table.api.formatter.label,
                            custom:{"h":"info", "t":"danger","p":"success","r":"danger"},
                        },
                        {field: 'keywords', title: __('Keywords'), operate: 'LIKE',visible:false},
                        {field: 'category_id', title: __('Category_id'),visible:false,
                            addclass: 'selectpage',
                            extend:'data-source="category/selectpage" data-field="nickname" data-multiple="true"',
                        },
                        {field: 'category.name', title: __('Category_id'), operate:false},
                        {field: 'addtime', title: __('Addtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'image', title: __('Image'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image,visible:false},
                        {field: 'images', title: __('Images'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.images,visible:false},
                        {field: 'admin_id', title: __('Admin_id'),visible:false,operate:'=',
                            addclass: 'selectpage',
                            extend:'data-source="auth/admin/selectpage" data-field="username"',
                        },
                        {field: 'admin.username', title: __('Admin_id'),operate:false},
                        {field: 'is_switch', title: __('Is_switch'), table: table, formatter: Table.api.formatter.toggle},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1')}, formatter: Table.api.formatter.status},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate,
                            formatter: function (value, row, index) {
                                var that = $.extend({}, this);
                                var table = $(that.table).clone(true);
                                $(table).data({"operate-del:": null});

                                //隐藏的按钮设置为 null
                                that.table = table;
                                return Table.api.formatter.operate.call(that, value, row, index);
                            },
                            buttons: [
                                {   name: 'detail',
                                    text: '详情',
                                    title: '弹出窗口打开',
                                    icon: 'fa fa-list',
                                    classname: 'btn btn-xs btn-primary btn-dialog',
                                    url: 'test01/detail',
                                    callback: function (data) {
                                        Layer.alert("接收到回传数据：" + JSON.stringify(data), {title: "回传数据"});
                                    }
                                },
                                {   name: 'xiugai',
                                    text: '修改',
                                    title: '修改弹出窗口打开',
                                    icon: 'fa fa-list',
                                    classname: 'btn btn-xs btn-primary btn-dialog',
                                    url: 'test01/xiugai',
                                },
                                {
                                    name: 'xiugai02',
                                    title: __('点击执行事件'),
                                    classname: 'btn btn-xs btn-success btn-magic btn-ajax',
                                    icon: 'fa fa-leaf',
                                    //confirm: '确认要修改吗？',
                                    url: 'test01/xiugai02',
                                    refresh:true,

                                    /*success: function (data, ret) {
                                         Layer.alert(ret.msg + ",返回数据：" + JSON.stringify(data),function(){
                                             Toastr.success('修改成功！');
                                             //location.reload();
                                       });
                                        //如果需要阻止成功提示，则必须使用return false;

                                    },*/
                                    /*error: function (data, ret) {
                                        console.log(data, ret);
                                        Layer.alert(ret.msg);
                                        return false;
                                    }*/
                                },
                            ],
                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        xiugai:function(){
            Controller.api.bindevent();
        },

        detail: function () {
            $(document).on('click', '.btn-callback', function () {
                Fast.api.close($("input[name=callback]").val());
            });
        },
        checkids01:function() {
            /*Controller.api.bindevent();*/
           Form.api.bindevent($("form[role=form]"));
            /*Form.api.bindevent($("form[role=form]"), function (data, ret) {
                //这里是表单提交处理成功后的回调函数，接收来自php的返回数据
                Fast.api.close(data);
                //这里是关闭弹窗后传递 Fast.api.open中的callback:function
            }, function (data, ret) {
                Toastr.success("失败");
            });*/
        },
        recyclebin: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    'dragsort_url': ''
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: 'test01/recyclebin' + location.search,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'title', title: __('Title'), align: 'left'},
                        {
                            field: 'deletetime',
                            title: __('Deletetime'),
                            operate: 'RANGE',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'operate',
                            width: '130px',
                            title: __('Operate'),
                            table: table,
                            events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'Restore',
                                    text: __('Restore'),
                                    classname: 'btn btn-xs btn-info btn-ajax btn-restoreit',
                                    icon: 'fa fa-rotate-left',
                                    url: 'test01/restore',
                                    refresh: true
                                },
                                {
                                    name: 'Destroy',
                                    text: __('Destroy'),
                                    classname: 'btn btn-xs btn-danger btn-ajax btn-destroyit',
                                    icon: 'fa fa-times',
                                    url: 'test01/destroy',
                                    refresh: true
                                }
                            ],
                            formatter: Table.api.formatter.operate
                        }
                    ]
                ]
            });



            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});