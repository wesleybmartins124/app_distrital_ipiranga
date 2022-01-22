<?php 

include_once('conexao.php');


$postjson = json_decode(file_get_contents("php://input"), true);
 
if($postjson['oracao'] == ''){
  $result = json_encode(array('success'=>'Preencha o pedido de oração!'));
  echo $result;
  exit();
}
if($postjson['assunto'] == ''){
  $result = json_encode(array('success'=>'Preencha o assunto!'));
  echo $result;
  exit();
}

 	$query = $pdo->prepare("INSERT INTO pedido SET 
        nome = :nome,
        image = :image,
        assunto = :assunto,
        oracao = :oracao,
        igreja_distrito = :igreja_distrito");
  
       $query->bindValue(":nome", $postjson['nome']);
       $query->bindValue(":image", $postjson['image']);
       $query->bindValue(":assunto", $postjson['assunto']);
       $query->bindValue(":oracao", $postjson['oracao']);
       $query->bindValue(":igreja_distrito", $postjson['igreja_distrito']);
       $query->execute();
  
             
  
       if($query){
         $result = json_encode(array('success'=>true));
   
         }else{
         $result = json_encode(array('success'=>false));
     
         }
 
         echo $result;
 
 
 
 ?>
