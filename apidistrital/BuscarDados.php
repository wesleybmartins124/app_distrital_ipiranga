<?php 

include_once('conexao.php');

$id = $_GET['busca'];

$res2 = $pdo->query("SELECT * FROM usuarios where id = '$id'");
$dados2 = $res2->fetchAll(PDO::FETCH_ASSOC);
$nome = $dados2[0]['nome'];
$sobrenome = $dados2[0]['sobrenome'];
$username = $dados2[0]['username'];
$email = $dados2[0]['email'];
$senha = $dados2[0]['senha'];
$igreja_distrito = $dados2[0]['igreja_distrito'];
$cep_usuario = $dados2[0]['cep_usuario'];
$endereco_usuario = $dados2[0]['endereco_usuario'];
$bairro_usuario = $dados2[0]['bairro_usuario'];
$cidade_usuario = $dados2[0]['cidade_usuario'];
$nro_residencial_usuario = $dados2[0]['nro_residencial_usuario'];
$rg_usuario = $dados2[0]['rg_usuario'];
$nro_celular_usuario = $dados2[0]['nro_celular_usuario'];
$nivel = $dados2[0]['nivel'];




$dados = array(
    'nome' => $nome,
    'sobrenome' => $sobrenome,
    'username' => $username, 
    'email' => $email,
    'senha' => $senha,
    'igreja_distrito' => $igreja_distrito,
    'cep_usuario' => $cep_usuario,
    'endereco_usuario' => $endereco_usuario,
    'bairro_usuario' => $bairro_usuario,
    'cidade_usuario' => $cidade_usuario,
    'nro_residencial_usuario' => $nro_residencial_usuario,
    'rg_usuario' => $rg_usuario,
    'nro_celular_usuario' => $nro_celular_usuario,
    'nivel' => $nivel,   
   

);
  
 		

        
 $result = json_encode(array('success'=>true, 'result'=>$dados));
 echo $result;

 ?>