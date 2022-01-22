<?php 

include_once('conexao.php');
$busca = '%'.$_GET['busca'].'%';

$query = $pdo->query("SELECT * from pedido where oracao LIKE '$busca' ORDER BY id DESC");

 $res = $query->fetchAll(PDO::FETCH_ASSOC);

 
 for ($i=0; $i < count($res); $i++) { 
    foreach ($res[$i] as $key => $value) {
    }

    $dados[] = array(
        'id' => $res[$i]['id'],
        'nome' => $res[$i]['nome'],
       'image' => $res[$i]['image'],
       'assunto' => $res[$i]['assunto'],
       'oracao' => $res[$i]['oracao'],
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