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
        
        $users = $this->database->query('SELECT * FROM user')->fetchAll();
        var_dump($users);
        exit;
        return $output->withMetadata(PageInterface::BODY, '{}');
    }

    public function withMetadata(string $name, string $value): PageInterface
    {
        return $this;
    }
}