<?php self::renderView('partial/header', $model); ?>
<div class="container">
    <h1>My products overview</h1>

    <?php self::renderView('partial/toEditProduct', array('products' => $model['products'])); ?>


</div>
<?php self::renderView('partial/footer', $model); ?>
