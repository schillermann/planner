<?php
require __DIR__ . '/../vendor/autoload.php';

use App\AuthApi;
use App\GetNavQuery;
use App\GetRoutesQuery;
use App\GetUsersQuery;
use App\LoginUserCommand;
use PhpPages\App;
use PhpPages\OutputInterface;
use PhpPages\PageInterface;
use PhpPages\Request\NativeRequest;
use PhpPages\Response\NativeResponse;
use PhpPages\Session\NativeSession;

class ApiWithRoutes implements PageInterface
{
    private \PDO $database;

    public function __construct(\PDO $database)
    {
        $this->database = $database;        
    }

    public function viaOutput(OutputInterface $output): OutputInterface
    {
        return $output->withMetadata('PhpPages-Body', 'Not found');
    }

    public function withMetadata(string $name, string $value): PageInterface
    {
        if ($name === PageInterface::PATH) {
            if ($value === '/api/login-user') {
                return new LoginUserCommand();
            }

            if ($value === '/api/get-users') {
                return new GetUsersQuery($this->database);
            }
    
            if ($value === '/api/get-navigation') {
                return new GetNavQuery($_SERVER['DOCUMENT_ROOT'] . '/../modules/');
            }

            if ($value === '/api/get-routes') {
                return new GetRoutesQuery($_SERVER['DOCUMENT_ROOT'] . '/../modules/');
            }
        }

        return $this;
    }
}


$user = 'root';
$pass = 'root';

$session = new NativeSession();
$session->start();

(new App(
    new AuthApi(
        new ApiWithRoutes(
            new \PDO('mysql:host=localhost;dbname=simple_crm', $user, $pass)
        ),
        $session,
        ['/api/login-user', '/api/get-navigation',  '/api/get-routes']
    )
))
    ->start(
        new NativeRequest(),
        new NativeResponse()
    );