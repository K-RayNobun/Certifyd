import Debug "mo:base/Debug"

actor {

  let z = do {
    var x = 1;
    let y = x + 1;
    x * y + x;
  };

  Debug.print(debug_show(z));
}



















/*
Improtant conceppts to knowin Motoko:
  - Declarations: Used in Motoko to refer to immutable variables, mutable states,
     objects, actors, classes and other data types.
  - Expression: Describes computations involving declarations
  - Program: The collection of boths
  - Value: an entity that can be manipulated by a program
  - Variable
  - Types
*/
