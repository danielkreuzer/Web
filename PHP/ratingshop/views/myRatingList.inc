<?php self::renderView('partial/header', $model); ?>
    <div class="container">
        <h1>My ratings overview</h1>

        <?php self::renderView('partial/toEditRating', array('ratings' => $model['ratings'])); ?>


    </div>
<?php self::renderView('partial/footer', $model); ?>