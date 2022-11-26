<?php
namespace App;

use PhpPages\OutputInterface;
use PhpPages\PageInterface;

class GetUsersQuery implements PageInterface
{
    private \PDO $database;

    public function __construct(\PDO $database)
    {
        $this->database = $database;
    }

    public function viaOutput(OutputInterface $output): OutputInterface
    {
        $userJson = [];
        $users = $this->database->query('SELECT * FROM user')->fetchAll(\PDO::FETCH_ASSOC);
        
        foreach ($users as $user) {
            $userJson[] = [
                'id' => $user['id'],
                'username' => $user['username'],
                'email' => $user['email'],
                'password' => $user['password'],
                'firstname' => $user['firstname'],
                'lastname' => $user['lastname'],
                'disabled' => (bool)$user['disabled'],
                'createdAt' => $user['created_at'],
                'updatedAt' => $user['updated_at'],
            ];

        }

        return $output->withMetadata(PageInterface::BODY, json_encode($userJson, JSON_THROW_ON_ERROR, 2));
    }

    public function withMetadata(string $name, string $value): PageInterface
    {
        return $this;
    }
}