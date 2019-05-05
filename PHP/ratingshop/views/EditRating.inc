<?php self::renderView('partial/header', $model); ?>

<?php foreach ($model["Product"] as $Product) {
    foreach ($model["Rating"] as $Rating) { ?>

<?php self::beginActionForm('UpdateRating', 'Profile', array("pid" => $Product->getId()), 'post') ?>
    <div class="container">
        <div class="row" style="margin-top:40px;">
            <div class="col-md-6">
                <div class="well well-sm">
                    <div class="row">
                        <div class="col-md-12">
                            Update your Rating:
                            <div class="form-group">
                                <textarea class="form-control" id="exampleFormControlTextarea1"
                                          rows="3" name="uc" placeholder="Enter review here:"
                                          required><?php self::editOut($Rating->getUserComment()) ?></textarea>
                            </div>
                            </br>
                            <div class="text-left">
                                Rating for this product by school grade:
                                <?php if($Rating->getUserRating() == 1) { ?>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="ur" id="Radios1" value="1" checked>
                                    <label class="form-check-label" for="Radios1">
                                        1
                                    </label>
                                </div>
                                <?php } else { ?>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="ur" id="Radios1" value="1" >
                                    <label class="form-check-label" for="Radios1">
                                        1
                                    </label>
                                </div>
                                <?php } ?>
                                <?php if($Rating->getUserRating() == 2) { ?>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="ur" id="Radios2" value="2" checked>
                                    <label class="form-check-label" for="Radios2">
                                        2
                                    </label>
                                </div>
                                <?php } else { ?>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="ur" id="Radios2" value="2">
                                        <label class="form-check-label" for="Radios2">
                                            2
                                        </label>
                                    </div>
                                <?php } ?>
                                <?php if($Rating->getUserRating() == 3) { ?>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="ur" id="Radios3" value="3" checked>
                                    <label class="form-check-label" for="Radios3">
                                        3
                                    </label>
                                </div>
                                <?php } else { ?>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="ur" id="Radios3" value="3">
                                        <label class="form-check-label" for="Radios3">
                                            3
                                        </label>
                                    </div>
                                <?php } ?>
                                <?php if($Rating->getUserRating() == 4) { ?>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="ur" id="Radios4" value="4" checked>
                                    <label class="form-check-label" for="Radios4">
                                        4
                                    </label>
                                </div>
                                <?php } else { ?>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="ur" id="Radios4" value="4">
                                        <label class="form-check-label" for="Radios4">
                                            4
                                        </label>
                                    </div>
                                <?php } ?>
                                <?php if($Rating->getUserRating() == 5) { ?>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="ur" id="Radios5" value="5" checked>
                                    <label class="form-check-label" for="Radios5">
                                        5
                                    </label>
                                </div>
                                <?php } else { ?>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="ur" id="Radios5" value="5">
                                        <label class="form-check-label" for="Radios5">
                                            5
                                        </label>
                                    </div>
                                <?php } ?>
                            </div>
                            <div class="text-right">
                                <button class="btn btn-success btn-lg">Save</button>
                            </div>
                            <br/>
                            <?php self::endActionForm(); ?>
                            <div class="text-right">
                                <?php self::beginActionForm('DeleteRating', 'Profile', array('pid' => $Rating->getProductId()), 'post'); ?>
                                    <button class="btn btn-danger btn-sm">Delete</button>
                                <?php self::endActionForm(); ?>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

<?php } } ?>

<?php self::renderView('partial/footer', $model); ?>
