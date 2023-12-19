/**
 *
 * @typedef LayoutItem
 * @property id {String}
 * @property row {Number}
 * @property column {Number}
 * @property width {Number}
 * @property height {Number}
 * @property static {Boolean}
 */


/**
 * 重叠监测
 * @param layout {LayoutItem[]}
 * @return {LayoutItem[]}
 */
export function compact(layout) {
    const compareWith = getStatics(layout);
    // We go through the items by row and column.
    const sorted = sortLayoutItemsByRowCol(layout);
    // Holding for new items.
    const out = Array(layout.length);

    for (let i = 0, len = sorted.length; i < len; i++) {
        let l = Object.assign({}, sorted[i]);

        // Don't move static elements
        if (!l.static) {
            l = compactItem(sorted, compareWith, l);

            // Add to comparison array. We only collide with items before this one.
            // Statics are already in this array.
            compareWith.push(l);
        }

        // Add to output array to make sure they still come out in the right order.
        out[layout.indexOf(sorted[i])] = l;

        // Clear moved flag, if it exists.
        l.moved = false;
    }

    return out;
}



/**
 * Get all static elements.
 * @param layout {LayoutItem[]}
 * @return {LayoutItem[]}
 */
export function getStatics(layout) {
    return layout.filter(l => l.static);
}

/**
 * Sort layout items by row ascending and column ascending.
 *
 * Does not modify Layout.
 *
 * @param layout {LayoutItem[]}
 * @return {LayoutItem[]}
 */
function sortLayoutItemsByRowCol(layout) {
    // Slice to clone array as sort modifies
    return layout.slice(0).sort(function (a, b) {
        if (a.row > b.row || (a.row === b.row && a.column > b.column)) {
            return 1;
        } else if (a.row === b.row && a.column === b.column) {
            // Without this, we can get different sort results in IE vs. Chrome/FF
            return 0;
        }
        return -1;
    });
}

/**
 * Compact an item in the layout.
 *
 * Modifies item.
 *
 * @param compareWith {LayoutItem[]}
 * @param l {LayoutItem}
 * @param fullLayout {LayoutItem[]}
 *
 * @return {LayoutItem}
 *
 */
export function compactItem(fullLayout, compareWith, l) {
    // Bottom 'y' possible is the bottom of the layout.
    // This allows you to do nice stuff like specify {y: Infinity}
    // This is here because the layout must be sorted in order to get the correct bottom `y`.
    l.row = Math.min(bottom(compareWith), l.row);
    // Move the element up as far as it can go without colliding.
    while (l.row > 1 && !getFirstCollision(compareWith, l)) {
        // console.log("row--:", l.id, l.row)
        l.row--;
    }


    // Move it down, and keep moving it down if it's colliding.
    let collides;
    // Checking the compactType null value to avoid breaking the layout when overlapping is allowed.
    while (collides = getFirstCollision(compareWith, l)) {
        resolveCompactionCollision(fullLayout, l, collides.row + collides.height, "row");
    }

    // Ensure that there are no negative positions
    l.row = Math.max(l.row, 1);
    l.column = Math.max(l.column, 1);

    return l;
}




const heightWidth = {row: "height", column: "width"};

/**
 * Before moving item down, it will check if the movement will cause collisions and move those items down before.
 * @param layout {LayoutItem[]}
 * @param item {LayoutItem}
 * @param moveToCoord {Number}
 * @param axis {"row"|"column"}
 */
export function resolveCompactionCollision(layout, item, moveToCoord, axis) {
    const sizeProp = heightWidth[axis];
    item[axis] += 1;
    const itemIndex = layout
        .map(layoutItem => {
            return layoutItem.id;
        })
        .indexOf(item.id);

    // Go through each item we collide with.
    for (let i = itemIndex + 1; i < layout.length; i++) {
        const otherItem = layout[i];
        // Ignore static items
        if (otherItem.static) continue;

        // Optimization: we can break early if we know we're past this el
        // We can do this b/c it's a sorted layout
        if (otherItem.row > item.row + item.height) break;

        if (collides(item, otherItem)) {
            resolveCompactionCollision(
                layout,
                otherItem,
                moveToCoord + item[sizeProp],
                axis
            );
        }
    }

    item[axis] = moveToCoord;
}


/**
 * Return the bottom coordinate of the layout.
 *
 * @param  {LayoutItem[]} layout Layout array.
 * @return {Number}       Bottom coordinate.
 */
function bottom(layout) {
    let max = 1,
        bottomY;
    for (let i = 0, len = layout.length; i < len; i++) {
        bottomY = layout[i].row + layout[i].height;
        if (bottomY > max) max = bottomY;
    }
    return max;
}

/**
 * Returns the first item this layout collides with.
 * It doesn't appear to matter which order we approach this from, although
 * perhaps that is the wrong thing to do.
 *
 * @param {LayoutItem[]} layout
 * @param  {LayoutItem} layoutItem Layout item.
 * @return {LayoutItem|undefined}  A colliding layout item, or undefined.
 */
function getFirstCollision(layout, layoutItem) {
    for (let i = 0, len = layout.length; i < len; i++) {
        if (collides(layout[i], layoutItem)) {
            return layout[i];
        }
    }
}

/**
 * Given two layoutitems, check if they collide.
 *
 * @param l1 {LayoutItem}
 * @param l2 {LayoutItem}
 *
 * @return {Boolean}
 */
export function collides(l1, l2) {
    if (l1.id === l2.id) return false; // same element
    if (l1.column + l1.width <= l2.column) return false; // l1 is left of l2
    if (l1.column >= l2.column + l2.width) return false; // l1 is right of l2
    if (l1.row + l1.height <= l2.row) return false; // l1 is above l2
    if (l1.row >= l2.row + l2.height) return false; // l1 is below l2
    return true; // boxes overlap
}

