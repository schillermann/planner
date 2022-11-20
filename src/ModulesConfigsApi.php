<?php
namespace App;

use PhpPages\OutputInterface;
use PhpPages\PageInterface;

class ModulesConfigsApi implements PageInterface
{
    private string $modulesPath;

    public function __construct(string $modulesPath)
    {
        $this->modulesPath = $modulesPath;        
    }

    public function viaOutput(OutputInterface $output): OutputInterface
    {
        $modules = [];
        $modules = glob(realpath($this->modulesPath) . '/*' , GLOB_ONLYDIR);
        $configs = [];
        $configJson = '';

        foreach ($modules as $module) {
            
            $configJson = file_get_contents($module . DIRECTORY_SEPARATOR . 'config.json');
            $configs[] = json_decode($configJson, true, 5, JSON_THROW_ON_ERROR);
        }

        return $output
            ->withMetadata('Content-Type', 'application/json')
            ->withMetadata(PageInterface::BODY, json_encode($configs, JSON_THROW_ON_ERROR, 5));
    }

    public function withMetadata(string $name, string $value): PageInterface
    {
        return $this;
    }
}