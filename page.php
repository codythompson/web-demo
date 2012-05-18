<?php
/*
 * Creates a web page by adding all of the necessary HTML
 *
 * basically echos the information given from the parameters in appropriate
 * locations in an HTML shell.
 *
 * title - the title of the website
 *         placed inside the HTML title tag in the header
 *
 * headerFile - the file name of the HTML/PHP file that contains the
 *               header content of the page.
 *               NOTE: this is refering to content that should be displayed
 *               at the top of the page's body - NOT code that goes inside
 *               the <head> html element
 *
 * contentFile - the file name of the HTML/PHP file that contains the content
 *               of the page.
 *
 * footerFile - the file name of the HTML/PHP file that contains the footer
 *              content of the page.
 *
 * styleSheets - an array of css filenames to be added to the HTML header
 *
 * scripts - an array of javascript filenames to be added to the HTML header
 */
function makePage ($title, $headerFile, $contentFile, $footerFile, $styleSheets,
    $scripts) {

    //header section of the HTML
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

  <title><?php echo $title; ?></title>

<?php

    //if styleSheets != null then iterate through the array
    //adding link elements for every style sheet file name in the array
    if ($styleSheets) {
        foreach ($styleSheets as $ssFileName) {
?>
    <link rel="stylesheet" href="<?php echo $ssFileName; ?>" type="text/css" />
<?php
        } //end style sheets loop
    } //end styleSheets null check

    //if scripts != null then iterate over the array
    //adding script elements for every script file name in the array
    if ($scripts) {
        foreach ($scripts as $scriptFileName) {
?>
    <script src="<?php echo $scriptFileName; ?>" type="text/javascript">
    </script>
<?php
        } //end scripts loop
    } //end scripts null check
?>

</head>

<body>

<div id="main-container">

<?php
    //add the header content file if the file name isn't null
    if ($headerFile) {
        require($headerFile);
    }

    //add the page's content file if the file name isn't null
    if ($contentFile) {
        require($contentFile);
    }

    //add the footer content file if the file name isn't null
    if ($footerFile) {
        require($footerFile);
    }
?>

</div>
<!-- end of main-container -->

</body>

</html>

<?php
} //end of makePage function
?>
