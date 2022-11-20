<?php
namespace App;

use PhpPages\OutputInterface;
use PhpPages\PageInterface;

class UsersApi implements PageInterface
{
    public function viaOutput(OutputInterface $output): OutputInterface
    {
        $arr = [[
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
        ]];
        return $output
            ->withMetadata('Content-Type', 'application/json')
            ->withMetadata('PhpPages-Body', json_encode($arr));
    }

    public function withMetadata(string $name, string $value): PageInterface
    {
        return $this;
    }
}