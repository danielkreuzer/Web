<?php self::renderView('partial/header', $model); ?>
    <div class="container">
        <h1>Search</h1>
        <p>
            <?php self::beginActionForm('Search', 'Products', null, 'get', 'form-inline'); ?>
        <div class="form-group">
            <label for="name">Product / Manufacturer Name: </label>
            <input class="form-control" id="name" name="name" value="<?php self::htmlOut($model['name']); ?>">
        </div>
        <button class="btn btn-primary">Search</button>
        <?php self::endActionForm(); ?>
        </p>
        <?php if ($model['products'] !== null): ?>
            <?php if(sizeof($model['products']) > 0) {
                self::renderView('partial/products', array('products' => $model['products'], 'context' => $model['context']));
            } else { ?>
                <p>No matching product found.</p>
            <?php } ?>
        <?php endif; ?>
    </div>
<?php self::renderView('partial/footer', $model); ?>