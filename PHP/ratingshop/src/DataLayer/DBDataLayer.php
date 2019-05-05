<?php
/**
 * Created by PhpStorm.
 * User: Daniel
 * Date: 02.06.2018
 * Time: 15:21
 */

namespace DataLayer;


class DBDataLayer implements DataLayer
{
    private $server;
    private $userName;
    private $password;
    private $database;

    public function __construct($server, $userName, $password, $database) {
        $this->server = $server;
        $this->userName = $userName;
        $this->password = $password;
        $this->database = $database;
    }

    private function getConnection() {
        $conn = new \mysqli($this->server, $this->userName, $this->password, $this->database);
        if (!$conn) {
            die('Unable to connect to database: ' . mysqli_connect_error());
        }
        return $conn;
    }

    private function executeQuery($connection, $query) {
        $result = $connection->query($query);
        if (!$result) {
            die('Error in query `$query`: ' . $connection->error);
        }
        return $result;
    }

    private function executeStatement($connection, $query, $bindFunc) {
        $statement = $connection->prepare($query);
        if (!$statement) {
            die('Error in prepared statement `$query`: ' . $connection->error);
        }
        $bindFunc($statement);
        if (!$statement->execute()) {
            die('Error executing prepared statement `$query`: ' . $connection->error);
        }
        return $statement;
    }

    public function getCategories() {
        $categories = array();

        $conn = $this->getConnection();
        $res = $this->executeQuery($conn, 'SELECT id, name FROM category');
        while ($cat = $res->fetch_object()) {
            $categories[] = new \Domain\Category($cat->id, $cat->name);
        }
        $res->close();
        $conn->close();

        return $categories;
    }

    public function getAllProducts() {
        $products = array();

        $conn = $this->getConnection();
        $stat = $this->executeQuery(
            $conn,
            'SELECT id, categroyId, name, manufacturer, userComment, userCreated, creationDate 
                      FROM product'
        );
        while ($cat = $stat->fetch_object()) {
            $products[] = new \Domain\Product($cat->id, $cat->categroyId, $cat->name,
                $cat->manufacturer, $cat->userComment, $cat->userCreated, $cat->creationDate
            , $this->getAverageRatingForProduct($cat->id), $this->getNrOfRatingsForProduct($cat->id));
        }
        $stat->close();
        $conn->close();

        return $products;
    }

    public function getProductsForCategory($categoryId) {
        $products = array();

        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'SELECT id, categroyId, name, manufacturer, userComment, userCreated, creationDate 
                      FROM product WHERE categroyId = ?',
            function ($s) use ($categoryId) {
                $s->bind_param('i', $categoryId);
            }
        );

        $stat->bind_result($id, $categoryId, $name, $manufacturer, $userComment, $userCreated, $creationDate);
        while ($stat->fetch()) {
            $products[] = new \Domain\Product($id, $categoryId, $name,
                $manufacturer, $userComment, $userCreated, $creationDate
                , $this->getAverageRatingForProduct($id), $this->getNrOfRatingsForProduct($id));
        }
        $stat->close();
        $conn->close();

        return $products;
    }

    public function getProductsForSearchCriteria($name) {
        $name = "%$name%";
        $products = array();

        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'SELECT id, categroyId, name, manufacturer, userComment, userCreated, creationDate 
                      FROM product WHERE name LIKE ? OR manufacturer LIKE ?',
            function($s) use ($name) {
                $s->bind_param('ss', $name, $name);
            }
        );
        $stat->bind_result($id, $categoryId, $name, $manufacturer, $userComment, $userCreated, $creationDate);

        while ($stat->fetch()) {
            $products[] = new \Domain\Product($id, $categoryId, $name,
                $manufacturer, $userComment, $userCreated, $creationDate
                , $this->getAverageRatingForProduct($id), $this->getNrOfRatingsForProduct($id));
        }

        $stat->close();
        $conn->close();

        return $products;
    }

    public function getProductForProductId($productId) {
        $products = array();

        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'SELECT id, categroyId, name, manufacturer, userComment, userCreated, creationDate 
                      FROM product WHERE id = ?',
            function ($s) use ($productId) {
                $s->bind_param('i', $productId);
            }
        );

        $stat->bind_result($id, $categoryId, $name, $manufacturer, $userComment, $userCreated, $creationDate);
        while ($stat->fetch()) {
            $products[] = new \Domain\Product($id, $categoryId, $name, $manufacturer,
                $userComment, $userCreated, $creationDate
                , $this->getAverageRatingForProduct($id), $this->getNrOfRatingsForProduct($id));
        }
        $stat->close();
        $conn->close();

        return $products;
    }

    public function getReviewsForProductId($productId) {
        $ratings = array();

        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'SELECT id, productId, userCreated, creationDate, userComment, userRating
                      FROM rating
                      WHERE productId =  ?
                      ORDER BY creationDate DESC',
            function ($s) use ($productId) {
                $s->bind_param('i', $productId);
            }
        );

        $stat->bind_result($id, $productId, $userCreated, $creationDate, $userComment, $userRating);
        while ($stat->fetch()) {
            $ratings[] = new \Domain\Rating($id, $productId, $userCreated, $creationDate, $userComment, $userRating);
        }
        $stat->close();
        $conn->close();

        return $ratings;
    }

    public function getAverageRatingForProduct($productId) {
        $rating = array();

        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'SELECT ROUND(avg(userRating), 1) AS \'rat\'
                      FROM Rating
                      WHERE productId = ?;',
            function($s) use ($productId) {
                $s->bind_param('i', $productId);
            }
        );
        $stat->bind_result($rat);

        if ($stat->fetch()) {
            $rating[] = new \Domain\RatingValue($rat);
        }

        $stat->close();
        $conn->close();

        return $rating;
    }

    public function getNrOfRatingsForProduct($productId) {
        $rating = array();

        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'SELECT COUNT(*) AS \'rat\'
                      FROM Rating
                      WHERE productId = ?;',
            function($s) use ($productId) {
                $s->bind_param('i', $productId);
            }
        );
        $stat->bind_result($rat);

        if ($stat->fetch()) {
            $rating[] = new \Domain\RatingValue($rat);
        }

        $stat->close();
        $conn->close();

        return $rating;
    }

    public function getUserForUserNameAndPassword($userName, $password) {
        $user = null;

        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'SELECT id, passwordHash FROM user WHERE userName = ?',
            function($s) use ($userName) {
                $s->bind_param('s', $userName);
            }
        );
        $stat->bind_result($id, $passwordHash);

        if ($stat->fetch()  && password_verify($password, $passwordHash)) {
            $user = new \Domain\User($userName, $id);
        }

        $stat->close();
        $conn->close();

        return $user;
    }

    public function getUser($userId) {
        $user = null;

        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'SELECT id, userName FROM user WHERE id = ?',
            function($s) use ($userId) {
                $s->bind_param('i', $userId);
            }
        );
        $stat->bind_result($id, $userName);

        if ($stat->fetch()) {
            $user = new \Domain\User($userName, $id);
        }

        $stat->close();
        $conn->close();

        return $user;
    }

    public function getUserByName($userName) {
        $user = null;

        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'SELECT id, userName FROM user WHERE userName = ?',
            function($s) use ($userName) {
                $s->bind_param('s', $userName);
            }
        );
        $stat->bind_result($id, $userName);

        if ($stat->fetch()) {
            $user = new \Domain\User($userName, $id);
        }

        $stat->close();
        $conn->close();

        return $user;
    }

    public function setNewAccount($userName, $passwordHash) {
        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'INSERT INTO User (userName, passwordHash) VALUES (?, ?)',
            function($s) use ($userName, $passwordHash) {
                $s->bind_param('ss', $userName, $passwordHash);
            }
        );

        $stat->close();
        $conn->close();
    }

    public function getRatingsByUser($userName) {
        $ratings = array();

        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'SELECT id, productId, userCreated, creationDate, userComment, userRating
                      FROM rating
                      WHERE userCreated =  ?
                      ORDER BY creationDate DESC',
            function ($s) use ($userName) {
                $s->bind_param('s', $userName);
            }
        );

        $stat->bind_result($id, $productId, $userCreated, $creationDate, $userComment, $userRating);
        while ($stat->fetch()) {
            $ratings[] = new \Domain\Rating($id, $productId, $userCreated, $creationDate, $userComment, $userRating);
        }
        $stat->close();
        $conn->close();

        return $ratings;
    }

    public function getProductsByUser($userName) {
        $products = array();

        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'SELECT id, categroyId, name, manufacturer, userComment, userCreated, creationDate 
                      FROM product WHERE userCreated = ?',
            function ($s) use ($userName) {
                $s->bind_param('s', $userName);
            }
        );

        $stat->bind_result($id, $categoryId, $name, $manufacturer, $userComment, $userCreated, $creationDate);
        while ($stat->fetch()) {
            $products[] = new \Domain\Product($id, $categoryId, $name, $manufacturer,
                $userComment, $userCreated, $creationDate
                , $this->getAverageRatingForProduct($id), $this->getNrOfRatingsForProduct($id));
        }
        $stat->close();
        $conn->close();

        return $products;
    }

    public function getRatingForUserByProduct($userName, $product) {
        $ratings = array();

        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'SELECT id, productId, userCreated, creationDate, userComment, userRating
                      FROM rating
                      WHERE userCreated = ? AND productId = ?',
            function ($s) use ($userName, $product) {
                $s->bind_param('si', $userName, $product);
            }
        );

        $stat->bind_result($id, $productId, $userCreated, $creationDate, $userComment, $userRating);
        while ($stat->fetch()) {
            $ratings[] = new \Domain\Rating($id, $productId, $userCreated, $creationDate, $userComment, $userRating);
        }
        $stat->close();
        $conn->close();

        return $ratings;
    }

    public function setNewRating($rating) {
        $ratingPID = $rating->getProductId();
        $ratingUC = $rating->getUserCreated();
        $ratingCM = $rating->getUserComment();
        $ratingRT = $rating->getUserRating();
        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'INSERT INTO Rating (productId, userCreated, creationDate, userComment, userRating) VALUES
                              (?, ?, NOW(), ?, ?)',
            function($s) use ($ratingPID, $ratingUC, $ratingCM, $ratingRT) {
                $s->bind_param('issi', $ratingPID,
                    $ratingUC,
                    $ratingCM,
                    $ratingRT);
            }
        );

        $stat->close();
        $conn->close();
    }

    public function setNewProduct($product) {
        $productCategoryId = $product->getCategoryId();
        $productName = $product->getName();
        $productManu = $product->getManufacturer();
        $productUserComment = $product->getUserComment();
        $productUserCreated = $product->getUserCreated();


        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'INSERT INTO Product (categroyId, name, manufacturer, userComment, userCreated, creationDate) 
                      VALUES (?, ?, ?, ?, ?, NOW())',
            function($s) use ($productCategoryId, $productName, $productManu, $productUserComment, $productUserCreated) {
                $s->bind_param('issss',
                    $productCategoryId,
                    $productName,
                    $productManu,
                    $productUserComment,
                    $productUserCreated
                    );
            }
        );

        $stat->close();
        $conn->close();
    }

    public function updateRating($rating) {
        $ratingPID = $rating->getProductId();
        $ratingUC = $rating->getUserCreated();
        $ratingCM = $rating->getUserComment();
        $ratingRT = $rating->getUserRating();
        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'UPDATE Rating
                      SET userComment = ?, userRating = ?, creationDate = NOW()
                      WHERE userCreated = ? AND productId = ?',
            function($s) use ($ratingPID, $ratingUC, $ratingCM, $ratingRT) {
                $s->bind_param('sisi', $ratingCM,
                    $ratingRT,
                    $ratingUC,
                    $ratingPID);
            }
        );

        $stat->close();
        $conn->close();
    }

    public function updateProduct($product)
    {

        $productCategoryId = $product->getCategoryId();
        $productName = $product->getName();
        $productManu = $product->getManufacturer();
        $productUserComment = $product->getUserComment();
        $productUserCreated = $product->getUserCreated();
        $productId = $product->getId();

        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'UPDATE product
                      SET categroyId = ?, name = ?, manufacturer = ?, userComment = ?, creationDate = NOW()
                      WHERE userCreated = ? AND id = ?',
            function($s) use ($productCategoryId, $productName, $productManu, $productUserComment, $productUserCreated, $productId) {
                $s->bind_param('issssi',
                    $productCategoryId,
                    $productName,
                    $productManu,
                    $productUserComment,
                    $productUserCreated,
                    $productId
                );
            }
        );

        $stat->close();
        $conn->close();
    }

    public function getRatingForTable($userName) {
        $ratings = array();

        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'SELECT r.id, r.productId, r.userRating, r.creationDate ,p.name, p.manufacturer
                    FROM rating r
                    JOIN product p on r.productId = p.id
                    WHERE r.userCreated = ?
                    ORDER BY r.creationDate DESC;',
            function ($s) use ($userName) {
                $s->bind_param('s', $userName);
            }
        );

        $stat->bind_result($id, $productId, $userRating, $creationDate, $productName, $productManufactorer);
        while ($stat->fetch()) {
            $ratings[] = new \Domain\ProductRatingTable($id, $productId, null ,$userRating, $creationDate, $productName, $productManufactorer);
        }
        $stat->close();
        $conn->close();

        return $ratings;
    }

    public function deleteRatingByProductIdAndUserName($productId, $userName) {
        $conn = $this->getConnection();
        $stat = $this->executeStatement(
            $conn,
            'DELETE FROM Rating WHERE productId = ? AND userCreated = ?',
            function($s) use ($productId, $userName) {
                $s->bind_param('is',
                    $productId,
                    $userName
                );
            }
        );

        $stat->close();
        $conn->close();
    }
}