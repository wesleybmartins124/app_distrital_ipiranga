<?php 

include_once('conexao.php');

$busca = $_GET['busca'];

if($busca == ''){
    exit();
  }

$query = $pdo->query("SELECT * from usuarios where id = '$busca'");

 $res = $query->fetchAll(PDO::FETCH_ASSOC);

 	for ($i=0; $i < count($res); $i++) { 
      foreach ($res[$i] as $key => $value) {
      }
 	
      $dados = array(
        'id' => $res[$i]['id'],
        'image' => $res[$i]['image'],
        'nome' => $res[$i]['nome'],
        'sobrenome' => $res[$i]['sobrenome'],
        'idade' => $res[$i]['idade'],
        'username' => $res[$i]['username'], 
        'email' => $res[$i]['email'],
        'senha' => $res[$i]['senha'],
        'igreja_distrito' => $res[$i]['igreja_distrito'],
        'cep_usuario' => $res[$i]['cep_usuario'],
        'endereco_usuario' => $res[$i]['endereco_usuario'],
        'bairro_usuario' => $res[$i]['bairro_usuario'],
        'cidade_usuario' => $res[$i]['cidade_usuario'],
        'lat' => $res[$i]['lat'],
        'lon' => $res[$i]['lon'],
        'nro_residencial_usuario' => $res[$i]['nro_residencial_usuario'],
        'rg_usuario' => $res[$i]['rg_usuario'],
        'nro_celular_usuario' => $res[$i]['nro_celular_usuario'],
        'nivel' => $res[$i]['nivel'],   
       
   
    );
      


 		}

        if(count($res) > 0){
            $result = json_encode(array('success'=>true, 'result'=>$dados));

            }else{
                $result = json_encode(array('success'=>false, 'result'=>'0'));

            }
            echo $result;

 ?>