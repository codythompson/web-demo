<?php
require_once("page.php");

$title = "Web Demos";
$headerFile = "demoHeader.php";
$contentFile = "sliderContent.php";
$footerFile = null;
$styleSheets = array("styles/demoStyles.css", "styles/sliderStyles.css");
$scripts = array("scripts/slider.js", "scripts/onloadScripts.js");

makePage($title, $headerFile, $contentFile, $footerFile, $styleSheets,
    $scripts);
?>
