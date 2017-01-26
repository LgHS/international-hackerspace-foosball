$fn = 300;
difference(){

cylinder(h=30, r1=16, r2=10, center=true);
	
translate ([0,0,15]) {
rotate([0,45,0]){
cube([10,100,10], center=true);
}
}
}