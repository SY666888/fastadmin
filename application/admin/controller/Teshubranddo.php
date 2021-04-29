<?php

namespace app\admin\controller;
use app\common\controller\Backend;

/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Teshubranddo extends Backend
{
    
    /**
     * Teshubranddo模型对象
     * @var \app\admin\model\Teshubranddo
     */
    protected $model = null;
    protected $searchFields = ['brandname', 'id'];
    protected $dataLimit = 'personal';
    protected $dataLimitField = 'brand_userid';


    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\Teshubranddo;
        $this->view->assign("stateList", $this->model->getStateList());
        $this->view->assign("untypeList", $this->model->getUntypeList());
        $this->view->assign("isGetList", $this->model->getIsGetList());
    }

    public function import()
    {
        parent::import();
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


            $list = $this->model
                ->where($where)
                ->order($sort, $order)
                ->paginate($limit);
           /* $result = array("total" => $total, "rows" => $list, "extend" => ['money' => 1024, 'price' => 888]);*/
            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }

    /**
     *完成！
     */
    public function wancheng ($ids)
    {
        $row = $this->model->get(['id' => $ids]);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        if ($this->request->isAjax()) {

            $row->state=1;
            $row->save();

            /*$data = [
                'state' =>'1',
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
     *恢复
     */
    public function huifu ($ids)
    {
        $row = $this->model->get(['id' => $ids]);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        if ($this->request->isAjax()) {
             $row->state=-1;
            $row->untype =null;
             $row->save();
            //$this->success('修改成功！',null, ['id' => $ids]);
            //$this->assign('', "javascript:window.location.reload();");

        }
        $rts=array(
            'code'=>1,
            'url'=>'.',
            'msg'=>'恢复成功！',
            'data'=>$row,
            'wait'=>3,
        );
        return json($rts);
    }

    /**
     *废弃
     */
    public function feiqi ($ids)
    {
        $row = $this->model->get(['id' => $ids]);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        if ($this->request->isAjax()) {
            $params = $this->request->post("row/a");
            if($params){
                $row->untype = $params['untype'];
                $row->state=0;
                $row->save();
              $this->success('执行成功！');
            }
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
