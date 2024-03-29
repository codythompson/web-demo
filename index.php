<?php

/*
 * main index page - index.php
 *
 * creates the webpage using the makePage function from page.php, and the
 * information below as parameters to that function.
 */

require_once("page.php");

$title = "Web Demos";
$headerFile = "demoHeader.php";
$contentFile = null;
$footerFile = null;
$styleSheets = array("styles/demoStyles.css");
$scripts = null;

makePage($title, $headerFile, $contentFile, $footerFile, $styleSheets,
    $scripts);
?>
