<?php
namespace App;

interface UserRequestInterface
{
    public function username(): string;
    public function password(): string;
}