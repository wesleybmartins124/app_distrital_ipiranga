<?php 

include_once('conexao.php');

$busca =  $_GET['busca'] ;

if($busca == ''){
    $busca ->query("SELECT * from programacao");
  }


$query = $pdo->query("SELECT * from programacao where data = '$busca' ORDER BY hora ASC");

 $res = $query->fetchAll(PDO::FETCH_ASSOC);

 	for ($i=0; $i < count($res); $i++) { 
      foreach ($res[$i] as $key => $value) {
      }

      $data = implode('/', array_reverse(explode('-', $res[$i]['data'])));

 		$dados[] = array(
 			'id' => $res[$i]['id'],
 			'nome' => $res[$i]['nome'],
            'image' => $res[$i]['image'],
			'titulo_programacao' => $res[$i]['titulo_programacao'],
            'descricao_programacao' => $res[$i]['descricao_programacao'],
            'data' => $data,
            'hora' => $res[$i]['hora'],
            'local' => $res[$i]['local'],
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