# Master Developer Handoff

## Purpose

This document is the current source of truth for the interactive fish market website flow, homepage map behavior, habitat transitions, and early UI interaction rules.

Use this document before implementation work begins.

## Project Summary

Build an interactive online fish market website with an illustrated homepage map and habitat-based product discovery.

The experience starts on a homepage map illustration where the user selects one of three water habitats:

- Stream
- River
- Sea

After selecting a habitat, the user enters an underwater scene for that habitat, clicks a fish, then selects a cut by clicking `+` hotspots directly on a fish cut illustration.

There is no traditional add-to-cart button for cut selection.
The primary add-to-cart action happens through clickable `+` hotspots on valid fish parts or cuts.

## Active Homepage Map Asset

Current active homepage map image:

- `nature`

Treat it as a temporary art asset for flow validation, not final production art.

## Homepage Overlay Copy

Headline:

- Choose the water. Find the catch.

Subheadline:

- Explore the selection through stream, river, and sea, then choose the species and cut you want.

Hint:

- Click a habitat to open the underwater scene.

## Homepage Habitat Zones

Use percentage-based positioning over the illustration.

### Stream

- centerX: 27
- centerY: 36
- width: 18
- height: 16

### River

- centerX: 44
- centerY: 60
- width: 24
- height: 18

### Sea

- centerX: 79
- centerY: 49
- width: 24
- height: 20

These are UX anchor zones, not strict pixel coordinates.

## Homepage Map UI

### Label Style

- small organic capsule shape
- light surface with slight transparency
- darker text
- very thin outline
- soft glow on hover

### Hover Behavior

- label increases contrast
- habitat zone gets a soft pulse
- corresponding water area gets a subtle highlight

### Active Behavior

- selected habitat stays illuminated
- non-selected zones dim slightly
- transition toward underwater scene begins immediately

## Main UX Flow

1. User lands on homepage map illustration.
2. User selects one habitat.
3. App transitions into underwater scene for selected habitat.
4. User clicks a fish.
5. Fish enters focus state.
6. Fish details appear.
7. Cut layer opens.
8. User clicks `+` hotspot on a specific cut.
9. Selected cut is added to cart.
10. UI confirms success through local feedback and cart update.

## Habitat Scene UI

### Stream

- tone: colder, clearer, narrower
- feel: delicate, premium, quiet
- fish count: one primary fish, one optional secondary fish
- main species priority: Trout

### River

- tone: fuller, calmer, practical
- feel: main freshwater catalog layer
- fish count: three primary clickable species
- main species priority: Carp, Catfish, Zander

### Sea

- tone: open, elegant, premium
- feel: emotional premium layer
- fish count: four to five primary clickable species
- main species priority: Salmon, Sea Bream, Sea Bass, Tuna, plus supporting Hake and Sardine

## Fish Focus Overlay

When the user clicks a fish, show:

- fish name
- short flavor or texture note
- stock state
- instruction hint

Instruction hint:

- Click the marked part of the fish to add that cut to the cart.

Before the cut layer opens, the fish focus overlay should make the selected fish feel intentional and premium, not rushed.

## Cut Interaction Model

There is no classic button for add to cart.

The add-to-cart action must happen through `+` hotspots placed on valid fish cut areas.

### `+` Hotspot States

- idle
- hover
- pressed
- added
- disabled
- error

### `+` Behavior Rules

- first click adds one cart item using current cut and default or selected weight
- repeated click on the same `+` increases quantity
- disabled state must explain why the cut is not available
- after success, `+` should visually change to confirmed state, such as checkmark or quantity badge

## Motion Timing Guidance

- hover: 150ms to 220ms
- focus dim: 220ms to 300ms
- scene transition: 450ms to 700ms
- return transition: 350ms to 550ms

## Suggested Implementation Structure

Recommended documentation structure for follow-up implementation details:

```txt
docs/
  developer-handoff/
    master-developer-handoff.md
```

If expanded later, split into numbered documents:

```txt
docs/
  developer-handoff/
    01-project-brief.md
    02-data-model.md
    03-component-architecture.md
    04-ui-states-and-interactions.md
    05-analytics-tracking.md
    06-asset-requirements.md
    07-mvp-delivery-order.md
    08-folder-file-structure.md
    09-react-prop-interfaces.md
    10-state-model.md
    11-json-file-split.md
    12-utility-logic-notes.md
    README.md
```

## Recommended Build Order

### 1. Homepage Map

- finalize headline, subheadline, and hint
- finalize Stream / River / Sea hover and active behavior
- implement habitat labels and hotspot zones

### 2. Habitat Scene UI

- define underwater scene entry transition
- decide fish name placement
- implement fish focus overlay
- limit visible information before cut layer opens

### 3. Cut Interaction UI

- implement fish cut illustration layer
- implement `+` hotspot behavior
- define first click, repeated click, disabled state, and success feedback

## Developer Note

This document should be treated as the current source of truth for:

- interaction architecture
- state behavior
- map overlay logic
- cut interaction behavior
- early implementation order
