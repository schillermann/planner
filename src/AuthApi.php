<?php
namespace App;

use PhpPages\OutputInterface;
use PhpPages\PageInterface;
use PhpPages\SessionInterface;

class AuthApi implements PageInterface
{
    private PageInterface $apiWithRoutes;
    private SessionInterface $session;
    private array $excludedPaths;

    public function __construct(PageInterface $apiWithRoutes, SessionInterface $session, array $excludedPaths = [])
    {
        $this->apiWithRoutes = $apiWithRoutes;
        $this->session = $session;
        $this->excludedPaths = $excludedPaths;
    }

    public function viaOutput(OutputInterface $output): OutputInterface
    {
        return $output
            ->withMetadata(PageInterface::STATUS, 'HTTP/1.1 401 Unauthorized');
    }

    public function withMetadata(string $name, string $value): PageInterface
    {
        if ($name === PageInterface::PATH) {
            if(in_array($value, $this->excludedPaths) || $this->session->param('userId')) {
                return $this->apiWithRoutes->withMetadata($name, $value);
            }
        }

        return $this;
    }
}