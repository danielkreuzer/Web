<?php self::renderView('partial/header', $model); ?>
    <div class="container">
        <div class="row main">
            <?php self::beginActionForm('Register', 'User', null, 'post') ?>
            <div class="main-login main-center">
                <h5>Sign up once and rate or create products.</h5>

                    <div class="form-group">
                        <label for="name" class="cols-sm-2 control-label">UserName</label>
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                <input type="text" class="form-control" name="un" id="name"  placeholder="Enter your Name" required/>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="password" class="cols-sm-2 control-label">Password</label>
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                <input type="password" class="form-control" name="pwd" id="password"  placeholder="Enter your Password" required/>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="confirm" class="cols-sm-2 control-label">Confirm Password</label>
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                <input type="password" class="form-control" name="pwdcon" id="confirm"  placeholder="Confirm your Password" required/>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-primary btn-lg btn-block login-button">Register</button>

            </div>
            <?php self::endActionForm(); ?>
        </div>
    </div>

<?php self::renderView('partial/footer', $model); ?>