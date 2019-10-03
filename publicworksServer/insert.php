<?php
    header('Access-Control-Allow-Origin: *');
    header("Cache-Control: no-cache, no-store, must-revalidate");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Content-Type: application/json; charset=utf-8");
    
    require_once 'conexao.php';
    
    $postjson = json_decode(file_get_contents('php://input'), true);
    $hoje = date('Y-m-d');
    $hojeHora = date('Y-m-d H:i:s');

    if($postjson['crud']=='cadastro'){

        $insert = $pdo->prepare("INSERT INTO tbusuario (nomeUsuario, loginUsuario, senhaUsuario, cpfUsuario, fotoUsuario, cepUsuario, ruaUsuario, bairroUsuario, cidadeUsuario, estadoUsuario)
        VALUES (?, ?, ?, ?, 'semfoto.png', ?, ?, ?, 'São Paulo', 'SP')");
        $insert->bindParam(1, $postjson['nome']);
        $insert->bindParam(2, $postjson['email']);
        $insert->bindParam(3, $postjson['senha']);
        $insert->bindParam(4, $postjson['cpf']);
        $insert->bindParam(5, $postjson['cep']);
        $insert->bindParam(6, $postjson['ruaav']);
        $insert->bindParam(7, $postjson['bairro']);
        $insert->execute();
 

        if($insert){
            $result = json_encode(array('success'=>true));
        }else{
            $result = json_encode(array('success'=>false, 'msg'=>$inserirSQL));
        }
        echo $result;

    }else if ($postjson['crud']=='cadastrarObra'){
        //Retorna o id do orgão
        $select = $pdo->prepare("SELECT idOrgaoResponsavel from tborgaoresponsavel
            WHERE descricaoOrgaoResponsavel like ?");
        $select->bindParam(1, $postjson['orgao']);
        $select->execute();
        
        if($select->rowCount()<1){
            //Caso não tenha um orgão ele cadastra
            $insert = $pdo->prepare("INSERT INTO tborgaoresponsavel (descricaoOrgaoResponsavel)
                VALUES (?)");
            $insert->bindParam(1, $postjson['orgao']);
            $insert->execute();

            //Retorna o id do orgão cadastrado
            $select = $pdo->prepare("SELECT idOrgaoResponsavel from tborgaoresponsavel
                WHERE descricaoOrgaoResponsavel like ?");
            $select->bindParam(1, $postjson['orgao']);
            $select->execute();

            //Guarda o id do orgão em uma variavel
            while($linha = $select->fetch(PDO::FETCH_ASSOC)){
                $idOrgao = $linha['idOrgaoResponsavel'];
            }

        }else{
            //Guarda o id do orgão em uma variavel
            while($linha = $select->fetch(PDO::FETCH_ASSOC)){
                $idOrgao = $linha['idOrgaoResponsavel'];
            }
        }
        //Cadastra a obra
        $insert = $pdo->prepare("INSERT INTO tbobra (descricaoObra, numeroCasaObra, cepObra, logradouroObra, bairroObra, cidadeObra, estadoObra, latitudeObra, longitudeObra, custoPrevisto, dataHoraDivulgacaoObra, dataInicio, dataPrevistaTermino, idOrgaoResponsavel, idStatusObra, idUsuario)
        VALUES (?, ?, ?, ?, ?, 'São Paulo', 'SP', ?, ?, ?, '$hojeHora', ?, ?, $idOrgao, 1, ?)");
        $insert->bindParam(1, $postjson['nomeObra']);
        $insert->bindParam(2, $postjson['numero']);
        $insert->bindParam(3, $postjson['cep']);
        $insert->bindParam(4, $postjson['logradouro']);
        $insert->bindParam(5, $postjson['bairro']);
        $insert->bindParam(6, $postjson['latitude']);
        $insert->bindParam(7, $postjson['longitude']);
        $insert->bindParam(8, $postjson['custoPrevisto']);
        $insert->bindParam(9, $postjson['dataInicio']);
        $insert->bindParam(10, $postjson['dataTermino']);
        $insert->bindParam(11, $postjson['idUsuario']);
        $insert->execute();

        if($insert){
            $result = json_encode(array('success'=>true));
        }else{
            $result = json_encode(array('success'=>false, 'msg'=>'query'));
        }
        echo $result;

    }
    else if ($postjson['crud']=='fazerDenuncia'){
        $insert = $pdo->prepare("INSERT INTO tbdenuncia (dataDenuncia, idStatusDenuncia, idUsuario, idObra VALUES (".$hojeHora.", 1, ?, ?)");
        $insert->bindParam(3, $postjson['id']);// colocar o nome da variavel que você declarou no ionic
        $insert->bindParam(4, $postjson['idObra']);
        $insert->execute();

        if($insert){
            $result = json_encode(array('success'=>true));
        }else{
            $result = json_encode(array('success'=>false, 'msg'=>'query'));
        }
        echo $result;

    }

























?>