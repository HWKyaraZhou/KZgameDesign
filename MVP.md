### Game Timer
**Priority:** [P0]
**Implementation Timeline:** [Day 1-2]

**Core Requirements:**
- running game timer that counts down from a specific value
- ends game when the timer hits 0

**Technical Components:**
- logic to end game at end of timer
- logic that handles timer countdown

**Simplifications:**
- no timer scaling based on difficults

**Dependencies:**
- none

### Different scenes with arrow connecting them
**Priority:** [P0]
**Implementation Timeline:** [Day 1-2]

**Core Requirements:**
- Should be able to coherently move between scenes using arrows
- Different objects and items in each scene

**Technical Components:**
- 2d coordinate array of scenes
- each scene has attributes stored in the array

**Simplifications:**
- for MVP scenes can be simplified and can only make a few

**Dependencies:**
- need to have the items and interactable objects stored in each scene

### Items
**Priority:** [P0]
**Implementation Timeline:** [Day 3-4]

**Core Requirements:**
- Items should be essential to escaping
- Should be stored in the inventory

**Technical Components:**
- Array of current items in inventory
- each item has an attribute and interactive object it can interact with

**Simplifications:**
- can make inventory very primitive and not include photos of items in MVP

**Dependencies:**
- need to have the interactable objects because items can interact with them

### Interactive Objects
**Priority:** [P0]
**Implementation Timeline:** [Day 3-4]

**Core Requirements:**
- Interactive objects either unlock new areas, give new items, or give information
- Can be NPCs that give dialogue or just inanimate objects (like chests, buttons, etc)

**Technical Components:**
- Array of the interactive objects in each scene with position too
- Have to code the interaction with the item

**Simplifications:**
- Should have functionality, but don't need to make it visually appealing in MVP

**Dependencies:**
- need to have items and scenes implemented

### Different Difficulties and Time Events
**Priority:** [P1]
**Implementation Timeline:** [Day 5]

**Core Requirements:**
- Can have different difficulties that change the time limit
- Can have certain scenes that unlock at certain times

**Technical Components:**
- Stored variables for the time of each difficulty
- Store an array of actions that occur at each time

**Simplifications:**
- it already simple

**Dependencies:**
- the P0 things

# MVP Implementation Plan

## Day 1-2 (Core Framework)
- Game Timer
- Scenes

## Day 3-4 (Essential Features)
- Items
- Interactive Objects

## Day 5 (Enhancement & Testing)
- Difficulties
- Timed Events
- Final testing and refinement