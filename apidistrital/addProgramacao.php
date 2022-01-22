<?php 

include_once('conexao.php');

$postjson = json_decode(file_get_contents("php://input"), true);

if($postjson['dataInserir'] == ''){
    $result = json_encode(array('success'=>'Preencha a Data!'));
    echo $result;
    exit();
  }
  
  if($postjson['horaInserir'] == ''){
    $result = json_encode(array('success'=>'Preencha a Hora!'));
    echo $result;
    exit();
  }

 
 $query_buscar = $pdo->query("SELECT * from programacao where data = '$postjson[dataInserir]' and hora = '$postjson[horaInserir]' and  igreja_distrito = '$postjson[igreja_distrito]'");
 $dados_buscar = $query_buscar->fetchAll(PDO::FETCH_ASSOC);
 if(@count($dados_buscar) > 0){
 	 $result = json_encode(array('success'=> 'Programação já Cadastrada!'));
 	 echo $result;
 	 exit();
 }else{
 	$query = $pdo->prepare("INSERT INTO programacao SET 
        nome = :nome ,
        image = :image,
        titulo_programacao = :titulo_programacao,
        descricao_programacao = :descricao_programacao,
        data = :data,
        hora = :hora,
        local = :local,
        igreja_distrito = :igreja_distrito");
  
       $query->bindValue(":nome", $postjson['nome']);
       $query->bindValue(":image", $postjson['image']);
       $query->bindValue(":titulo_programacao", $postjson['titulo_programacao']);
       $query->bindValue(":descricao_programacao", $postjson['descricao_programacao']);
       $query->bindValue(":data", $postjson['dataInserir']);
       $query->bindValue(":hora", $postjson['horaInserir']);
       $query->bindValue(":local", $postjson['local']);
       $query->bindValue(":igreja_distrito", $postjson['igreja_distrito']);


      
       $query->execute();
  
             
  
      if($query){
        $result = json_encode(array('success'=>true));
  
        }else{
        $result = json_encode(array('success'=>false));
    
        }

        echo $result;
 }

 
     


?>