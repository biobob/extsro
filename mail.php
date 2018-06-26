<?php
  header('Content-Type: text/xml');
  print("<root>");
  
  $name = empty($_POST['name']) ? NULL : $_POST['name'];
  $email = empty($_POST['email']) ? NULL : $_POST['email'];
  $content = empty($_POST['content']) ? NULL : $_POST['content'];
  
  if ($email === NULL) {
    print("<error field='email' />");
  }
  if ($content === NULL) {
    print("<error field='content' />");
  }
  if ($email !== NULL && $content !== NULL) {
    $message =
      "<html><body>" .
        "<h1>Kontaktný formulár z webovej stránky extsro.eu</h1>" .
        "<table>" .
          "<tr>" .
            "<td>Meno zákazníka:</td>" .
            "<td>" . ($name === NULL ? "&lt;nezadané&gt;" : ("<b>" . $name . "</b>")) . "</td>" .
          "</tr>" .
          "<tr>" .
            "<td>Spätný kontakt:</td>" .
            "<td><b>" . $email . "</b></td>" .
          "</tr>" .
          "<tr>" .
            "<td colspan='2'><br>Otázka:<td>" .
          "</tr>" .
          "<tr>" .
            "<td colspan='2'><br><b>". nl2br($content) . "</b></td>" .
          "</tr>" .
        "</table>" .
      "</body></html>";
    $headers = "From: webpage@extsro.eu\r\n";
    $headers .= "Reply-To: webpage@extsro.eu\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    if (mail("mail@extsro.eu", "Kontaktný formulár", $message, $headers)) {
      print("<success />");
    } else {
      print("<failure />");
    }
  }
  print("</root>");
?>
