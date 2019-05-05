<?php
/**
 * Created by PhpStorm.
 * User: Daniel
 * Date: 04.06.2018
 * Time: 20:04
 */

namespace BusinessLogic;


final class Utils
{
    private $dataLayer;
    private $authenticationManager;


    public function __construct(\DataLayer\DataLayer $dataLayer, \BusinessLogic\AuthenticationManager $authenticationManager) {
        $this->dataLayer = $dataLayer;
        $this->authenticationManager = $authenticationManager;
    }

    public function checkIfAlreadyCommented($productId) {
        if(!is_null($this->authenticationManager->getAuthenticatedUser())) {
            if (sizeof($this->dataLayer->getRatingForUserByProduct(
                    $this->authenticationManager->getAuthenticatedUser()->getUserName(),
                    $productId)) > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    //Check if the user owns this product and is authenticated
    public function checkProductUpdate($PID) {
        return !is_null($this->authenticationManager->getAuthenticatedUser()) &&
            !is_null($this->dataLayer->getProductForProductId($PID)) &&
            sizeof($this->dataLayer->getProductForProductId($PID)) > 0 &&
            ($this->dataLayer->getProductForProductId($PID)[0]->getUserCreated()
            == $this->authenticationManager->getAuthenticatedUser()->getUserName());
    }

    //Check if the user owns this rating and is authenticated
    public function checkRatingUpdate($PID) {
        return !is_null($this->authenticationManager->getAuthenticatedUser()) &&
            !is_null($this->dataLayer->getRatingForUserByProduct($this->authenticationManager->getAuthenticatedUser()->getUserName(),
                $PID)) &&
            sizeof($this->dataLayer->getRatingForUserByProduct($this->authenticationManager->getAuthenticatedUser()->getUserName(),
                $PID)) > 0 &&
            ($this->dataLayer->getRatingForUserByProduct($this->authenticationManager->getAuthenticatedUser()->getUserName(),
                $PID)[0]->getUserCreated()
                == $this->authenticationManager->getAuthenticatedUser()->getUserName());
    }
}