<?php
/**
 * Created by PhpStorm.
 * User: Daniel
 * Date: 09.06.2018
 * Time: 15:15
 */

namespace BusinessLogic;


final class Profile {
    private $dataLayer;
    private $utils;
    private $authenticationManager;

    /**
     * Profile constructor.
     * @param $dataLayer
     * @param $utils
     * @param $authenticationManager
     */
    public function __construct(\DataLayer\DataLayer $dataLayer,
                                \BusinessLogic\Utils $utils,
                                \BusinessLogic\AuthenticationManager $authenticationManager)
    {
        $this->dataLayer = $dataLayer;
        $this->utils = $utils;
        $this->authenticationManager = $authenticationManager;
    }

    public function addProduct($product) {
        $this->dataLayer->setNewProduct($product);
    }

    public function updateProduct($product) {
        $this->dataLayer->updateProduct($product);
    }

    public function addReview($review) {
        $this->dataLayer->setNewRating($review);
    }

    public function updateReview($review) {
        $this->dataLayer->updateRating($review);
    }

    public function deleteReview($PID, $UserName) {
        $this->dataLayer->deleteRatingByProductIdAndUserName($PID, $UserName);
    }
}