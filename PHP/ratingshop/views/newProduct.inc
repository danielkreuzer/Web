<?php self::renderView('partial/header', $model); ?>
<div class="container">
    <div class="row main">
        <?php self::beginActionForm('Product', 'Profile', null, 'post') ?>
        <div class="main-login main-center">
            <h5>Add a new Product and let other users rate it.</h5>

            <div class="form-group">
                <label for="name" class="cols-sm-2 control-label">Product name</label>
                <div class="cols-sm-10">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fas fa-pencil-alt" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" name="pn" id="name"  placeholder="Enter product name" required/>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="manu" class="cols-sm-2 control-label">Manufacturer</label>
                <div class="cols-sm-10">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fas fa-wrench" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" name="pm" id="manu"  placeholder="Enter your manufacturer name" required/>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="confirm" class="cols-sm-2 control-label">Enter short description and where you have seen the product</label>
                <div class="cols-sm-10">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fas fa-align-left" aria-hidden="true"></i></span>
                        <div class="form-group">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="ut" placeholder="Enter description here:" required></textarea>
                        </div>
                    </div>
                </div>
            </div>


            <div class="form-group">
                <label for="inputState" class="cols-sm-2 control-label">Choose category: </label>
                <div class="cols-sm-10">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fas fa-list-ul" aria-hidden="true"></i></span>
                        <div class="form-group">
                            <select id="inputState" name="cat" class="form-control" required>
                                <?php foreach ($model['categories'] as $cat) { ?>
                                    <option value="<?php self::htmlOut($cat->getId()) ?>"><?php self::htmlOut($cat->getName()) ?></option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <button class="btn btn-primary btn-lg btn-block login-button">POST</button>

        </div>
        <?php self::endActionForm(); ?>
    </div>
</div>
<?php self::renderView('partial/footer', $model); ?>
