<?php 

include_once('conexao.php');


$postjson = json_decode(file_get_contents("php://input"), true);
 
if($postjson['post'] == ''){
  $result = json_encode(array('success'=>'Preencha o Post!'));
  echo $result;
  exit();
}

 	$query = $pdo->prepare("INSERT INTO publicacao SET 
        nome = :nome,
        igreja_distrito = :igreja_distrito,
        post = :post,
        postImage = :postImage,
        image = :image,
        data_post = :data_post");
  
       $query->bindValue(":nome", $postjson['nome']);
       $query->bindValue(":igreja_distrito", $postjson['igreja_distrito']);
       $query->bindValue(":post", $postjson['post']);
       $query->bindValue(":postImage", $postjson['postImage']);
       $query->bindValue(":image", $postjson['image']);
       $query->bindValue(":data_post", $postjson['data_post']);
       $query->execute();
  
             
  
      if($query){
        $result = json_encode(array('success'=>true));
  
        }else{
        $result = json_encode(array('success'=>false));
    
        }

        echo $result;



?>