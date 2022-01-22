<?php 

include_once('conexao.php');

$busca = $_GET['busca'];

if($busca == ''){
    exit();
  }

$query = $pdo->query("SELECT * from interessados where id = '$busca'");

 $res = $query->fetchAll(PDO::FETCH_ASSOC);

 	for ($i=0; $i < count($res); $i++) { 
      foreach ($res[$i] as $key => $value) {
      }
 	
      $dados = array(
        'id' => $res[$i]['id'],
       'image' => $res[$i]['image'],
       'nome_completo' => $res[$i]['nome_completo'],
       'cep_int' => $res[$i]['cep_int'],
       'endereco' => $res[$i]['endereco'],
       'bairro' => $res[$i]['bairro'],
       'cidade' => $res[$i]['cidade'],
       'lat' => $res[$i]['lat'],
       'lon' => $res[$i]['lon'],
       'nro' => $res[$i]['nro'],
       'tel' => $res[$i]['tel'],
       'material' => $res[$i]['material'],
       'idade' => $res[$i]['idade'],
       'descricao' => $res[$i]['descricao'],
       'username' => $res[$i]['username'],
       'email_usuario' => $res[$i]['email_usuario'],
       'foto' => $res[$i]['foto'],
       'igreja_distrito' => $res[$i]['igreja_distrito'],
       
       
   
    );



 		}

        if(count($res) > 0){
            $result = json_encode(array('success'=>true, 'result'=>$dados));

            }else{
                $result = json_encode(array('success'=>false, 'result'=>'0'));

            }
            echo $result;

 ?>