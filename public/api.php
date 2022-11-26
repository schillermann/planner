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
    private array $routes;

    public function __construct(\PDO $database, array $routes)
    {
        $this->database = $database;
        $this->routes = $routes;        
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
    
            if ($value === '/api/get-nav') {
                return new GetNavQuery($_SERVER['DOCUMENT_ROOT'] . '/../modules/', $this->routes);
            }

            if ($value === '/api/get-routes') {
                return new GetRoutesQuery($_SERVER['DOCUMENT_ROOT'] . '/../modules/', $this->routes);
            }
        }

        return $this;
    }
}


$user = 'root';
$pass = 'root';
$routes = [
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
];

$session = new NativeSession();
$session->start();

(new App(
    new AuthApi(
        new ApiWithRoutes(
            new \PDO('mysql:host=localhost;dbname=simple_crm', $user, $pass),
            $routes
        ),
        $session,
        ['/api/login-user', '/api/get-nav',  '/api/get-routes']
    )
))
    ->start(
        new NativeRequest(),
        new NativeResponse()
    );