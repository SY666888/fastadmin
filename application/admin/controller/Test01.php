<?php

namespace app\admin\controller;

use app\common\controller\Backend;

/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Test01 extends Backend
{
    
    /**
     * Test01模型对象
     * @var \app\admin\model\Test01
     */
    protected $model = null;
    protected $relationSearch = true;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\Test01;
        $this->view->assign("flagdataList", $this->model->getFlagdataList());
        $this->view->assign("statusList", $this->model->getStatusList());
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
                ->with('category,admin')
                ->where($where)
                ->order($sort, $order)
                ->paginate($limit);

            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
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
     *行数据修改，弹窗
     */
    public function xiugai ($ids)
    {
        $row = $this->model->get(['id' => $ids]);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        if ($this->request->isAjax()) {
            $params = $this->request->post("row/a");
            if($params){
                $data = [
                    'category_id' =>$params['category_id'],
                    'status'=>$params['status'],
                ];
                $row->where('id', $ids)->update($data);
                $this->success('修改成功！');

            }
        }
       $this->view->assign("row", $row->toArray());
        return $this->view->fetch();

    }

    /**
     *行数据修改,不弹窗！
     */
    public function xiugai02 ($ids)
    {
        $row = $this->model->get(['id' => $ids]);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        if ($this->request->isAjax()) {
                $data = [
                    'category_id' =>'1',
                    'status'=>'0',
                ];
                $this->model->where('id', $ids)->update($data);
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

    public  function  lanmu($ids)
    {
        //$arr=explode(',',$ids);//接受参数转变成数组
        foreach ($ids as  $k=>$v)
        {
            $res=$this->model->where('id', $ids[$k])->value('category_id');
            if($res)
            {
                $data=['category_id' =>'3'];
                $this->model->where('id', $ids[$k])->update($data);
            }
        }

        $this->success('修改成功！');
    }

    public function checkids($ids) {
       /* $lists=$this->request->param('ids');*/
        /*$datas = explode ( ',',$ids);//转数组*/
        foreach ($ids as  $k=>$v){
            $res=$this->model->where('id',$ids[$k]);
            if($res)
            {
                $data=['category_id' =>'6'];
                $res->update($data);
            }

        }
        $this->success();
    }

    /**
     *工具栏批量数据修改，弹窗
     */
    public function checkids01 ($ids)
    {
        //$lists=$this->request->param('ids');
        $ids = explode ( ',',$ids);//转数组*/
        /*$row = $this->model->get(['id' => $ids[0]]);*/
        if ($this->request->isPost())
        {
            $params = $this->request->post("row/a");
            if($params){
            foreach ($ids as  $k=>$v)
            {
                $res=$this->model->where('id',$ids[$k]);
                if($res)
                {
                        $datas = [
                            'category_id' =>$params['category_id'],
                            'status'=>$params['status'],
                        ];
                        $res->update($datas);
                }
            }
            $this->success('修改成功！',null,$ids);
        }
        }
        return $this->view->fetch();
    }




    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */
    

}
