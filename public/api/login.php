<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 400 Bad Request');
    return;
}

$requestBody = json_decode(file_get_contents('php://input'), true);
if (!isset($requestBody['username']) || !isset($requestBody['password'])) {
    header('HTTP/1.1 400 Bad Request');
    return;
}

function credentialCheck(string $username, string $password) {
    return $username === 'admin' && $password === 'admin';
}

if (credentialCheck($requestBody['username'], $requestBody['password'])) {
    $_SESSION['userId'] = 1;
    header('HTTP/1.1 200 OK');
    return;
}

header('HTTP/1.1 401 Unauthorized');