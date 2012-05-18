var slider_defaultBaseId = "slider1";
var slider_defaultWidth = 288;
var slider_defaultCount = 6;
var slider_defaultStartPos = 0;

var slider_objs = new Array();

var slider_curAni = false;

var slider_updateInterval = 17;
var slider_updateDeltaX = 24;

function slider_newSlider(baseId, width, count, pos) {
  var slider_obj = new Object();
  slider_obj.baseId = baseId;
  slider_obj.width = width;
  slider_obj.count = count;
  slider_obj.pos = pos;

  slider_objs.push(slider_obj);

  slider_move(slider_obj);
}

function slider_animation (slider_ix, delt) {
  this.prog = 0;

  this.update = function () {
    this.prog += delt;
    var done = false;
    if (delt >= 0) {
      if (this.prog >= slider_objs[slider_ix].width) {
        delt -= this.prog - slider_objs[slider_ix].width;
        done = true;
      }
    } else if (this.prog <= 0 - slider_objs[slider_ix].width) {
      delt -= this.prog + slider_objs[slider_ix].width;
      done = true;
    }
    slider_objs[slider_ix].pos += delt;
    var slider_obj = slider_objs[slider_ix];
    slider_move(slider_obj);

    if (!done) {
      setTimeout("slider_curAni.update()", slider_updateInterval);
    } else {
      slider_curAni = false;
    }
  }
}

function slider_intToPx (num) {
  num = Number(num);
  num = num.toString();
  return num + 'px';
}

function slider_getItemId (baseId, itemIx) {
  var eleId = new Number(itemIx);
  eleId = baseId + '-' + eleId.toString();
  return eleId;
}

function slider_left (slider_ix) {
  var slider_obj = slider_objs[slider_ix];
  if (!slider_curAni) {
    slider_curAni = new slider_animation (slider_ix, slider_updateDeltaX);
    slider_curAni.update()
  }
}

function slider_right (slider_ix) {
  var slider_obj = slider_objs[slider_ix];
  if (!slider_curAni) {
    slider_curAni = new slider_animation (slider_ix, 0 - slider_updateDeltaX);
    slider_curAni.update()
  }
}

function slider_move(slider_obj) {
  var i = 0;
  for (i = 0; i < slider_obj.count; i++) {
    var pos = (i * slider_obj.width) + slider_obj.pos;
    pos = slider_intToPx(pos);
    var eleId = slider_getItemId(slider_obj.baseId, i);
    document.getElementById(eleId).style.left = pos;
  }
  if (slider_obj.pos > 0) {
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

    slider_obj.pos = slider_obj.pos - slider_obj.width;
  }
  if (slider_obj.pos <= 0 - slider_obj.width) {
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
    slider_obj.pos = slider_obj.pos + slider_obj.width;
  }
}

function slider_defaultSetup () {
  slider_newSlider(slider_defaultBaseId, slider_defaultWidth,
          slider_defaultCount, slider_defaultStartPos);
}
