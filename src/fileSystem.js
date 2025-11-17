import { main } from "./maze.js";
import { ticTacToe } from "./tictactoe.js";


export const fs = {
  DeskTop: { himu: { hi: "hi", hello: "" } },
  Public: {},
  games: { maze: main, "tic-tac-toe": ticTacToe }
};

