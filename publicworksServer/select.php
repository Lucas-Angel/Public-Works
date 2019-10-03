<?php
    header('Access-Control-Allow-Origin: *');
    header("Cache-Control: no-cache, no-store, must-revalidate");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Content-Type: application/json; charset=utf-8");
    
    require_once 'conexao.php';
    
    $postjson = json_decode(file_get_contents('php://input'), true);
    $hoje = date('Y-m-d');
    $hojeHora = date('Y-m-d H:i:s');
    if($postjson['crud']=='login'){

        $select = $pdo->prepare("SELECT * FROM tbusuario
            WHERE loginusuario LIKE ? AND senhausuario LIKE ?");
        $select->bindParam(1, $postjson['email']);
        $select->bindParam(2, $postjson['senha']);
        $select->execute();
        
        if($select->rowCount()>0){
            
            while($linha = $select->fetch(PDO::FETCH_ASSOC)){
                $dadouser = array(
                    'codigo' => $linha['idUsuario'],
                    'nome' => $linha['nomeUsuario'],
                    'email' => $linha['loginUsuario'],
                    'senha' => $linha['senhaUsuario'],
                    'foto' => $linha['fotoUsuario'],
                    'cpf' => $linha['cpfUsuario']
                );
            }
            
            $result = json_encode(array('success'=>true, 'result'=>$dadouser));

        }else{
            $result = json_encode(array('success'=>false, 'msg'=>'Erro'));
        }
        echo $result;
    }else if($postjson['crud']=='historicoObras'){

        $select = $pdo->prepare("SELECT descricaoObra, numeroCasaObra, numeroCasaObra, cepObra, logradouroObra, bairroObra,
                                    cidadeObra, estadoObra, custoPrevisto, dataHoraDivulgacaoObra, dataInicio, dataPrevistaTermino,
                                    descricaoStatusObra, descricaoOrgaoResponsavel from tbobra
                                        INNER JOIN tbstatusobra on tbobra.idStatusObra = tbstatusobra.idStatusObra
                                        INNER JOIN tborgaoresponsavel on tbobra.idOrgaoResponsavel = tborgaoresponsavel.idOrgaoResponsavel
                                            WHERE idUsuario like ?");
        $select->bindParam(1, $postjson['idusuario']);
        $select->execute();

        if($select->rowCount()>0){
           
          while($linha = $select->fetch(PDO::FETCH_ASSOC)){
                $dadoHistoricoObra[] = array(
                    'descricaoObra' => $linha['descricaoObra'],
                    'numeroCasaObra' => $linha['numeroCasaObra'],
                    'cepObra' => $linha['cepObra'],
                    'logradouroObra' => $linha['logradouroObra'],
                    'bairroObra' => $linha['bairroObra'],
                    'cidadeObra' => $linha['cidadeObra'],
                    'estadoObra' => $linha['estadoObra'],
                    'custoPrevisto' => $linha['custoPrevisto'],
                    'dataHoraDivulgacaoObra' => $linha['dataHoraDivulgacaoObra'],
                    'dataInicio' => $linha['dataInicio'],
                    'dataPrevistaTermino' => $linha['dataPrevistaTermino'],
                    'descricaoStatusObra' => $linha['descricaoStatusObra'],
                    'descricaoOrgaoResponsavel' => $linha['descricaoOrgaoResponsavel']
                );
            }
            $result = json_encode(array('success'=>true, 'result'=>$dadoHistoricoObra));
        
        }else{
            $result = json_encode(array('success'=>false, 'msg'=>'Erro'));
        }

        echo $result;
        
    }else if($postjson['crud']=='carregarObras'){

        $select = $pdo->prepare("SELECT idObra, descricaoObra, numeroCasaObra, latitudeObra, longitudeObra, custoPrevisto, dataInicio, dataPrevistaTermino from tbobra");

        $select->execute();

        if($select->rowCount()>0){
           
           while($linha = $select->fetch(PDO::FETCH_ASSOC)){
                $dadoObras[] = array(
                    'idObra' => $linha['idObra'],
                    'descricaoObra' => $linha['descricaoObra'],
                    'numeroCasaObra' => $linha['numeroCasaObra'],
                    'latitudeObra' => $linha['latitudeObra'],
                    'longitudeObra' => $linha['longitudeObra'],
                    'custoPrevisto' => $linha['custoPrevisto'],
                    'dataInicio' => $linha['dataInicio'],
                    'dataPrevistaTermino' => $linha['dataPrevistaTermino']
                );
            }
            $result = json_encode(array('success'=>true, 'result'=>$dadoObras));
        
        }else{
            $result = json_encode(array('success'=>false, 'msg'=>'Erro'));
        }

        echo $result;
    }
?>