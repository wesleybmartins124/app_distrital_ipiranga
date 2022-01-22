<?php
// Storing vars from post
$fileName = $_POST['fileName'];
$fileType = $_POST['fileType'];
$uploaderID = $_POST['uploaderID'];

// Upload DOMCdataSection
$dateInfo = getdate();
$year = $dateInfo['year'];
$month = $dateInfo['mon'];
$date = $dateInfo['mday'];


$uploadDate = "$year-$month-$date";
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' and password) */
ini_set('display_errors', 1);
$link = mysqli_connect('localhost', 'u255125764_districtipirng', '0/yP]AGpM&oppipwz', 'u255125764_bd_distrital');

// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Attempt insert query execution
$sql = "INSERT INTO test (name, type, uploader, uploadDate) VALUES ('$fileName', '$fileType', '$uploaderID', '$uploadDate')";
if(mysqli_query($link, $sql)){
    echo "Records inserted successfully.";
    echo "fileName, uploaderID: ";
    echo "$fileName";
    echo $uploaderID;
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}

// Close connection
mysqli_close($link);
?>