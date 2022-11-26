<?php
namespace App;

use PhpPages\OutputInterface;
use PhpPages\PageInterface;

class GetRoutesQuery implements PageInterface
{
    private string $modulesPath;
    private array $routes;

    public function __construct(string $modulesPath, array $routes)
    {
        $this->modulesPath = $modulesPath;
        $this->routes = $routes;    
    }

    public function viaOutput(OutputInterface $output): OutputInterface
    {
        $modules = [];
        $modules = glob(realpath($this->modulesPath) . '/*' , GLOB_ONLYDIR);
        $routes = $this->routes;
        $configJson = '';

        foreach ($modules as $module) {
            
            $configJson = file_get_contents($module . DIRECTORY_SEPARATOR . 'config.json');
            $config = json_decode($configJson, true, 5, JSON_THROW_ON_ERROR);
            foreach ($config['routes'] as $configRoutes) {
                $routes[] = $configRoutes;
            }
        }

        return $output
            ->withMetadata('Content-Type', 'application/json')
            ->withMetadata(PageInterface::BODY, json_encode($routes, JSON_THROW_ON_ERROR, 5));
    }

    public function withMetadata(string $name, string $value): PageInterface
    {
        return $this;
    }
}