<?php
require_once("page.php");

$title = "Web Demos";
$headerFile = "demoHeader.php";
$contentFile = null;
$footerFile = null;
$styleSheets = array("styles/demoStyles.css");
$scripts = array("scripts/slider.js");

makePage($title, $headerFile, $contentFile, $footerFile, $styleSheets, $scripts);
?>
