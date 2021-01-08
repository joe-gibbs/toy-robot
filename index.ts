import * as FS from "fs/promises";

/**
 * The direction that the robot can face.
 * It's ordered in clockwise order so we can increment/decrement it when changing direction.
 */
enum Direction {
  NORTH,
  WEST,
  SOUTH,
  EAST,
}

/**
 * Checks X and Y coordinates to see if they're valid, and whether we should move the robot.
 */
const areCoordinatesValid = (x: number, y: number) => {
  if (x < 0 || x > 4 || y < 0 || y > 4) {
    return false;
  }
  return true;
};

class Robot {
  private x: number;
  private y: number;
  private facing: Direction;
  /** Rather than have x, y and facing be optional, use an isOnTable bool to ignore all their actions */
  private isOnTable: boolean;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.isOnTable = false;
    this.facing = Direction.NORTH;
  }

  /**
   * Places the robot down on the table. None of the methods work without it.
   */
  place(x: number, y: number, f: Direction) {
    if (areCoordinatesValid(x, y)) {
      this.isOnTable = true;
      this.facing = f;
      this.x = x;
      this.y = y;
    }
  }

  /**
   * Moves the robot based the direction it's facing.
   */
  move() {
    let newX = this.x;
    let newY = this.y;
    switch (this.facing) {
      case Direction.NORTH:
        newY += 1;
        break;
      case Direction.SOUTH:
        newY -= 1;
        break;
      case Direction.EAST:
        newX += 1;
        break;
      case Direction.WEST:
        newY -= 1;
        break;
      default:
        break;
    }

    if (areCoordinatesValid(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }

  // Since the facing is an integer-based enum, we can add to/remove from it to rotate 90 degrees
  left() {
    if (!this.isOnTable) return;

    let facingNumber = this.facing - 1;
    if (facingNumber < 0) {
      facingNumber = 3;
    }

    this.facing = facingNumber;
  }

  right() {
    if (!this.isOnTable) return;

    let facingNumber = this.facing + 1;
    if (facingNumber >= 4) {
      facingNumber = 0;
    }

    this.facing = facingNumber;
  }

  /**
   * Logs the location of the robot in the console.
   */
  report() {
    if (!this.isOnTable) return;

    console.log(
      `X: ${this.x}, Y: ${this.y}, Facing: ${Direction[this.facing]}`
    );
  }
}

/** Uses a main function to get around top-level await issue */
const main = async () => {
  if (!process.argv[2]) {
    throw new Error("You must define a command file to read.");
  }
  let robot = new Robot();
  let commands = (await FS.readFile(process.argv[2])).toString("utf-8");

  //Split the command file based on newlines and iterate through
  commands.split("\n").forEach((line: string) => {
    if (line === "MOVE") {
      robot.move();
    } else if (line === "LEFT") {
      robot.left();
    } else if (line === "RIGHT") {
      robot.right();
    } else if (line === "REPORT") {
      robot.report();
    } else if (line.startsWith("PLACE")) {
      const placeCommands = line.split(" ")[1].split(",");

      const x = Number.parseInt(placeCommands[0]);
      const y = Number.parseInt(placeCommands[1]);

      let direction: Direction | null = null;

      switch (placeCommands[2]) {
        case "NORTH":
          direction = Direction.NORTH;
          break;
        case "WEST":
          direction = Direction.WEST;
          break;
        case "SOUTH":
          direction = Direction.SOUTH;
          break;
        case "EAST":
          direction = Direction.EAST;
          break;
        default:
          return;
      }
      if (areCoordinatesValid) {
        robot.place(x, y, direction);
      }
    }
  });
};

main();
