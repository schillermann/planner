<?php
namespace App;

use PhpPages\OutputInterface;
use PhpPages\PageInterface;

class GetNavQuery implements PageInterface
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
        $navigation = [];
        $configJson = '';

        $navigation[] = [
            'routes' => [
                [
                    'uri' => '',
                    'layoutFile' => './layouts/default.js',
                    'viewFile' => './views/home.js',
                    'label' => [
                        'en' => 'Home',
                        'de' => 'Startseite'
                    ]
                ],
                [
                    'uri' => '#users',
                    'layoutFile' => './layouts/default.js',
                    'viewFile' => './views/users.js',
                    'label' => [
                        'en' => 'Users',
                        'de' => 'Benutzer'
                    ]
                ]
            ]
        ];

        foreach ($modules as $module) {
            
            $configJson = file_get_contents($module . DIRECTORY_SEPARATOR . 'config.json');
            $navigation[] = json_decode($configJson, true, 5, JSON_THROW_ON_ERROR);
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