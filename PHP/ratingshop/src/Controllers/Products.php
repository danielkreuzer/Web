<?php
/**
 * Created by PhpStorm.
 * User: Daniel
 * Date: 02.06.2018
 * Time: 15:12
 */

namespace Controllers;


class Products extends \Framework\Controller
{
    const PARAM_CATEGORY_ID = 'cid';
    const PARAM_NAME = 'name';

    private $dataLayer;
    private $authenticationManager;

    /**
     * Products constructor.
     * @param $dataLayer
     */
    public function __construct(\DataLayer\DataLayer $dataLayer, \BusinessLogic\AuthenticationManager $authenticationManager)
    {
        $this->authenticationManager = $authenticationManager;
        $this->dataLayer = $dataLayer;
    }

    public function GET_Index() {
        if($this->hasParam(self::PARAM_CATEGORY_ID) && $this->getParam(self::PARAM_CATEGORY_ID) == -1) {
            return $this->renderView('productList', array(
                'categories' => $this->dataLayer->getCategories(),
                'selectedCategoryId' => $this->getParam(self::PARAM_CATEGORY_ID),
                'products' => $this->hasParam(self::PARAM_CATEGORY_ID) ?
                    $this->dataLayer->getAllProducts() :
                    null,
                'context' => $this->buildActionLink('Index', 'Products', array(
                    self::PARAM_CATEGORY_ID => $this->getParam(self::PARAM_CATEGORY_ID)
                )),
                'user' => $this->authenticationManager->getAuthenticatedUser()
            ));
        } else {
            return $this->renderView('productList', array(
                'categories' => $this->dataLayer->getCategories(),
                'selectedCategoryId' => $this->getParam(self::PARAM_CATEGORY_ID),
                'products' => $this->hasParam(self::PARAM_CATEGORY_ID) ?
                    $this->dataLayer->getProductsForCategory($this->getParam(self::PARAM_CATEGORY_ID)) :
                    null,
                'context' => $this->buildActionLink('Index', 'Products', array(
                    self::PARAM_CATEGORY_ID => $this->getParam(self::PARAM_CATEGORY_ID)
                )),
                'user' => $this->authenticationManager->getAuthenticatedUser()
            ));
        }
    }

    public function GET_Search() {
        return $this->renderView('productSearch', array(
            'name' => $this->getParam(self::PARAM_NAME),
            'products' => $this->hasParam(self::PARAM_NAME) ?
                $this->dataLayer->getProductsForSearchCriteria($this->getParam(self::PARAM_NAME)) :
                null,
            'context' => $this->buildActionLink('Search', 'Products', array(
                self::PARAM_NAME => $this->getParam(self::PARAM_NAME)
            )),
            'user' => $this->authenticationManager->getAuthenticatedUser()
        ));
    }


}