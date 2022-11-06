<?php
$modules = [];
$modules = glob('../../*' , GLOB_ONLYDIR);
$navList = [];

foreach ($modules as $module) {
    $navJson = file_get_contents($module . DIRECTORY_SEPARATOR . 'config.json');
    $navList[] = json_decode($navJson, true, 5, JSON_THROW_ON_ERROR);
}

echo json_encode($navList, JSON_THROW_ON_ERROR, 5);