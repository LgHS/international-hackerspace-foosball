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
difference(){
prism(38, 38, 38);

translate([0,3,34]) rotate([0,45,0]){
//Haut	
translate([5.75,2.75,-2]) cylinder(h=50, r=3);
translate([5.75,2.75,-11]) cylinder(h=10, r=5);
translate([5.75,29,-10]) cylinder(h=50, r=3);
translate([5.75,29,-11]) cylinder(h=10, r=5);
// Bas
translate([26,2.75,-19]) cylinder(h=100, r=3);
translate([26,2.75,-25]) cylinder(h=10, r=5);
translate([26,29,-19]) cylinder(h=100, r=3);
translate([26,29,-25]) cylinder(h=10, r=5);
}
}