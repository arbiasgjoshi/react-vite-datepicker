import { createMachine } from "xstate";

// create a machine that logs in and transitions to the complete state
const automata = createMachine({
  id: "Core Automata",
  initial: "init",
  states: {
    init: {},
    login: {},
    schedule: {},
    complete: {},
  },
});

export default automata;
