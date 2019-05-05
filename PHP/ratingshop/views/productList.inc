<?php self::renderView('partial/header', $model); ?>
    <div class="container">
        <h1>Product overview</h1>
       <p>
        <ul class="nav nav-pills" role="tablist">
            <li role="presentation">
                <?php self::actionLink('All Products', 'Index', 'Products', array('cid' => -1)); ?>
            </li>
            <?php foreach ($model['categories'] as $cat) { ?>
                <li role="presentation">
                    <?php self::actionLink($cat->getName(), 'Index', 'Products', array('cid' => $cat->getId())); ?>
                </li>
            <?php } ?>
        </ul>
        </p>

        <?php if($model['selectedCategoryId'] != null): ?>
            <?php if(sizeof($model['products']) > 0) {
                self::renderView('partial/products', array('products' => $model['products'], 'context' => $model['context']));
            } else { ?>
                <p>No products in this category.</p>
            <?php } ?>
        <?php else: ?>
            <p>Please select a category.</p>
        <?php endif; ?>

    </div>
<?php self::renderView('partial/footer', $model); ?>