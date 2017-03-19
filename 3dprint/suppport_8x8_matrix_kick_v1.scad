$fn = 300;
module prism(l, w, h) {
       polyhedron(points=[
               [0,0,h],           // 0    front top corner
               [0,0,0],[w,0,0],   // 1, 2 front left & right bottom corners
               [0,l,h],           // 3    back top corner
               [0,l,0],[w,l,0]    // 4, 5 back left & right bottom corners
       ], faces=[ // points for all faces must be ordered clockwise when looking in
               [0,2,1],    // top face
               [3,4,5],    // base face
               [0,1,4,3],  // h face
               [1,2,5,4],  // w face
               [0,3,5,2],  // hypotenuse face
       ]);
}

prism(34, 34, 34);

translate([0,1,34]) rotate([0,45,0]){
translate([5.75,2.75,0]) cylinder(h=7, r1=3, r2=2.5);
translate([5.75,29,0]) cylinder(h=7, r1=3, r2=2.5);
translate([26,2.75,0]) cylinder(h=7, r1=3, r2=2.5);
translate([26,29,0]) cylinder(h=7, r1=3, r2=2.5);
}