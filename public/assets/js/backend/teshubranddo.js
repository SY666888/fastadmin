define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'teshubranddo/index' + location.search,
                    add_url: 'teshubranddo/add',
                    edit_url: 'teshubranddo/edit',
                    del_url: 'teshubranddo/del',
                    multi_url: 'teshubranddo/multi',
                    import_url: 'teshubranddo/import',
                    table: 'teshu_brands',
                }
            });

            var table = $("#table");


            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'updated_at',
                sortOrder:'desc',
                showToggle: false,//表格形式
                showColumns: false,//字段显示与隐藏
                search:true, //搜素框
                showExport: false,//导出
                /*onLoadSuccess:function(data){
                    table.bootstrapTable('hideCloumn',data.state==0 ?'untype':'brand_username');
                    /!*table.bootstrapTable('collapseAllRows');*!/
                },*/
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id'),sortable:true},
                        {field: 'brandname', title: __('Brandname'), operate: 'LIKE'},
                        {field: 'brand_username', title: __('Brand_username'), operate: 'LIKE'},
                        {field: 'state', title: __('State'), searchList: {"-1":__('State -1'),"0":__('State 0'),"1":__('State 1'),"-9":__('State -9')},
                            formatter: Table.api.formatter.label,
                            custom:{"-1":"info", "0":"danger","1":"success","-9":"danger"},
                        },
                        {field: 'untype', title: __('Untype'),
                            searchList: {"cf":__('Untype cf'),"bcz":__('Untype bcz'),"wzl":__('Untype wzl'),"jzc":__('Untype jzc'),"dyc":__('地域词')},
                            formatter: Table.api.formatter.label,
                            custom:{"cf":"info", "bcz":"danger","wzl":"success","jzc":"danger"},
                        },
                        {field: 'updated_at', title: __('Updatetime'),sortable:true,
                            formatter: function (value, row, index) {
                                if(value=="1970-01-01 08:00:00"){

                                    return '';
                                }
                                else
                                {
                                    return value;
                                }
                            }
                        },
                        {
                            field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate,
                            formatter: function (value, row, index) {
                                var that = $.extend({}, this);
                                $(table).data("operate-edit",null);
                                $(table).data("operate-del",null);
                                //隐藏的按钮设置为 null
                                that.table = table;
                                return Table.api.formatter.operate.call(that, value, row, index);
                            },
                            buttons:[
                                {
                                    name: 'wancheng',
                                    title: __('完成'),
                                    text: '完成',
                                    classname: 'btn btn-xs btn-success btn-magic  btn-ajax',
                                    icon: 'fa fa-leaf',
                                    /*confirm: '确认要修改吗？',*/
                                    url: 'teshubranddo/wancheng',
                                    refresh:true,
                                    visible:function (row) {
                                        /*if(row['is_get']==1){*/
                                        if(row.state==-1){
                                            return  true;
                                        }
                                        else{
                                            return false;
                                        }

                                    }
                                },
                                {
                                    name: 'huifu',
                                    title: __('恢复'),
                                    text: '恢复',
                                    classname: 'btn btn-xs btn-info btn-magic  btn-ajax',
                                    icon: 'fa fa-leaf',
                                    confirm: '确认要恢复吗？',
                                    url: 'teshubranddo/huifu',
                                    refresh:true,
                                    visible:function (row) {
                                        /*if(row['is_get']==1){*/
                                        if(row.state==0){
                                            return  true;
                                        }
                                        else{
                                            return false;
                                        }

                                    }
                                },
                                {   name: 'feiqi',
                                    text: '废弃',
                                    title: '废弃',
                                    icon: 'fa fa-list',
                                    classname: 'btn btn-xs btn-primary btn-dialog',
                                    url: 'teshubranddo/feiqi',
                                    refresh:true,
                                    visible:function (row) {
                                        /*if(row['is_get']==1){*/
                                        if(row.state==-1){
                                            return  true;
                                        }
                                        else{
                                            return false;
                                        }
                                    }
                                },

                            ],

                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
            $('ul.nav-tabs li.active a[data-toggle="tab"]').trigger("shown.bs.tab");

        },

        feiqi:function(){
            Controller.api.bindevent();
            //或Form.api.bindevent($("form[role=form]"));
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
                url: 'teshubranddo/recyclebin' + location.search,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
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
                                    url: 'teshubranddo/restore',
                                    refresh: true
                                },
                                {
                                    name: 'Destroy',
                                    text: __('Destroy'),
                                    classname: 'btn btn-xs btn-danger btn-ajax btn-destroyit',
                                    icon: 'fa fa-times',
                                    url: 'teshubranddo/destroy',
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