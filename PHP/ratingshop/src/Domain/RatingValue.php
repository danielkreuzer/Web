<?php
/**
 * Created by PhpStorm.
 * User: Daniel
 * Date: 04.06.2018
 * Time: 10:15
 */

namespace Domain;


class RatingValue
{
    private $value;

    /**
     * RatingValue constructor.
     * @param $value
     */
    public function __construct($value)
    {
        $this->value = $value;
    }

    /**
     * @return mixed
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * @param mixed $value
     */
    public function setValue($value)
    {
        $this->value = $value;
    }

}