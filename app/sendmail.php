<?php
    use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	use PHPMailer\PHPMailer\SMTP;

    require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';


    $mail = new PHPMailer(true);
	$mail->isSMTP();                   // Отправка через SMTP
	$mail->Host   = 'smtp.mail.ru';  // Адрес SMTP сервера
	$mail->SMTPAuth   = true;          // Enable SMTP authentication
	$mail->Username   = 'baboshin20@inbox.ru';       // ваше имя пользователя 
	$mail->Password   = '26081990Dbnfkbq';    // ваш пароль
	$mail->SMTPSecure = 'ssl';         // шифрование ssl
	$mail->Port   = 465;   

    $mail->CharSet = 'UTf-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    //От кого письмо
    $mail->setFrom('baboshin20@inbox.ru','Пробная почта PHPMailer');
    //Кому отправить
    $mail->addAddress('vitaliy2@ro.ru');
    //Тема письма
    $mail->Subject = 'Привет! это я BrainLove';

    //Тело письма
    $body = '<h1>Очередное письмо!</h1>';

    if(trim(!empty($_POST['name']))) {
    	$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
	if(trim(!empty($_POST['subject']))) {
    	$body.='<p><strong>Предмет:</strong> '.$_POST['subject'].'</p>';
    }
    if(trim(!empty($_POST['tel']))) {
    	$body.='<p><strong>№-телефона:</strong> '.$_POST['tel'].'</p>';
    }
    if(trim(!empty($_POST['email']))) {
    	$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }
    
    $mail->Body = $body;

    if (!$mail->send()) {
    	$message = 'Ошибка';
    } else {
    	$message = 'Данные отправлены!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>

