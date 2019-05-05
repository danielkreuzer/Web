<div class="table-responsive">
    <table class="table">
        <tr>
            <th>Name</th>
            <th>Manufactorer</th>
            <th>Created by</th>
            <th>Nr of reviews | Average ratings</th>
            <th></th>
        </tr>
        <?php if(isset($model['products']) && !is_null($model['products'])) { ?>
        <?php foreach($model['products'] as $product):?>
            <tr>
                <td><?php self::htmlOut($product->getName()) ?></td>
                <td><?php self::htmlOut($product->getManufacturer()) ?></td>
                <td><?php self::htmlOut($product->getUserCreated()) ?></td>
                <?php foreach ($product->getNrOfRatings() as $nrOfRating): ?>
                    <?php if(!is_null($product->getNrOfRatings()) && $nrOfRating->getValue() > 0) { ?>
                        <td>
                        <?php self::htmlOut($nrOfRating->getValue())?> review(s) | avg:
                    <?php self::renderView('partial/RatingStars', array('rating' => $product->getAvgRating())) ?></td>
                <?php } else { ?>
                    <td>No ratings</td>
                <?php } ?>
                <?php endforeach; ?>
                <td><?php self::beginActionForm('Index', 'Details', array('pid' => $product->getId()), 'get'); ?>
                        <button class="btn btn-link">Details</button>
                    <?php self::endActionForm(); ?>
                </td>
            </tr>
        <?php endforeach; ?>
        <?php } ?>
    </table>
</div>
