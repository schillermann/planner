<?php
namespace App;

class UserRequest implements UserRequestInterface
{
    const USERNAME = 'username';
    const PASSWORD = 'password';

    private string $request;

    public function __construct(string $request)
    {
        $this->request = $request;    
    }

    public function username(): string
    {
        return $this->array()[self::USERNAME];
    }

    public function password(): string
    {
        return $this->array()[self::PASSWORD];
    }

    public function array(): array
    {
        return json_decode($this->request, true, 2) ?? [];
    }
}