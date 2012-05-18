/* 
 * calls all of the functions that need to be called when the page is loaded
 */
function callOnLoad() {
    //sets up the slider
    slider_newSlider("slider", 256, 5, 0);
}

//sets the window's onload function to be the function above
window.onload = callOnLoad;
