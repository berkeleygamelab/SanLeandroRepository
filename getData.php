<?php
   define('DB_NAME', 'CSV_DB');
define('DB_USER', 'admin_polar');
define('DB_PASSWORD', 'polar127');
define('DB_HOST', 'localhost');

$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

if(!$link) {
  die('Could not connect: ' . mysql_error());
}

$db_selected = mysql_select_db(DB_NAME, $link);

if (!$db_selected) {
  die('Can\'t use' . DB_NAME . ': ' . mysql_error());
}


    $myquery = "
    select * from fakeFive;
    ";

    $query = mysql_query($myquery);

    if ( ! $myquery ) {
        echo mysql_error();
        die;
    }

    $data = array();

    for ($x = 0; $x < mysql_num_rows($query); $x++) {
        $data[] = mysql_fetch_assoc($query);
    }

    echo json_encode($data);     

    mysql_close($server);
?>
