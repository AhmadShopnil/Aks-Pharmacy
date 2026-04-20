export const megamenuFormat = (items, depth = 1, maxDepth = 5) => {
  if (!items) return [];

  return items.map((item) => {
    if (!item.children) return item;

    // If depth < maxDepth, continue normally
    if (depth < maxDepth) {
      return {
        ...item,
        children: megamenuFormat(item.children, depth + 1, maxDepth),
      };
    }

    // If depth === maxDepth, FLATTEN all deeper levels
    if (depth === maxDepth) {
      const flattenChildren = (nodes) => {
        let result = [];
        nodes.forEach((n) => {
          result.push({ name: n.name });
          if (n.children) {
            result = result.concat(flattenChildren(n.children));
          }
        });
        return result;
      };

      return {
        ...item,
        children: flattenChildren(item.children),
      };
    }

    return item;
  });
};


export function formatCategories(categories, depth = 1, maxDepth = 4) {
  if (!categories) return [];

  return categories.map(item => {
    const hasChildren = item.child && item.child.length > 0;

    if (!hasChildren) return item;

    // If we haven't reached max depth yet, keep nesting
    if (depth < maxDepth) {
      return {
        ...item,
        child: formatCategories(item.child, depth + 1, maxDepth)
      };
    }

    // If we've reached max depth, flatten all deeper levels into this child array
    if (depth === maxDepth) {
      const flattened = [];

      function collectAll(node) {
        // Add the node itself (flattened)
        flattened.push({
          ...node,
          child: [] // Stop nesting here
        });

        // Recursively collect all its descendants
        if (node.child && node.child.length > 0) {
          node.child.forEach(collectAll);
        }
      }

      // Start collecting from the current node's children
      item.child.forEach(collectAll);

      return {
        ...item,
        child: flattened
      };
    }

    return item;
  });
}


// export function formatCategories(categories) {
//   return categories.map(top => ({
//     ...top,
//     child: (top.child || []).map(second => {
//       const flattened = []

//       function collect(node, depth) {
//         if (depth >= 3) {
//           flattened.push({ ...node, child: [] })
//         } else {
//           (node.child || []).forEach(c => collect(c, depth + 1))
//         }
//       }

//       // collect all 3rd+ levels
//       (second.child || []).forEach(c => collect(c, 3))

//       return {
//         ...second,
//         child: flattened
//       }
//     })
//   }))
// }
