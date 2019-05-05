<?php foreach ($model['rating'] as $rating): ?>
    <?php if($rating->getValue() < 1.6) { ?>
        <span class="text-warning">&#9733; &#9733; &#9733; &#9733; &#9733;</span>
    <?php } elseif($rating->getValue() < 2.6) { ?>
        <span class="text-warning">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
    <?php } elseif($rating->getValue() < 3.6) { ?>
        <span class="text-warning">&#9733; &#9733; &#9733; &#9734; &#9734;</span>
    <?php } elseif($rating->getValue() < 4.6) { ?>
        <span class="text-warning">&#9733; &#9733; &#9734; &#9734; &#9734;</span>
    <?php } else { ?>
        <span class="text-warning">&#9733; &#9734; &#9734; &#9734; &#9734;</span>
    <?php } ?>
    school grade: <b><?php self::htmlOut($rating->getValue()) ?></b>

<?php endforeach; ?>
