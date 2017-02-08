difference() {
    group() {
        difference() {
            cylinder(70, 40, 40);    
            cylinder(35, 30, 30);
            translate([0, 0, 30])
                sphere(30);
        }

        translate([-50, -6, 0])
        cube([20, 20, 70]);

        translate([-50, -6, 70])
        rotate([-10, 0, 0])
        
        difference() {
            cube([30, 20, 70]);
            translate([0, 5, 10])
            cube([15, 10, 70]);
        }
    }
    translate([-100, -7, 0])
    cube([100, 24, 20]);
}