<?php

namespace app\admin\model;

use think\Model;
use traits\model\SoftDelete;

class Test01 extends Model
{

    use SoftDelete;

    

    // 表名
    protected $name = 'test01';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = 'deletetime';

    // 追加属性
    protected $append = [
        'flagdata_text',
        'addtime_text',
        'status_text'
    ];

    public function category()
    {
        return $this->belongsTo('\app\common\model\Category', 'category_id')->setEagerlyType(0);
    }
    public function admin()
    {
        return $this->belongsTo('Admin', 'admin_id')->setEagerlyType(0);
    }
    
    public function getFlagdataList()
    {
        return ['h' => __('Flagdata h'), 'p' => __('Flagdata p'), 't' => __('Flagdata t'), 'r' => __('Flagdata r')];
    }

    public function getStatusList()
    {
        return ['0' => __('Status 0'), '1' => __('Status 1')];
    }


    public function getFlagdataTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['flagdata']) ? $data['flagdata'] : '');
        $valueArr = explode(',', $value);
        $list = $this->getFlagdataList();
        return implode(',', array_intersect_key($list, array_flip($valueArr)));
    }


    public function getAddtimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['addtime']) ? $data['addtime'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['status']) ? $data['status'] : '');
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    protected function setFlagdataAttr($value)
    {
        return is_array($value) ? implode(',', $value) : $value;
    }

    protected function setAddtimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }


}
