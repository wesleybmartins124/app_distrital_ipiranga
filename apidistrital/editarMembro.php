<?php 

include_once('conexao.php');

$postjson = json_decode(file_get_contents("php://input"), true);



     $query = $pdo->prepare( " UPDATE usuarios SET
    image = :image, 
     nome = :nome, 
     sobrenome = :sobrenome,
     idade = :idade,
     username = :username, 
     email = :email, 
     senha = :senha, 
     cep_usuario = :cep_usuario,
     endereco_usuario = :endereco_usuario, 
     bairro_usuario =:bairro_usuario,
     cidade_usuario = :cidade_usuario, 
     lat = :lat, 
     lon = :lon, 
     nro_residencial_usuario = :nro_residencial_usuario,
     rg_usuario = :rg_usuario,
     nro_celular_usuario = :nro_celular_usuario,
     igreja_distrito = :igreja_distrito,
     nivel = :nivel
     where id = :id");
 
      $query->bindValue(":image", $postjson['image']);
      $query->bindValue(":nome", $postjson['nome']);
      $query->bindValue(":sobrenome", $postjson['sobrenome']);
      $query->bindValue(":idade", $postjson['idade']);
      $query->bindValue(":username", $postjson['username']);
      $query->bindValue(":email", $postjson['email']);
      $query->bindValue(":senha", $postjson['senha']);
      $query->bindValue(":cep_usuario", $postjson['cep_usuario']);
      $query->bindValue(":endereco_usuario", $postjson['endereco_usuario']);
      $query->bindValue(":bairro_usuario", $postjson['bairro_usuario']);
      $query->bindValue(":cidade_usuario", $postjson['cidade_usuario']);
      $query->bindValue(":lat", $postjson['lat']);
      $query->bindValue(":lon", $postjson['lon']);
      $query->bindValue(":nro_residencial_usuario", $postjson['nro_residencial_usuario']);
      $query->bindValue(":rg_usuario", $postjson['rg_usuario']);
      $query->bindValue(":nro_celular_usuario", $postjson['nro_celular_usuario']);
      $query->bindValue(":igreja_distrito", $postjson['igreja_distrito']);
      $query->bindValue(":nivel", $postjson['nivel']);
      $query->bindValue(":id", $postjson['id']);

      

     
      $query->execute();
 
            
 
     if($query){
       $result = json_encode(array('success'=>true));
 
       }else{
       $result = json_encode(array('success'=>false));
   
       }

       echo $result;

?>