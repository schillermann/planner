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
        return array_key_exists(
            self::USERNAME,
            $this->array()
        );
    }

    public function password(): string
    {
        return array_key_exists(
            self::PASSWORD,
            $this->array()
        );
    }

    public function array(): array
    {
        return json_decode($this->request, true, 2) ?? [];
    }
}