<?php 

include_once('conexao.php');

$postjson = json_decode(file_get_contents("php://input"), true);

if($postjson['nome_completo'] == ''){
  $result = json_encode(array('success'=>'Preencha todos os campos!'));
  echo $result;
  exit();
}

if($postjson['cep_int'] == ''){
  $result = json_encode(array('success'=>'Preencha todos os campos!'));
  echo $result;
  exit();
}

if($postjson['lat'] == ''){
  $result = json_encode(array('success'=>'Preencha todos os campos!'));
  echo $result;
  exit();
}

if($postjson['lon'] == ''){
  $result = json_encode(array('success'=>'Preencha todos os campos!'));
  echo $result;
  exit();
}

if($postjson['idade'] == ''){
  $result = json_encode(array('success'=>'Preencha todos os campos!'));
  echo $result;
  exit();
}
     $query = $pdo->prepare("UPDATE interessados SET
     image = :image, 
     nome_completo = :nome_completo, 
     cep_int = :cep_int, 
     endereco = :endereco, 
     bairro = :bairro, 
     cidade = :cidade,
     lat = :lat, 
     lon =:lon,
     nro = :nro, 
     tel = :tel,
     material = :material,
     idade = :idade,
     descricao = :descricao,
     username = :username,
     email_usuario = :email_usuario,
     foto = :foto,     
     igreja_distrito = :igreja_distrito
     where id = :id");
 
      $query->bindValue(":image", $postjson['image']);
      $query->bindValue(":nome_completo", $postjson['nome_completo']);
      $query->bindValue(":cep_int", $postjson['cep_int']);
      $query->bindValue(":endereco", $postjson['endereco']);
      $query->bindValue(":bairro", $postjson['bairro']);
      $query->bindValue(":cidade", $postjson['cidade']);
      $query->bindValue(":lat", $postjson['lat']);
      $query->bindValue(":lon", $postjson['lon']);
      $query->bindValue(":nro", $postjson['nro']);
      $query->bindValue(":tel", $postjson['tel']);
      $query->bindValue(":material", $postjson['material']);
      $query->bindValue(":idade", $postjson['idade']);
      $query->bindValue(":descricao", $postjson['descricao']);
      $query->bindValue(":username", $postjson['username']);
      $query->bindValue(":email_usuario", $postjson['email_usuario']);
      $query->bindValue(":foto", $postjson['foto']);
      $query->bindValue(":igreja_distrito", $postjson['igreja_distrito']);
      $query->bindValue(":id", $postjson['id']);

      

     
      $query->execute();
 
            
 
     if($query){
       $result = json_encode(array('success'=>true));
 
       }else{
       $result = json_encode(array('success'=>false));
   
       }

       echo $result;

?>