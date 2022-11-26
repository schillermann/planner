<?php
namespace App;

use PhpPages\OutputInterface;
use PhpPages\PageInterface;

class GetNavQuery implements PageInterface
{
    private string $modulesPath;
    private array $routes;

    public function __construct(string $modulesPath, $routes)
    {
        $this->modulesPath = $modulesPath;
        $this->routes = $routes;     
    }

    public function viaOutput(OutputInterface $output): OutputInterface
    {
        $modules = [];
        $modules = glob(realpath($this->modulesPath) . '/*' , GLOB_ONLYDIR);
        $navigation = [];

        $navigation[] = [
            'routes' => $this->routes
        ];

        foreach ($modules as $module) {
            
            $moduleConfigJson = '';
            $moduleConfigJson = file_get_contents($module . DIRECTORY_SEPARATOR . 'config.json');
            $navigation[] = json_decode($moduleConfigJson, true, 5, JSON_THROW_ON_ERROR);
        }

        return $output
            ->withMetadata('Content-Type', 'application/json')
            ->withMetadata(PageInterface::BODY, json_encode($navigation, JSON_THROW_ON_ERROR, 5));
    }

    public function withMetadata(string $name, string $value): PageInterface
    {
        return $this;
    }
}