<?php

$array = [1,3,5,1,2,5,7,9,4,9,42,12,5,8,43,2,68,9,6,43,3567,6,5432,3,45676,54,3467,123,123,2,123];

for($i = 0;$i<count($array) - 1;$i++){
	for($j = 0;$j<count($array) - $i - 1;$j++){
		if($array[$j] > $array[$j + 1]){
			$temp = $array[$j];
			$array[$j] = $array[$j + 1];
			$array[$j + 1] = $temp;
		}
	}
}

echo implode(',',$array);
?>
