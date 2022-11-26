<?php
namespace App\Modules\Trolleydienst;

use PhpPages\OutputInterface;
use PhpPages\PageInterface;

class GetRoutesQuery implements PageInterface
{
    private \PDO $database;

    public function __construct(\PDO $database)
    {
        $this->database = $database;
    }

    public function viaOutput(OutputInterface $output): OutputInterface
    {
        return $output;
    }

    public function withMetadata(string $name, string $value): PageInterface
    {
        return $this;
    }
}