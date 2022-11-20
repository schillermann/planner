<?php
require __DIR__ . '/../vendor/autoload.php';

use App\AuthApi;
use App\LoginApi;
use App\ModulesConfigsApi;
use App\UsersApi;
use PhpPages\App;
use PhpPages\OutputInterface;
use PhpPages\PageInterface;
use PhpPages\Request\NativeRequest;
use PhpPages\Response\NativeResponse;
use PhpPages\Session\NativeSession;

class ApiWithRoutes implements PageInterface
{
    public function viaOutput(OutputInterface $output): OutputInterface
    {
        return $output->withMetadata('PhpPages-Body', 'Not found');
    }

    public function withMetadata(string $name, string $value): PageInterface
    {
        if ($name === PageInterface::PATH) {
            if ($value === '/api/login') {
                return new LoginApi();
            }

            if ($value === '/api/users') {
                return new UsersApi();
            }
    
            if ($value === '/api/modules/configs') {
                return new ModulesConfigsApi($_SERVER['DOCUMENT_ROOT'] . '/../modules/');
            }
        }

        return $this;
    }
}

$session = new NativeSession();
$session->start();

(new App(
    new AuthApi(
        new ApiWithRoutes(),
        $session,
        ['/api/login', '/api/modules/configs',  '/api/routes']
    )
))
    ->start(
        new NativeRequest(),
        new NativeResponse()
    );