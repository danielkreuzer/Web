<?php
/**
 * Created by PhpStorm.
 * User: danie
 * Date: 05.06.2018
 * Time: 16:03
 */

namespace Domain;


class ProductRatingTable
{
    private $id;
    private $productId;
    private $userCreated;
    private $userRating;
    private $creationDate;
    private $productName;
    private $prodcutManufactorer;

    /**
     * ProductRatingTable constructor.
     * @param $id
     * @param $productId
     * @param $userCreated
     * @param $userRating
     * @param $creationDate
     * @param $productName
     * @param $prodcutManufactorer
     */
    public function __construct($id, $productId, $userCreated, $userRating, $creationDate, $productName, $prodcutManufactorer)
    {
        $this->id = $id;
        $this->productId = $productId;
        $this->userCreated = $userCreated;
        $this->userRating = $userRating;
        $this->creationDate = $creationDate;
        $this->productName = $productName;
        $this->prodcutManufactorer = $prodcutManufactorer;
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
    public function getProductName()
    {
        return $this->productName;
    }

    /**
     * @param mixed $productName
     */
    public function setProductName($productName)
    {
        $this->productName = $productName;
    }

    /**
     * @return mixed
     */
    public function getProdcutManufactorer()
    {
        return $this->prodcutManufactorer;
    }

    /**
     * @param mixed $prodcutManufactorer
     */
    public function setProdcutManufactorer($prodcutManufactorer)
    {
        $this->prodcutManufactorer = $prodcutManufactorer;
    }

}