<?php
/**
 * Created by PhpStorm.
 * User: Daniel
 * Date: 02.06.2018
 * Time: 19:13
 */

namespace Controllers;


use Framework\Controller;

class Details extends Controller
{
    const PARAM_PRODUCT_ID = 'pid';

    private $dataLayer;
    private $authenticationManager;
    private $utils;

    /**
     * Details constructor.
     * @param $dataLayer
     */
    public function __construct(\DataLayer\DataLayer $dataLayer,
                                \BusinessLogic\AuthenticationManager $authenticationManager,
                                \BusinessLogic\Utils $utils)
    {
        $this->dataLayer = $dataLayer;
        $this->authenticationManager = $authenticationManager;
        $this->utils = $utils;
    }


    public function GET_Index() {
        return $this->renderView('productDetails', array(
            'user' => $this->authenticationManager->getAuthenticatedUser(),
            'product' => $this->hasParam(self::PARAM_PRODUCT_ID) ?
                $this->dataLayer->getProductForProductId($this->getParam(self::PARAM_PRODUCT_ID)) :
                null,
            'reviews' => $this->hasParam(self::PARAM_PRODUCT_ID) ?
                $this->dataLayer->getReviewsForProductId($this->getParam(self::PARAM_PRODUCT_ID)) :
                null,
            'rating' => $this->hasParam(self::PARAM_PRODUCT_ID) ?
                $this->dataLayer->getAverageRatingForProduct($this->getParam(self::PARAM_PRODUCT_ID)) :
                null,
            'nrOfRatings' => $this->hasParam(self::PARAM_PRODUCT_ID) ?
                $this->dataLayer->getNrOfRatingsForProduct($this->getParam(self::PARAM_PRODUCT_ID)) :
                null,
            'alreadyCommented' => $this->hasParam(self::PARAM_PRODUCT_ID) ?
                $this->utils->checkIfAlreadyCommented($this->getParam(self::PARAM_PRODUCT_ID)) :
                null
        ));
    }
}