<?php
/**
 * Created by PhpStorm.
 * User: Daniel
 * Date: 02.06.2018
 * Time: 15:19
 */

namespace DataLayer;


interface DataLayer
{
    public function getCategories();
    public function getAllProducts();
    public function getProductsForCategory($categoryId);
    public function getProductsForSearchCriteria($name);
    public function getProductForProductId($productId);
    public function getReviewsForProductId($productId);
    public function getAverageRatingForProduct($productId);
    public function getNrOfRatingsForProduct($productId);
    public function getUserForUserNameAndPassword($userName, $password);
    public function getUser($userId);
    public function getUserByName($userName);
    public function getRatingsByUser($userName);
    public function getProductsByUser($userName);
    public function getRatingForUserByProduct($userName, $product);
    public function getRatingForTable($userName);
    public function deleteRatingByProductIdAndUserName($PID, $UserName);

    public function setNewAccount($userName, $passwordHash);
    public function setNewRating($rating);
    public function setNewProduct($product);

    public function updateRating($rating);
    public function updateProduct($product);
}