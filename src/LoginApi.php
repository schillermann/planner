<?php
namespace App;

use PhpPages\OutputInterface;
use PhpPages\PageInterface;

class LoginApi implements PageInterface
{
    private UserRequestInterface $user;

    public function __construct(UserRequestInterface $user = new UserRequest(''))
    {
        $this->user = $user;
    }

    public function viaOutput(OutputInterface $output): OutputInterface
    {
        if (!$this->user->username() || !$this->user->password()) {
            return $output->withMetadata(PageInterface::STATUS, 'HTTP/1.1 400 Bad Request');
        }

        if ($this->user->username() === 'admin' && $this->user->password() === 'admin') {
            return $output;
        }

        return $output->withMetadata(PageInterface::STATUS, 'HTTP/1.1 401 Unauthorized');
    }

    public function withMetadata(string $name, string $value): PageInterface
    {
        if ($name === PageInterface::BODY) {
            return new LoginApi(new UserRequest($value));
        }

        return $this;
    }
}