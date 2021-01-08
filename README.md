# Toy Robot Program

This program simulates a toy robot on a 5x5 grid when given a text file containing commands for the robot.
Results will be printed in the terminal.

## Running

Download or clone the repository, run `npm install`, then run `npm run start <FILE>` where `<FILE>` is the name of the txt document that contains a list of moves, e.g. `moveeast.txt`. The output will be printed to stdout.

## Test files

- movenorth.txt: Should move the Y location by +1, and output "X: 0, Y: 1, Facing: NORTH"
- movesouth.txt: Should move the Y location by -1, which is an invalid input and therefore the output should be "X: 0, Y: 0, Facing: SOUTH"
- moveeast.txt: Should move the X location by +1, with the output "X: 1, Y: 0, Facing: EAST"
- movewest.txt: Should move the X location by -1, which is an invalid input therefore the output should be "X: 0, Y: 0, Facing: WEST"
- noplacement.txt: Should not have an output because there is no placement being done
- invalidplacement.txt: Should not have an output because the placement command is being ignored.