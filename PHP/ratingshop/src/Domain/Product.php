<?php
/**
 * Created by PhpStorm.
 * User: Daniel
 * Date: 02.06.2018
 * Time: 15:27
 */

namespace Domain;


class Product
{
    private $id;
    private $categoryId;
    private $name;
    private $manufacturer;
    private $userComment;
    private $userCreated;
    private $creationDate;
    private $avgRating;
    private $nrOfRatings;

    /**
     * Product constructor.
     * @param $id
     * @param $categoryId
     * @param $name
     * @param $manufacturer
     * @param $userComment
     * @param $userCreated
     * @param $creationDate
     * @param $avgRating
     * @param $nrOfRatings
     */
    public function __construct($id, $categoryId, $name, $manufacturer, $userComment, $userCreated, $creationDate, $avgRating, $nrOfRatings)
    {
        $this->id = $id;
        $this->categoryId = $categoryId;
        $this->name = $name;
        $this->manufacturer = $manufacturer;
        $this->userComment = $userComment;
        $this->userCreated = $userCreated;
        $this->creationDate = $creationDate;
        $this->avgRating = $avgRating;
        $this->nrOfRatings = $nrOfRatings;
    }

    /**
     * @return mixed
     */
    public function getAvgRating()
    {
        return $this->avgRating;
    }

    /**
     * @param mixed $avgRating
     */
    public function setAvgRating($avgRating)
    {
        $this->avgRating = $avgRating;
    }

    /**
     * @return mixed
     */
    public function getNrOfRatings()
    {
        return $this->nrOfRatings;
    }

    /**
     * @param mixed $nrOfRatings
     */
    public function setNrOfRatings($nrOfRatings)
    {
        $this->nrOfRatings = $nrOfRatings;
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
    public function getCategoryId()
    {
        return $this->categoryId;
    }

    /**
     * @param mixed $categoryId
     */
    public function setCategoryId($categoryId)
    {
        $this->categoryId = $categoryId;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getManufacturer()
    {
        return $this->manufacturer;
    }

    /**
     * @param mixed $manufacturer
     */
    public function setManufacturer($manufacturer)
    {
        $this->manufacturer = $manufacturer;
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


}