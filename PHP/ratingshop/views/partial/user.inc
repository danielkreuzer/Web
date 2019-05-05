<ul class="nav navbar-nav">
<?php if(!isset($model)): ?>
    <li><?php self::actionLink('Login', 'LogIn', 'User'); ?></li>
<?php else: ?>
    <li class="navbar-text">Welcome, <?php self::htmlOut($model->getUserName()); ?></li>
    <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Profile <b class="caret"></b></a>
        <ul class="dropdown-menu">
            <li>
                <?php self::actionLink('Create new product', 'New', 'Profile'); ?>
            </li>
            <li>
                <?php self::actionLink('My ratings', 'Ratings', 'Profile'); ?>
            </li>
            <li>
                <?php self::actionLink('My products', 'Products', 'Profile'); ?>
            </li>
        </ul>
    </li>
    <li>
        <?php self::beginActionForm('LogOut', 'User', null, 'post', 'navbar-form'); ?>
        <button class="btn btn-link">Log out</button>
        <?php self::endActionForm(); ?>
    </li>
<?php endif; ?>
</ul>


