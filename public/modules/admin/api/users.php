<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('HTTP/1.1 400 Bad Request');
    return;
}

if (!isset($_SESSION['userId']) || empty($_SESSION['userId'])) {
    header('HTTP/1.1 403 Forbidden');
    error_log(print_r($_SESSION, true));
    return;
}

header('HTTP/1.1 200 OK');
$userlist = [
    [
        'username' => 'teddy',
        'firstname' => 'John',
        'lastname' => 'Doe',
        'email' => 'john@doe.com'
    ],
    [
        'username' => 'janey',
        'firstname' => 'Jane',
        'lastname' => 'Doe',
        'email' => 'jane@doe.com'
    ]
];
echo json_encode($userlist);