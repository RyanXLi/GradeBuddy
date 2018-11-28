/**
 * Utility functions that don't really fit in any particular folder.
 */

/**
 * Gets the x and y coordinates of a mouse event *relative to the top left corner of an element*.  By default, the
 * element is the event's `currentTarget`, the element to which the event listener has been attached.
 * 
 * For example, if the top left corner of the element is at screen coordinates (10, 10) and the event's screen
 * coordinates are (11, 12), then this function will return `{x: 1, y: 2}`.
 * 
 * @param {React.MouseEvent} event - the event for which to get relative coordinates
 * @param {Element} [relativeTo] - calculate coordinates relative to this element.  Default is event.currentTarget.
 * @return {Coordinate} object with props x and y that contain the relative coordinates
 * @author Silas Hsu
 */
export function getRelativeCoordinates(event, relativeTo) {
    if (!relativeTo) {
        relativeTo = event.currentTarget;
    }
    const targetBoundingRect = relativeTo.getBoundingClientRect();
    return {
        x: event.clientX - targetBoundingRect.left,
        y: event.clientY - targetBoundingRect.top
    };
}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Calculates the difference of the two Dates in days.  This function returns positive numbers if a is after b.
 * 
 * @param {Date} a - the first Date
 * @param {Date} b - the second Date
 * @return {number} the difference (a - b) of the two Dates in days
 * @author {Shyam Habarakada from StackOverflow}
 */
export function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc1 - utc2) / _MS_PER_DAY);
}
