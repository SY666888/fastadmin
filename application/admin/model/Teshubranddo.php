<?php

namespace app\admin\model;

use think\Model;
use traits\model\SoftDelete;

class Teshubranddo extends Model
{

    use SoftDelete;



    protected $connection = 'db_config1';

    // 表名
    protected $name = 'teshu_brands01';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'timestamp';

    // 定义时间戳字段名
    protected $createTime = 'created_at';
    protected $updateTime = 'updated_at';
    protected $deleteTime = 'deleted_at';

    // 追加属性
    protected $append = [
        'state_text',
        'untype_text',
        'is_get_text'
    ];


    public function getStateList()
    {
        return ['-1' => __('State -1'), '0' => __('State 0'), '1' => __('State 1'), '-9' => __('State -9')];
    }

    public function getUntypeList()
    {
        return ['cf' => __('Untype cf'), 'bcz' => __('Untype bcz'), 'wzl' => __('Untype wzl'), 'jzc' => __('Untype jzc')];
    }

    public function getIsGetList()
    {
        return ['0' => __('Is_get 0'), '1' => __('Is_get 1'), '-9' => __('Is_get -9')];
    }


    public function getStateTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['state']) ? $data['state'] : '');
        $list = $this->getStateList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getUntypeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['untype']) ? $data['untype'] : '');
        $list = $this->getUntypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getIsGetTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['is_get']) ? $data['is_get'] : '');
        $list = $this->getIsGetList();
        return isset($list[$value]) ? $list[$value] : '';
    }




}
