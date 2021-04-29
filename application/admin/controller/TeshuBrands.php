<?php

namespace app\admin\controller;

use app\common\controller\Backend;

/**
 * 
 *
 * @icon fa fa-circle-o
 */
class TeshuBrands extends Backend
{
    
    /**
     * TeshuBrands模型对象
     * @var \app\admin\model\TeshuBrands
     */
    protected $model = null;
    protected $searchFields = ['brandname', 'id'];

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\TeshuBrands;
        $this->view->assign("stateList", $this->model->getStateList());
        $this->view->assign("untypeList", $this->model->getUntypeList());
        $this->view->assign("isGetList", $this->model->getIsGetList());
    }


    /**
     * 查看
     */
    public function index()
    {
        //设置过滤方法
        $this->request->filter(['strip_tags', 'trim']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            /*$where = (array)$where;
            $where["is_get"]=0;*/
            $list = $this->model
                ->where($where)
                ->where('is_get','<>','-9')
                ->order($sort, $order)
                ->paginate($limit);

            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }

    public function import()
    {
        parent::import();
    }
    /**
     *行数据修改,不弹窗！
     */
    public function getbrands ($ids)
    {
        $row = $this->model->get(['id' => $ids]);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        if ($this->request->isAjax()) {
            $row->is_get=1;
            $row->save();
            /*$data = [
                'is_get' =>'1',
            ];
            $this->model->where('id', $ids)->update($data);*/
            //$this->success('修改成功！',null, ['id' => $ids]);
            //$this->assign('', "javascript:window.location.reload();");

        }
        $rts=array(
            'code'=>1,
            'url'=>'.',
            'msg'=>'成功修改',
            'data'=>$row,
            'wait'=>3,
        );
        return json($rts);
    }
    /**
     * 详情
     */
    public function detail($ids)
    {
        $row = $this->model->get(['id' => $ids]);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        if ($this->request->isAjax()) {
            $this->success("Ajax请求成功", null, ['id' => $ids]);
        }
        $this->view->assign("row", $row->toArray());
        return $this->view->fetch();
    }
    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */
    

}
