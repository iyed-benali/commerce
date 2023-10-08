<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web App</title>
</head>
<body>
    <h1>Welcome to My Web App</h1>
    <h2>Choose a Section:</h2>
    <ul>
        <li><a href="<?php echo e(url('/admins')); ?>">Admins</a></li>
        <li><a href="<?php echo e(url('/buyers')); ?>">Buyers</a></li>
        <li><a href="<?php echo e(url('/sellers')); ?>">Sellers</a></li>
        <li><a href="<?php echo e(url('/static_pages')); ?>">Static Pages</a></li>
        <li><a href="<?php echo e(url('/products')); ?>">Products</a></li>
        <li><a href="<?php echo e(url('/ratings')); ?>">Ratings</a></li>
        <li><a href="<?php echo e(url('/purchase')); ?>">Purchase</a></li>
    </ul>
</body>
</html>
<?php /**PATH C:\xampp\htdocs\E-commerce\resources\views/index.blade.php ENDPATH**/ ?>