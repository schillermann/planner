<?php
namespace App;

use PhpPages\Form\SimpleFormData;
use PhpPages\OutputInterface;
use PhpPages\PageInterface;

class GetUserQuery implements PageInterface
{
    private \PDO $database;
    private int $userId;

    public function __construct(\PDO $database, int $userId = 0)
    {
        $this->database = $database;
        $this->userId = $userId;
    }

    public function viaOutput(OutputInterface $output): OutputInterface
    {
        $stmt = $this->database->prepare('SELECT id, username, email, firstname, lastname, disabled, created_at, updated_at FROM user WHERE id=:id');
        $stmt->execute([
            'id' => $this->userId
        ]); 

        $user = $stmt->fetch(\PDO::FETCH_ASSOC);

        return $output->withMetadata(
            PageInterface::BODY,
            json_encode(
                [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'firstname' => $user['firstname'],
                    'lastname' => $user['lastname'],
                    'disabled' => (bool)$user['disabled'],
                    'createdAt' => $user['created_at'],
                    'updatedAt' => $user['updated_at'],
                ],
                JSON_THROW_ON_ERROR,
                2
            )
        );
    }

    public function withMetadata(string $name, string $value): PageInterface
    {
        if ($name === PageInterface::QUERY) {
            
            return new GetUserQuery(
                $this->database,
                (int)(new SimpleFormData($value))->param('id')
            );
        }

        return $this;
    }
}