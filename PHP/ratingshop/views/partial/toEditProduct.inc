<div class="table-responsive">
    <table class="table">
        <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Creation Date</th>
            <th>Nr of reviews | Average ratings</th>
            <th></th>
        </tr>
        <?php foreach($model['products'] as $product):?>
            <tr>
                <td><?php self::htmlOut($product->getName()) ?></td>
                <td><?php self::htmlOut($product->getManufacturer()) ?></td>
                <td><?php self::htmlOut($product->getCreationDate()) ?></td>
                <?php foreach ($product->getNrOfRatings() as $nrOfRating): ?>
                    <?php if(!is_null($product->getNrOfRatings()) && $nrOfRating->getValue() > 0) { ?>
                        <td>
                            <?php self::htmlOut($nrOfRating->getValue())?> review(s) | avg:
                            <?php self::renderView('partial/RatingStars', array('rating' => $product->getAvgRating())) ?></td>
                    <?php } else { ?>
                        <td>No ratings</td>
                    <?php } ?>
                <?php endforeach; ?>
                <td><?php self::beginActionForm('ProductEdit', 'Profile', array('pid' => $product->getId()), 'get'); ?>
                    <button class="btn btn-link">Edit</button>
                    <?php self::endActionForm(); ?>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
</div>