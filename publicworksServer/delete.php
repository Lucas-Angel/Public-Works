<?php
    header('Access-Control-Allow-Origin: *');
    header("Cache-Control: no-cache, no-store, must-revalidate");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Content-Type: application/json; charset=utf-8");
    
    require_once 'conexao.php';
    
    $postjson = json_decode(file_get_contents('php://input'), true);
    $hoje = date('Y-m-d');
    $hojeHora = date('Y-m-d H:i:s');
?>