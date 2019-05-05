<?php
    namespace Domain;

    class User {

        private $userName;
        private $id;

        /**
         * User constructor.
         * @param $userName
         * @param $id
         */
        public function __construct($userName, $id)
        {
            $this->userName = $userName;
            $this->id = $id;
        }

        /**
         * @return mixed
         */
        public function getUserName()
        {
            return $this->userName;
        }

        /**
         * @param mixed $userName
         */
        public function setUserName($userName)
        {
            $this->userName = $userName;
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


    }