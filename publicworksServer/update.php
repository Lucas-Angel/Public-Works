<?php
    header('Access-Control-Allow-Origin: *');
    header("Cache-Control: no-cache, no-store, must-revalidate");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Content-Type: application/json; charset=utf-8");
    
    require_once 'conexao.php';
    
    $postjson = json_decode(file_get_contents('php://input'), true);
    $hoje = date('Y-m-d');
    $hojeHora = date('Y-m-d H:i:s');

    if($postjson['crud']=='editarSenha'){

        $update = $pdo->prepare("UPDATE tbusuario
            SET senhaUsuario = ?
            WHERE idUsuario = ?");
        $update->bindParam(1, $postjson['senha']);
        $update->bindParam(2, $postjson['id']);
        $update->execute();

        if($update){
            $result = json_encode(array('success'=>true));
        }else{
            $result = json_encode(array('success'=>false, 'msg'=>'Erro'));
        }
        echo $result;
    }
    else if($postjson['crud']=='editarEmail'){
        $update = $pdo->prepare("UPDATE tbusuario
            SET loginUsuario = ?
            WHERE idUsuario = ?");
        $update->bindParam(1, $postjson['email']);
        $update->bindParam(2, $postjson['id']);
        $update->execute();

        if($update){
            $result = json_encode(array('success'=>true));
        }else{
            $result = json_encode(array('success'=>false, 'msg'=>'Erro'));
        }
        echo $result;
        
    }
    else if($postjson['crud']=='alterarStatus'){
        $update = $pdo->prepare("UPDATE tbdenuncia
            SET idStatusDenuncia = ?
            WHERE idDenuncia = ?");
        $update->bindParam(1, $postjson['idStatus']);
        $update->bindParam(2, $postjson['idDenuncia']);
        $update->execute();

        if($update){
            $result = json_encode(array('success'=>true));
        }else{
            $result = json_encode(array('success'=>false, 'msg'=>'Erro'));
        }
        echo $result;
        
    }


?>