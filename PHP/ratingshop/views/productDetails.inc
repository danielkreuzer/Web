<?php self::renderView('partial/header', $model); ?>
<?php $productgl = null ?>
<!-- Page Content -->
<div class="container">

    <div class = "container">

        <div class="col-lg-9">

            <div class="jumbotron">
                <div>
                    <?php foreach($model['product'] as $product): ?>
                    <?php $productgl = $product ?>
                    <h3 class="card-title"><?php self::htmlOut($product->getName()) ?></h3>
                    <h4><?php self::htmlOut($product->getManufacturer()) ?></h4>
                        <p class="card-text"><h5><?php self::htmlOut($product->getUserComment()) ?></h5></p>
                        </br>
                        <h4>Average rating for this product: </h4>
                    <?php foreach ($model['nrOfRatings'] as $nrOfRating) { ?>
                        <?php if(isset($model['nrOfRatings']) && !is_null($model['nrOfRatings']) && $nrOfRating->getValue() > 0) {?>
                            Nr of reviews: <?php self::htmlOut($nrOfRating->getValue()) ?>
                            <br>
                                <?php self::renderView('partial/RatingStars', array('rating' => $model['rating'])) ?>
                            <?php } else { ?>
                                <br>
                                No ratings
                            <?php } ?>
                        <?php } ?>

                    <?php endforeach; ?>

                </div>
            </div>
            <!-- /.card -->

            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3>
                        Product Reviews
                    </h3>
                </div>
                <div class="panel-body">
                    <?php if(isset($model['reviews']) && !is_null($model['reviews'])) { ?>
                    <?php foreach ($model['reviews'] as $review) {?>
                        <?php $UserRating = array();
                            $UserRating[] = new Domain\RatingValue($review->getUserRating()); ?>
                        <?php self::renderView('partial/RatingStars', array('rating' => $UserRating)) ?>
                        <br>
                        <br>
                    <p><?php self::htmlOut($review->getUserComment())?></p>
                        <small class="text-muted">Posted by <b><?php self::htmlOut($review->getUserCreated())?></b> on <?php self::htmlOut($review->getCreationDate())?></small>
                    <hr>
                    <?php } ?>
                    <?php } ?>
                    <?php if(isset($model['user']) && !is_null($model['user'])) { ?>
                            <?php if($model['alreadyCommented']) { ?>
                                You already gave a rating for this product!
                            <?php } else { ?>
                            <?php if(!is_null($productgl)) { ?>
                            <?php self::beginActionForm('Comment', 'Profile', array("pd" => $productgl->getId()), 'post') ?>
                            <div class="container">
                                <div class="row" style="margin-top:40px;">
                                    <div class="col-md-6">
                                        <div class="well well-sm">
                                            <div class="row">
                                                <div class="col-md-12">
                                                        <div class="form-group">
                                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="uc" placeholder="Enter review here:" required></textarea>
                                                        </div>
                                                        </br>
                                                        <div class="text-left">
                                                            Rating for this product by school grade:
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="ur" id="Radios1" value="1" checked>
                                                                <label class="form-check-label" for="Radios1">
                                                                    1
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="ur" id="Radios2" value="2">
                                                                <label class="form-check-label" for="Radios2">
                                                                    2
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="ur" id="Radios3" value="3">
                                                                <label class="form-check-label" for="Radios3">
                                                                    3
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="ur" id="Radios4" value="4">
                                                                <label class="form-check-label" for="Radios4">
                                                                    4
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="ur" id="Radios5" value="5">
                                                                <label class="form-check-label" for="Radios5">
                                                                    5
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div class="text-right">
                                                            <button class="btn btn-success btn-lg">Save</button>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <?php self::endActionForm(); ?>
                            <?php } } ?>
                    <?php } ?>
                </div>
            </div>
            <!-- /.card -->

        </div>
        <!-- /.col-lg-9 -->
    </div>
</div>

<?php self::renderView('partial/footer', $model); ?>
