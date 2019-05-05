<?php
    namespace Controllers;

    class User extends \Framework\Controller {
    
        private $authenticationManager;

        const PARAM_USER_NAME = 'un';
        const PARAM_PASSWORD = 'pwd';
        const PARAM_PASSWORD_CONFIRM = 'pwdcon';

        public function __construct(\BusinessLogic\AuthenticationManager $authenticationManager) {
            $this->authenticationManager = $authenticationManager;
        }
    
        public function GET_LogIn() {
            if ($this->authenticationManager->isAuthenticated()) {
                return $this->redirect('Index', 'Home');
            }
            return $this->renderView('login', array(
                'user' => $this->authenticationManager->getAuthenticatedUser(),
                'userName' => $this->getParam(self::PARAM_USER_NAME)
            ));
        }

        public function POST_LogIn() {
            if (!$this->authenticationManager->authenticate(
                $this->getParam(self::PARAM_USER_NAME), 
                $this->getParam(self::PARAM_PASSWORD)
                )) {
                return $this->renderView('login', array(
                    'user' => $this->authenticationManager->getAuthenticatedUser(),
                    'userName' => $this->getParam(self::PARAM_USER_NAME),
                    'errors' => array('Invalid user name or password.')
                ));
            }
            return $this->redirect('Index', 'Home');
        }

        public function GET_Register() {
            return $this->renderView('register', array(
                'user' => $this->authenticationManager->getAuthenticatedUser()
            ));
        }

        public function POST_Register() {
            if(!$this->authenticationManager->checkIfUserExists(
                $this->getParam(self::PARAM_USER_NAME)
            )) {
                if($this->getParam(self::PARAM_PASSWORD) != $this->getParam(self::PARAM_PASSWORD_CONFIRM)) {
                    $errorMsg = "User " . $this->getParam(self::PARAM_USER_NAME) . " please enter similar passwords!";
                    return $this->renderView('register', array(
                        'user' => $this->authenticationManager->getAuthenticatedUser(),
                        'errors' => array($errorMsg)
                    ));
                } else {
                    $passwordHash = password_hash($this->getParam(self::PARAM_PASSWORD), PASSWORD_DEFAULT);
                    $this->authenticationManager->addUser($this->getParam(self::PARAM_USER_NAME),
                        $passwordHash);
                    if(!$this->authenticationManager->authenticate($this->getParam(self::PARAM_USER_NAME),
                        $this->getParam(self::PARAM_PASSWORD))) {
                        $errorMsg = "Sorry user " . $this->getParam(self::PARAM_USER_NAME) . ", an error occurred!";
                        return $this->renderView('register', array(
                            'user' => $this->authenticationManager->getAuthenticatedUser(),
                            'errors' => array($errorMsg)
                        ));
                    }
                }
            } else {
                $errorMsg = "User " . $this->getParam(self::PARAM_USER_NAME) . " already exists!";
                return $this->renderView('register', array(
                    'user' => $this->authenticationManager->getAuthenticatedUser(),
                    'errors' => array($errorMsg)
                ));
            }

            return $this->redirect('Index', 'Home');
        }

        public function POST_LogOut() {
            $this->authenticationManager->signOut();
            return $this->redirect('Index', 'Home');
        }

        public function GET_Index() {
            return $this->renderView('home', array(
                'user' => $this->authenticationManager->getAuthenticatedUser(),
            ));
        }
    }
