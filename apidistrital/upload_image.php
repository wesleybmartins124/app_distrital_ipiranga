<?php
    move_uploaded_file($_FILES['photo']['tmp_name'], 'http://distritalipiranga.website/apidistrital/photo/' . $_FILES['photo']['name']);
?>