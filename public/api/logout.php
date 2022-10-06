<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('HTTP/1.1 400 Bad Request');
    return;
}

header('HTTP/1.1 200 OK');
unset($_SESSION['userId']);