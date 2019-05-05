<?php
/**
 * Created by PhpStorm.
 * User: Daniel
 * Date: 04.06.2018
 * Time: 19:05
 */

namespace Controllers;


class Profile extends \Framework\Controller
{
    const PARAM_USER_COMMENT = "uc";
    const PARAM_USER_RATING = "ur";
    const PARAM_PRODUCT_ID = "pd";

    const PARAM_CATEGORY_ID = "cid";

    const PARAM_PRODUCT_NAME = "pn";
    const PARAM_PRODUCT_MANUFACTURER = "pm";
    const PARAM_PRODUCT_USER_TEXT = "ut";
    const PARAM_PRUDCT_CATEGROIE = "cat";

    const PARAM_PRODUCT_ID_2 = "pid";

    private $dataLayer;
    private $authenticationManager;
    private $utils;
    private $profile;

    /**
     * Profile constructor.
     * @param $dataLayer
     * @param $authenticationManager
     * @param $utils
     * @param $profile
     */
    public function __construct(\DataLayer\DataLayer $dataLayer,
                                \BusinessLogic\AuthenticationManager $authenticationManager,
                                \BusinessLogic\Utils $utils,
                                \BusinessLogic\Profile $profile)
    {
        $this->dataLayer = $dataLayer;
        $this->authenticationManager = $authenticationManager;
        $this->utils = $utils;
        $this->profile = $profile;
    }


    public function GET_Ratings() {
        if(!is_null($this->authenticationManager->getAuthenticatedUser())) {
            return $this->renderView('myRatingList', array(
                'user' => $this->authenticationManager->getAuthenticatedUser(),
                'ratings' => !is_null($this->authenticationManager->getAuthenticatedUser()) ?
                    $this->dataLayer->getRatingForTable($this->authenticationManager->getAuthenticatedUser()->getUserName()) :
                    null
            ));
        } else {
            return $this->renderView('home', array(
                'user' => $this->authenticationManager->getAuthenticatedUser()
            ));
        }
    }

    public function GET_Products() {
        if(!is_null($this->authenticationManager->getAuthenticatedUser())) {
            return $this->renderView('myProductList', array(
                'user' => $this->authenticationManager->getAuthenticatedUser(),
                'products' => !is_null($this->authenticationManager->getAuthenticatedUser()) ?
                    $this->dataLayer->getProductsByUser($this->authenticationManager->getAuthenticatedUser()->getUserName()) :
                    null
            ));
        } else {
            return $this->renderView('home', array(
                'user' => $this->authenticationManager->getAuthenticatedUser()
            ));
        }
    }

    public function GET_ProductEdit() {
        if($this->utils->checkProductUpdate($this->getParam(self::PARAM_PRODUCT_ID_2))) {
            return $this->renderView('EditProduct', array(
                'user' => $this->authenticationManager->getAuthenticatedUser(),
                'Product' => $this->hasParam(self::PARAM_PRODUCT_ID_2) ?
                    $this->dataLayer->getProductForProductId($this->getParam(self::PARAM_PRODUCT_ID_2)) :
                    null,
                'categories' => $this->dataLayer->getCategories()
            ));
        } else {
            return $this->renderView('home', array(
                'user' => $this->authenticationManager->getAuthenticatedUser()
            ));
        }
    }

    public function POST_UpdateProduct() {
        if($this->utils->checkProductUpdate($this->getParam(self::PARAM_PRODUCT_ID_2))) {
            $product = new \Domain\Product($this->getParam(self::PARAM_PRODUCT_ID_2),
                $this->getParam(self::PARAM_PRUDCT_CATEGROIE),
                $this->getParam(self::PARAM_PRODUCT_NAME),
                $this->getParam(self::PARAM_PRODUCT_MANUFACTURER),
                $this->getParam(self::PARAM_PRODUCT_USER_TEXT),
                $this->authenticationManager->getAuthenticatedUser()->getUserName(),
                null,
                null,
                null);
            $this->profile->updateProduct($product);
            return $this->redirect('Products', 'Profile');
        } else {
            return $this->renderView('home', array(
                'user' => $this->authenticationManager->getAuthenticatedUser()
            ));
        }
    }

    public function GET_ReviewEdit() {
        if($this->utils->checkRatingUpdate($this->getParam(self::PARAM_PRODUCT_ID_2))) {
            return $this->renderView('EditRating', array(
                'user' => $this->authenticationManager->getAuthenticatedUser(),
                'Product' => $this->hasParam(self::PARAM_PRODUCT_ID_2) ?
                    $this->dataLayer->getProductForProductId($this->getParam(self::PARAM_PRODUCT_ID_2)) :
                    null,
                'Rating' => $this->hasParam(self::PARAM_PRODUCT_ID_2) ?
                    $this->dataLayer->getRatingForUserByProduct($this->authenticationManager->getAuthenticatedUser()->getUserName(),
                        $this->getParam(self::PARAM_PRODUCT_ID_2)) :
                    null
            ));
        } else {
            return $this->renderView('home', array(
                'user' => $this->authenticationManager->getAuthenticatedUser()
            ));
        }
    }

    public function POST_UpdateRating() {
        if($this->utils->checkRatingUpdate($this->getParam(self::PARAM_PRODUCT_ID_2))) {
            $rating = new \Domain\Rating(null,
                $this->getParam(self::PARAM_PRODUCT_ID_2),
                $this->authenticationManager->getAuthenticatedUser()->getUserName(),
                null,
                $this->getParam(self::PARAM_USER_COMMENT),
                $this->getParam(self::PARAM_USER_RATING)
            );
            $this->profile->updateReview($rating);
            return $this->redirect('Ratings', 'Profile');
        } else {
            return $this->renderView('home', array(
                'user' => $this->authenticationManager->getAuthenticatedUser()
            ));
        }
    }

    public function GET_New() {
        if(!is_null($this->authenticationManager->getAuthenticatedUser())) {
            return $this->renderView('newProduct', array(
                'user' => $this->authenticationManager->getAuthenticatedUser(),
                'categories' => $this->dataLayer->getCategories()
            ));
        } else {
            return $this->renderView('home', array(
                'user' => $this->authenticationManager->getAuthenticatedUser()
            ));
        }
    }

    public function POST_Product() {
        if(!is_null($this->authenticationManager->getAuthenticatedUser())) {
            $product = new \Domain\Product(null,
                $this->getParam(self::PARAM_PRUDCT_CATEGROIE),
                $this->getParam(self::PARAM_PRODUCT_NAME),
                $this->getParam(self::PARAM_PRODUCT_MANUFACTURER),
                $this->getParam(self::PARAM_PRODUCT_USER_TEXT),
                $this->authenticationManager->getAuthenticatedUser()->getUserName(),
                null,
                null,
                null);
            $this->profile->addProduct($product);
            return $this->redirect('Products', 'Profile');
        } else {
            return $this->renderView('home', array(
                'user' => $this->authenticationManager->getAuthenticatedUser()
            ));
        }
    }

    public function POST_Comment() {
        if(!$this->utils->checkIfAlreadyCommented($this->getParam(self::PARAM_PRODUCT_ID))) {
            $rating = new \Domain\Rating(null,
                $this->getParam(self::PARAM_PRODUCT_ID),
                $this->authenticationManager->getAuthenticatedUser()->getUserName(),
                null,
                $this->getParam(self::PARAM_USER_COMMENT),
                $this->getParam(self::PARAM_USER_RATING)
            );
            $this->profile->addReview($rating);
            return $this->redirect('Index', 'Details', array("pid" => $this->getParam(self::PARAM_PRODUCT_ID)));
        } else {
            return $this->renderView('home', array(
                'user' => $this->authenticationManager->getAuthenticatedUser()
            ));
        }
    }

    public function POST_DeleteRating() {
        if($this->utils->checkRatingUpdate($this->getParam(self::PARAM_PRODUCT_ID_2))) {
            $this->profile->deleteReview($this->getParam(self::PARAM_PRODUCT_ID_2), $this->authenticationManager->getAuthenticatedUser()->getUserName());
            return $this->redirect('Ratings', 'Profile');
        } else {
            return $this->renderView('home', array(
                'user' => $this->authenticationManager->getAuthenticatedUser()
            ));
        }
    }

    public function GET_Index() {
        return $this->renderView('home', array(
            'user' => $this->authenticationManager->getAuthenticatedUser(),
        ));
    }
}