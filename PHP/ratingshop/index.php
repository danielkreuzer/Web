<?php
/**
 * Created by PhpStorm.
 * User: Daniel
 * Date: 02.06.2018
 * Time: 13:11
 */
    // index.php acts as router

    spl_autoload_register(function ($class) {
        $file = __DIR__ . '/src/' . str_replace('\\', '/', $class) . '.php';
        if (file_exists($file)) {
            require_once($file);
        }
    });

    \Framework\Injector::register(\DataLayer\DataLayer::class, false, \DataLayer\DBDataLayer::class, array(
        'server' => 'localhost',
        'userName' => 'root',
        'password' => '',
        'database' => 'ratingshop'
    ));
    \Framework\Injector::register(\BusinessLogic\Session::class, true);
    \Framework\MVC::handleRequest();