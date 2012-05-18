<?php

/*
 * creates the webpage using the makePage function from page.php, and the
 * information below as parameters to that function.
 */

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
