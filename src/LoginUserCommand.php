<?php
namespace App;

use PhpPages\OutputInterface;
use PhpPages\PageInterface;
use PhpPages\SessionInterface;

class LoginUserCommand implements PageInterface
{
    private \Pdo $database;
    private SessionInterface $session;
    private UserRequestInterface $user;

    public function __construct(\Pdo $database, SessionInterface $session, UserRequestInterface $user = new UserRequest(''))
    {
        $this->database = $database;
        $this->session = $session;
        $this->user = $user;
    }

    public function viaOutput(OutputInterface $output): OutputInterface
    {
        if (!$this->user->username() || !$this->user->password()) {
            return $output->withMetadata(PageInterface::STATUS, 'HTTP/1.1 400 Bad Request');
        }

        $stmt = $this->database->prepare('SELECT id, password FROM user WHERE username=:username OR email=:email');
        $stmt->execute([
            'username' => $this->user->username(),
            'email' => $this->user->username()
        ]); 

        $user = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (password_verify($this->user->password(), $user['password'])) {
            $this->session->add('userId', $user['id']);
            return $output;
        }

        return $output->withMetadata(PageInterface::STATUS, 'HTTP/1.1 401 Unauthorized');
    }

    public function withMetadata(string $name, string $value): PageInterface
    {
        if ($name === PageInterface::BODY) {
            return new LoginUserCommand(
                $this->database,
                $this->session,
                new UserRequest($value)
            );
        }

        return $this;
    }
}