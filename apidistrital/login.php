<?php 

include_once('conexao.php');

$postjson = json_decode(file_get_contents("php://input"), true);
 
 $query_buscar = $pdo->query("SELECT * from usuarios where email = '$postjson[email]' and senha = '$postjson[senha]' ");
 $dados_buscar = $query_buscar->fetchAll(PDO::FETCH_ASSOC);

 for ($i=0; $i < count($dados_buscar); $i++) { 
	foreach ($dados_buscar[$i] as $key => $value) {
	}
  
   $dados = array(
	 'id' => $dados_buscar[$i]['id'],
	 'image' => $dados_buscar[$i]['image'],
	 'nome' => $dados_buscar[$i]['nome'],
	 'sobrenome' => $dados_buscar[$i]['sobrenome'],
	 'username' => $dados_buscar[$i]['username'],
	 'email' => $dados_buscar[$i]['email'],
	 'senha' => $dados_buscar[$i]['senha'],
	 'igreja_distrito' => $dados_buscar[$i]['igreja_distrito'],
	 'cep_usuario' => $dados_buscar[$i]['cep_usuario'],
	 'endereco_usuario' => $dados_buscar[$i]['endereco_usuario'],
	 'bairro_usuario' => $dados_buscar[$i]['bairro_usuario'],
	 'cidade_usuario' => $dados_buscar[$i]['cidade_usuario'],
	 'nro_residencial_usuario' => $dados_buscar[$i]['nro_residencial_usuario'],
	 'rg_usuario' => $dados_buscar[$i]['rg_usuario'],
	 'nro_celular_usuario' => $dados_buscar[$i]['nro_celular_usuario'],
	 'nivel' => $dados_buscar[$i]['nivel'],
   );

}




 if(@count($dados_buscar) > 0){
 	 $result = json_encode(array('retorno'=>'Dados corretos!','obj'=>$dados));
 	 echo $result;
 	 
  }else{
	$result = json_encode(array('retorno'=>'Dados Incorretos!'));
	echo $result;
  }

 
?>