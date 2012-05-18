//an array of objects that perform operations on HTML elements to make them
//appear as if they 'slide' to the left or right
var slider_objs = new Array();

//if a slider is being animated, this var will store the animation object that
//is handling the animation. This var is false otherwise
var slider_curAni = false;

//the amount of time (in milliseconds) to let pass before moving to the next
//animation frame
var slider_updateInterval = 17;

//the length to shift the items by per frame/update (in pixels)
var slider_updateDeltaX = 24;

/*
 * utility functions
 */
/*
 * returns a string representation of the parameter with 'px' added to the end.
 */
function slider_intToPx (num) {
  num = Number(num);
  num = num.toString();
  return num + 'px';
}

/*
 * returns an item id string based on the given base id and index
 */
function slider_getItemId (baseId, itemIx) {
  var eleId = new Number(itemIx);
  eleId = baseId + '-' + eleId.toString();
  return eleId;
}

/*
 * Core functionality
 */
/*
 * creates a new slider object
 * A slider object will change the position of a set of absolutely positioned
 * HTML elements to make them appear as if they are sliding to the left or right
 *
 * params:
 *
 * baseId -
 * the elements that will be moved in the sliding fashion must be children of an
 * element with an id name equal to 'baseId' followed by a hyphen, and an index
 * number (starting at 0).
 * Example:
 * if there were 5 elements/items that belonged to the slider,
 * and the parent div's id name was 'my-slider'
 * the individual slider items' id names would be as follows:
 * 'my-slider-0'
 * 'my-slider-1'
 * 'my-slider-2'
 * 'my-slider-3'
 * 'my-slider-4'
 *
 * width -
 * the width of a single slider element/item in pixels
 * NOTE: the slider elements/items must have the same width
 *
 * count -
 * the number of elements/items the slider will be controlling
 *
 * pos -
 * the position (in pixels) that the left-most visible slider item should be
 * drawn at.
 */
function slider_newSlider(baseId, width, count, pos) {
  //initializes the object
  var slider_obj = new Object();
  slider_obj.baseId = baseId;
  slider_obj.width = width;
  slider_obj.count = count;
  slider_obj.pos = pos;

  slider_objs.push(slider_obj);

  slider_move(slider_obj);
}

/*
 * creates a new animation object that handles moving the objects in a smooth
 * looking fashion.
 *
 * slider_ix - 
 * the index number of the slider that should be animated
 *
 * delt -
 * the amount in pixels the slider elements/items should be moved by per 
 * animation frame/update
 */
function slider_animation (slider_ix, delt) {
  //progress towards completion of the animation
  this.prog = 0;

  //updates the animation
  this.update = function () {
    //adds the change specified to progress
    this.prog += delt;

    //done will be true if this animation has completed - AKA progress >= width
    //of a slider element/item
    var done = false;

    //if going right
    if (delt >= 0) {
      //and the total amount moved is greater than the width of a single item
      if (this.prog >= slider_objs[slider_ix].width) {
        //reset delt so that when added to prog, prog will equal exactly the
        //width of one item
        delt -= this.prog - slider_objs[slider_ix].width;
        done = true;
      }
    //if going left and the total amount moved is more than the width of a
    //single item
    } else if (this.prog <= 0 - slider_objs[slider_ix].width) {
      //reset delt so that when added to prog, prog will equal exactly the
      //width of one item
      delt -= this.prog + slider_objs[slider_ix].width;
      done = true;
    }

    //change the position of the slider object based on the value of delt then
    //move tell the slider object to move its items appropriately
    slider_objs[slider_ix].pos += delt;
    var slider_obj = slider_objs[slider_ix];
    slider_move(slider_obj);

    //if we're not done yet, set a timer to call update again
    if (!done) {
      setTimeout("slider_curAni.update()", slider_updateInterval);
    //else set the current animation to false
    } else {
      slider_curAni = false;
    }
  }
}

/*
 * Should be called after a slider object's position has been changed.
 *
 * Changes the absolute position of all items belonging to the slider object
 * based on the slider objects 'pos' value.
 *
 * if the slider obj's pos value is > 0
 *  - the slider items are reordered so the last slider item becomes the first
 *
 * if the slider obj's pos value is less than one item width less than zero
 *  - the slider items are reordered so the first slider item becomes the last
 */
function slider_move(slider_obj) {
  //if the slider_obj position is > 0, it's time to re-order everything.
  if (slider_obj.pos > 0) {
      
    //this loops renames every item's id to reflect the change in ordering
    var eleId = slider_getItemId(slider_obj.baseId, 0);
    document.getElementById(eleId).id = "slider_temp";

    for (i = 0; i < slider_obj.count - 1; i++) {
      var ele = document.getElementById("slider_temp");
      eleId = slider_getItemId(slider_obj.baseId, i + 1);
      document.getElementById(eleId).id = "slider_temp";
      ele.id = eleId;
    }

    document.getElementById("slider_temp").id =
        slider_getItemId(slider_obj.baseId, 0);

    //resets the slider_obj's position.
    slider_obj.pos = slider_obj.pos - slider_obj.width;
  }

  //if the slider_obj position less than one items width less than zero
  //it's time to re-order everything.
  else if (slider_obj.pos <= 0 - slider_obj.width) {

    //this loop renames every item's id to reflect the change in ordering
    var eleId = slider_getItemId(slider_obj.baseId, slider_obj.count - 1);
    document.getElementById(eleId).id = "slider_temp";

    for (i = slider_obj.count - 1; i > 0; i--) {
      var ele = document.getElementById("slider_temp");
      eleId = slider_getItemId(slider_obj.baseId, i - 1);
      document.getElementById(eleId).id = "slider_temp";
      ele.id = eleId;
    }

    document.getElementById("slider_temp").id =
        slider_getItemId(slider_obj.baseId, slider_obj.count - 1);

    //resets the slider_obj's position
    slider_obj.pos = slider_obj.pos + slider_obj.width;
  }

  //sets the absolute position of every item the slider is in charge of
  var i = 0;
  for (i = 0; i < slider_obj.count; i++) {
    var pos = (i * slider_obj.width) + slider_obj.pos;
    pos = slider_intToPx(pos);
    var eleId = slider_getItemId(slider_obj.baseId, i);
    document.getElementById(eleId).style.left = pos;
  }
}

/*
 * Interface functions
 * 
 * The following functions are how the buttons interface with this script
 */
/*
 * Starts an animation that moves all of the elements/items of the given slider
 * one item-width to the left.
 */
function slider_left (slider_ix) {
  var slider_obj = slider_objs[slider_ix];
  if (!slider_curAni) {
    slider_curAni = new slider_animation (slider_ix, slider_updateDeltaX);
    slider_curAni.update()
  }
}

/*
 * Starts an animation that moves all of the elements/items of the given slider
 * one item-width to the right.
 */
function slider_right (slider_ix) {
  var slider_obj = slider_objs[slider_ix];
  if (!slider_curAni) {
    slider_curAni = new slider_animation (slider_ix, 0 - slider_updateDeltaX);
    slider_curAni.update()
  }
}
