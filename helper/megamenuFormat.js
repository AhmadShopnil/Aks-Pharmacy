export const megamenuFormat = (items, depth = 1, maxDepth = 3) => {
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
