<?php 

include_once('conexao.php');
$busca = '%'.$_GET['busca'].'%';

$query = $pdo->query("SELECT * from publicacao where post LIKE '$busca' ORDER BY id Desc");

 $res = $query->fetchAll(PDO::FETCH_ASSOC);

 
 for ($i=0; $i < count($res); $i++) { 
    foreach ($res[$i] as $key => $value) {
    }

 		$dados[] = array(
 			'id' => $res[$i]['id'],
            'image' => $res[$i]['image'],
 			'nome' => $res[$i]['nome'],
            'igreja_distrito' => $res[$i]['igreja_distrito'],
            'post' => $res[$i]['post'],
            'postImage' => $res[$i]['postImage'],
            'data_post' => $res[$i]['data_post'],
            
        
 		);

 		}

        if(count($res) > 0){
                $result = json_encode(array('success'=>true, 'result'=>$dados));

            }else{
                $result = json_encode(array('success'=>false, 'result'=>'0'));

            }
            echo $result;

 ?>