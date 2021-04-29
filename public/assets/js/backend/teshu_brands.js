define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'teshu_brands/index' + location.search,
                    add_url: 'teshu_brands/add',
                    edit_url: 'teshu_brands/edit',
                    /*del_url: 'teshu_brands/del',*/
                    multi_url: 'teshu_brands/multi',
                    import_url: 'teshu_brands/import',
                    table: 'teshu_brands',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                sortOrder:'asc,desc',
                showToggle: false,//表格形式
                showColumns: false,//字段显示与隐藏
                search:true, //搜素框
                showExport: false,//导出
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id'),sortable:true},
                        {field: 'brandname', title: __('Brandname'), operate: 'LIKE'},
                        {field: 'updated_at', title: __('Updatetime'),
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
                        {field: 'is_get', title: __('Is_get'), searchList: {"0":__('Is_get 0'),"1":__('Is_get 1'),"-9":__('Is_get -9')}, formatter: Table.api.formatter.normal},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate,

                            formatter: function (value, row, index) {
                                var that = $.extend({}, this);
                                $(table).data({"operate-edit": null});
                                $(table).data({"operate-del:": null});
                                //隐藏的按钮设置为 null
                                that.table = table;
                                return Table.api.formatter.operate.call(that, value, row, index);
                            },
                            buttons: [
                                {
                                    name: 'getbrands',
                                    title: __('领取品牌'),
                                    text: '领取',
                                    classname: 'btn btn-xs btn-success btn-magic btn-ajax',
                                    icon: 'fa fa-leaf',
                                   /* confirm: '确认要修改吗？',*/
                                    url: 'teshu_brands/getbrands',
                                    refresh:true,
                                    visible:function (row) {
                                        /*if(row['is_get']==1){*/
                                            if(row.is_get==1){
                                            return  false;
                                        }
                                        else{
                                            return true;
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
                url: 'teshu_brands/recyclebin' + location.search,
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
                                    url: 'teshu_brands/restore',
                                    refresh: true
                                },
                                {
                                    name: 'Destroy',
                                    text: __('Destroy'),
                                    classname: 'btn btn-xs btn-danger btn-ajax btn-destroyit',
                                    icon: 'fa fa-times',
                                    url: 'teshu_brands/destroy',
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