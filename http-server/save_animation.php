<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    $file_url = 'test.mp4';
    header('Content-Type: application/octet-stream');
    header("Content-Transfer-Encoding: Binary"); 
    header("Content-disposition: attachment; filename=\"" . basename($file_url) . "\""); 

    echo phpversion();
    mkdir("frames");
    $path = 'frames/';
    if(isset($_POST['data']) && isset($_POST['i']) && is_numeric($_POST['i'])) {
        // split the data URL at the comma
        $data = explode(',', $_POST['data']);
        $number = $_POST['i'];
        // decode the base64 into binary data
        $data = base64_decode(trim($data[1]));
    
        // create the numbered image file
        $filename = sprintf('%spic%04d.png', $path, $_POST['i']);
        file_put_contents($filename, $data);
        if ($number == 1000){
            $command1="/usr/local/bin/ffmpeg -r 100 -f image2 -s 608x1080 -i frames/pic%04d.png -vcodec libx264 -crf 25 -pix_fmt yuv420p test.mp4";
            //command for every 1 second image change in video
            exec($command1);
            for (1;1000000;1) {}
            readfile($file_url); 
            echo 'Done!';
        }      
    }