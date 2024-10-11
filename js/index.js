function addLineY(yPos, domElement) {
  // Get the SVG element (or any other DOM element passed as argument)
  const svg = domElement;

  const svgWidth = svg.clientWidth;

  // Create a new line element
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

  // Set the attributes for the line
  line.setAttribute('x1', 0);           // Start at x=0
  line.setAttribute('y1', yPos);        // Vertical position (yPos from input)
  line.setAttribute('x2', svgWidth);    // End at full SVG width
  line.setAttribute('y2', yPos);        // Vertical position (yPos from input)
  line.setAttribute('stroke', 'black'); // Line color
  line.setAttribute('stroke-width', 2); // Line width

  // Append the line to the SVG element
  svg.appendChild(line);
}

function addLineX(yPos, domElement) {
  // Get the SVG element (or any other DOM element passed as argument)
  const svg = domElement;

  const svgWidth = svg.clientHeight;

  // Create a new line element
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

  // Set the attributes for the line
  line.setAttribute('x1', yPos);           // Start at x=0
  line.setAttribute('y1', 0);        // Vertical position (yPos from input)
  line.setAttribute('x2', yPos);    // End at full SVG width
  line.setAttribute('y2', svgWidth);        // Vertical position (yPos from input)
  line.setAttribute('stroke', 'black'); // Line color
  line.setAttribute('stroke-width', 2); // Line width

  // Append the line to the SVG element
  svg.appendChild(line);
}

function draw_debug_svg(event){
  //console.log('?');
  var row=event.target.closest('tr');
  // Get the first 4 td elements (index 0-3)
  let tdElementsX = row.querySelectorAll('td:nth-child(-n+4)');
  tdElementsX.forEach((td, index) => {
    addLineX(parseFloat(td.innerText), document.querySelector('#gd > div > div > svg:nth-child(1) > g.sankey > g.sankey-links'));
  });

  // Get the next 4 td elements (index 4-7)
  let tdElementsY = row.querySelectorAll('td:nth-child(n+5):nth-child(-n+8)');
  tdElementsY.forEach((td, index) => {
    addLineY(parseFloat(td.innerText), document.querySelector('#gd > div > div > svg:nth-child(1) > g.sankey > g.sankey-links'));
  });
}

function processTable(innerHtmlString) {
  // Parse the input HTML string to a DOM structure
  let container = document.createElement('div');
  container.innerHTML = innerHtmlString;
  
  // Get the table rows
  let rows = container.querySelectorAll('tr');
  
  // Loop through each row and modify it
  rows.forEach(row => {
    // Create a new <td> with a button and append to the row
    let buttonTd = document.createElement('td');
    let button = document.createElement('button');
    button.textContent = 'Process';
    button.setAttribute('onclick','draw_debug_svg(event)');
    
    // Append the button to the new td
    buttonTd.appendChild(button);
    
    // Append the td to the row
    row.appendChild(buttonTd);
  });

  // Return the modified HTML as a string
  return container.innerHTML;
}


const newEnum = (descriptions) => {
  const result = {};
  Object.keys(descriptions).forEach((description) => {
    result[result[description] = descriptions[description]] = description;
  });
  return Object.freeze(result);
};

const l5 = newEnum({
  ll: 1,
  ul: 2,
  dl:3,
  lu:4,
  ld:5
});

const elementary_school_mathematics_XY = newEnum({
  x:1,y:2
});

const ctrl_anchor_is_same = newEnum({
  y:1,n:2
});

function given_a_point_and_find_anchor_given_XY_same_or_not(pt,xs,ys,pt4){
  return {x:(xs===ctrl_anchor_is_same.y?pt.x:
    elementary_school_mathematics_avg(pt4,elementary_school_mathematics_XY.x)
  ),y:(ys===ctrl_anchor_is_same.y?pt.y:
    elementary_school_mathematics_avg(pt4,elementary_school_mathematics_XY.y)
  )};
}

function master_smart_ro(xl,xr,ylu,yld,yru,yrd,r){
  var length_l = yld-ylu;
  var length_r = yrd-yru;
  switch (r) {
    case l5.ll: {
//console.log("l5.ll");
return {ls:{x:xl,y:ylu},
        le:{x:xl,y:yld},
        rs:{x:xr,y:yru},
        re:{x:xr,y:yrd}
      };
      break;
    }
    case l5.ul: {
      //console.log("l5.ul");
      return {le:{x:xl,y:ylu},
        ls:{x:xl-length_l,y:ylu},//!important! TODO:我不確定他如果<0會怎樣?
        rs:{x:xr,y:yru},
        re:{x:xr,y:yrd}
      };
      break;
    }
    case l5.dl: {
      //console.log("l5.dl");
      return {le:{x:xl,y:yld},
        ls:{x:xl-length_l,y:yld},//!important! TODO:我不確定他如果<0會怎樣?
        rs:{x:xr,y:yru},
        re:{x:xr,y:yrd}
      };
      break;
    }
    case l5.lu: {
      //console.log("l5.lu");
      return {ls:{x:xl,y:ylu},
      le:{x:xl,y:yld},
      re:{x:xr+length_r,y:yru},//!important! TODO:我不確定他如果大於邊界會怎樣?
        rs:{x:xr,y:yru}
      };
      break;
    }
    case l5.ld: {
      //console.log("l5.ld");
      return {ls:{x:xl,y:ylu},
      le:{x:xl,y:yld},
        re:{x:xr+length_r,y:yrd},//!important! TODO:我不確定他如果大於邊界會怎樣?
        rs:{x:xr,y:yrd}
      };
      break;
    }
    default: {
      //console.log("default");
      return {ls:{x:0,y:0},
        le:{x:0,y:0},
        rs:{x:0,y:0},
        re:{x:0,y:0}
      };
      break;
    }
  }
}

function bexierCurveString(m_point,ctrl_of_m_point,ctrl_of_ur_point,ur_point,dr_point,ctrl_of_dr_point,ctrl_of_z_point,z_point){
  return `M${m_point.x},${m_point.y}C${ctrl_of_m_point.x},${ctrl_of_m_point.y} ${ctrl_of_ur_point.x},${ctrl_of_ur_point.y} ${ur_point.x},${ur_point.y}L${dr_point.x},${dr_point.y}C${ctrl_of_dr_point.x},${ctrl_of_dr_point.y} ${ctrl_of_z_point.x},${ctrl_of_z_point.y} ${z_point.x},${z_point.y}Z`;
}

function elementary_school_mathematics_avg(entity_of_master_smart_ro,avg_set_XY){
  switch (avg_set_XY) {
    case elementary_school_mathematics_XY.x: {
      return (entity_of_master_smart_ro.ls.x+entity_of_master_smart_ro.le.x+entity_of_master_smart_ro.rs.x+entity_of_master_smart_ro.re.x)/4;
      break;}
    case elementary_school_mathematics_XY.y: {
      return (entity_of_master_smart_ro.ls.y+entity_of_master_smart_ro.le.y+entity_of_master_smart_ro.rs.y+entity_of_master_smart_ro.re.y)/4;
      break;}
    default: {
      return 0;
      break;}
  }
}

function bexierCurve(xl,xr,ylu,yld,yru,yrd,r){
var real_master_smart_ro = master_smart_ro(xl,xr,ylu,yld,yru,yrd,r);
var m_point = {x:0,y:0};
var ctrl_of_m_point = {x:0,y:0};
var ctrl_of_ur_point = {x:0,y:0};
var ur_point = {x:0,y:0};
var dr_point = {x:0,y:0};
var ctrl_of_dr_point = {x:0,y:0};
var ctrl_of_z_point = {x:0,y:0};
var z_point = {x:0,y:0};

switch (r) {
  case l5.ll: {
//console.log("l5.ll");
m_point=real_master_smart_ro.ls;
ctrl_of_m_point=given_a_point_and_find_anchor_given_XY_same_or_not(m_point,ctrl_anchor_is_same.n,ctrl_anchor_is_same.y,real_master_smart_ro);
ur_point=real_master_smart_ro.rs;
ctrl_of_ur_point=given_a_point_and_find_anchor_given_XY_same_or_not(ur_point,ctrl_anchor_is_same.n,ctrl_anchor_is_same.y,real_master_smart_ro);
dr_point=real_master_smart_ro.re;
ctrl_of_dr_point=given_a_point_and_find_anchor_given_XY_same_or_not(dr_point,ctrl_anchor_is_same.n,ctrl_anchor_is_same.y,real_master_smart_ro);
z_point=real_master_smart_ro.le;
ctrl_of_z_point=given_a_point_and_find_anchor_given_XY_same_or_not(z_point,ctrl_anchor_is_same.n,ctrl_anchor_is_same.y,real_master_smart_ro);
    break;
  }
  case l5.ul: {
    //console.log("l5.ul");
    m_point=real_master_smart_ro.le;
    ctrl_of_m_point=given_a_point_and_find_anchor_given_XY_same_or_not(m_point,ctrl_anchor_is_same.y,ctrl_anchor_is_same.n,real_master_smart_ro);
    ur_point=real_master_smart_ro.rs;
    ctrl_of_ur_point=given_a_point_and_find_anchor_given_XY_same_or_not(ur_point,ctrl_anchor_is_same.n,ctrl_anchor_is_same.y,real_master_smart_ro);
    dr_point=real_master_smart_ro.re;
    ctrl_of_dr_point=given_a_point_and_find_anchor_given_XY_same_or_not(dr_point,ctrl_anchor_is_same.n,ctrl_anchor_is_same.y,real_master_smart_ro);
    z_point=real_master_smart_ro.ls;
    ctrl_of_z_point=given_a_point_and_find_anchor_given_XY_same_or_not(z_point,ctrl_anchor_is_same.y,ctrl_anchor_is_same.n,real_master_smart_ro);
    break;
  }
  case l5.dl: {
    //console.log("l5.dl");
    m_point=real_master_smart_ro.ls;
    ctrl_of_m_point=given_a_point_and_find_anchor_given_XY_same_or_not(m_point,ctrl_anchor_is_same.y,ctrl_anchor_is_same.n,real_master_smart_ro);
    ur_point=real_master_smart_ro.rs;
    ctrl_of_ur_point=given_a_point_and_find_anchor_given_XY_same_or_not(ur_point,ctrl_anchor_is_same.n,ctrl_anchor_is_same.y,real_master_smart_ro);
    dr_point=real_master_smart_ro.re;
    ctrl_of_dr_point=given_a_point_and_find_anchor_given_XY_same_or_not(dr_point,ctrl_anchor_is_same.n,ctrl_anchor_is_same.y,real_master_smart_ro);
    z_point=real_master_smart_ro.le;
    ctrl_of_z_point=given_a_point_and_find_anchor_given_XY_same_or_not(z_point,ctrl_anchor_is_same.y,ctrl_anchor_is_same.n,real_master_smart_ro);
    break;
  }
  case l5.lu: {
    //console.log("l5.lu");
    m_point=real_master_smart_ro.ls;
    ctrl_of_m_point=given_a_point_and_find_anchor_given_XY_same_or_not(m_point,ctrl_anchor_is_same.n,ctrl_anchor_is_same.y,real_master_smart_ro);
    ur_point=real_master_smart_ro.rs;
    ctrl_of_ur_point=given_a_point_and_find_anchor_given_XY_same_or_not(ur_point,ctrl_anchor_is_same.y,ctrl_anchor_is_same.n,real_master_smart_ro);
    dr_point=real_master_smart_ro.re;
    ctrl_of_dr_point=given_a_point_and_find_anchor_given_XY_same_or_not(dr_point,ctrl_anchor_is_same.y,ctrl_anchor_is_same.n,real_master_smart_ro);
    z_point=real_master_smart_ro.le;
    ctrl_of_z_point=given_a_point_and_find_anchor_given_XY_same_or_not(z_point,ctrl_anchor_is_same.n,ctrl_anchor_is_same.y,real_master_smart_ro);
    break;
  }
  case l5.ld: {
    //console.log("l5.ld");
    m_point=real_master_smart_ro.ls;
    ctrl_of_m_point=given_a_point_and_find_anchor_given_XY_same_or_not(m_point,ctrl_anchor_is_same.n,ctrl_anchor_is_same.y,real_master_smart_ro);
    ur_point=real_master_smart_ro.re;
    ctrl_of_ur_point=given_a_point_and_find_anchor_given_XY_same_or_not(ur_point,ctrl_anchor_is_same.y,ctrl_anchor_is_same.n,real_master_smart_ro);
    dr_point=real_master_smart_ro.rs;
    ctrl_of_dr_point=given_a_point_and_find_anchor_given_XY_same_or_not(dr_point,ctrl_anchor_is_same.y,ctrl_anchor_is_same.n,real_master_smart_ro);
    z_point=real_master_smart_ro.le;
    ctrl_of_z_point=given_a_point_and_find_anchor_given_XY_same_or_not(z_point,ctrl_anchor_is_same.n,ctrl_anchor_is_same.y,real_master_smart_ro);
    break;
  }
  default: {
    //console.log("default");
    break;
  }
}

return bexierCurveString(m_point,ctrl_of_m_point,ctrl_of_ur_point,ur_point,dr_point,ctrl_of_dr_point,ctrl_of_z_point,z_point);
}


$(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
  });