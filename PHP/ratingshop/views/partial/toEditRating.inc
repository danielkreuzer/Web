<div class="table-responsive">
    <table class="table">
        <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Creation Date</th>
            <th>My rating for this product</th>
            <th></th>
        </tr>
        <?php foreach($model['ratings'] as $rating):?>
            <tr>
                <td><?php self::htmlOut($rating->getProductName()) ?></td>
                <td><?php self::htmlOut($rating->getProdcutManufactorer()) ?></td>
                <td><?php self::htmlOut($rating->getCreationDate()) ?></td>
                <td>
                    <?php $UserRating = array();
                    $UserRating[] = new Domain\RatingValue($rating->getUserRating()); ?>
                    <?php self::renderView('partial/RatingStars', array('rating' => $UserRating)) ?>
                </td>
                <td><?php self::beginActionForm('ReviewEdit', 'Profile', array('pid' => $rating->getProductId()), 'get'); ?>
                    <button class="btn btn-link">Edit</button>
                    <?php self::endActionForm(); ?>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
</div>