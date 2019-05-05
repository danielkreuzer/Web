<?php
/**
 * Created by PhpStorm.
 * User: Daniel
 * Date: 02.06.2018
 * Time: 15:29
 */

namespace Domain;


class Rating
{
    private $id;
    private $productId;
    private $userCreated;
    private $creationDate;
    private $userComment;
    private $userRating;

    /**
     * Rating constructor.
     * @param $id
     * @param $productId
     * @param $userCreated
     * @param $creationDate
     * @param $userComment
     * @param $userRating
     */
    public function __construct($id, $productId, $userCreated, $creationDate, $userComment, $userRating)
    {
        $this->id = $id;
        $this->productId = $productId;
        $this->userCreated = $userCreated;
        $this->creationDate = $creationDate;
        $this->userComment = $userComment;
        $this->userRating = $userRating;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getProductId()
    {
        return $this->productId;
    }

    /**
     * @param mixed $productId
     */
    public function setProductId($productId)
    {
        $this->productId = $productId;
    }

    /**
     * @return mixed
     */
    public function getUserCreated()
    {
        return $this->userCreated;
    }

    /**
     * @param mixed $userCreated
     */
    public function setUserCreated($userCreated)
    {
        $this->userCreated = $userCreated;
    }

    /**
     * @return mixed
     */
    public function getCreationDate()
    {
        return $this->creationDate;
    }

    /**
     * @param mixed $creationDate
     */
    public function setCreationDate($creationDate)
    {
        $this->creationDate = $creationDate;
    }

    /**
     * @return mixed
     */
    public function getUserComment()
    {
        return $this->userComment;
    }

    /**
     * @param mixed $userComment
     */
    public function setUserComment($userComment)
    {
        $this->userComment = $userComment;
    }

    /**
     * @return mixed
     */
    public function getUserRating()
    {
        return $this->userRating;
    }

    /**
     * @param mixed $userRating
     */
    public function setUserRating($userRating)
    {
        $this->userRating = $userRating;
    }


}