<?php
require __DIR__ . '/../vendor/autoload.php';

use App\AuthApi;
use App\Modules\Trolleydienst\GetPublishersQuery;
use App\Modules\Trolleydienst\GetRoutesQuery;
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
            if ($value === '/modules/trolleydienst/api/get-routes') {
                return new GetRoutesQuery($this->database);
            }
    
            if ($value === '/modules/trolleydienst/api/get-publishers') {
                return new GetPublishersQuery($this->database);
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
        []
    )
))
    ->start(
        new NativeRequest(),
        new NativeResponse()
    );