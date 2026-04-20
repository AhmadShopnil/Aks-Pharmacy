// export const megamenuFormat = (items, depth = 1, maxDepth = 3) => {
//   if (!items) return [];

//   return items.map((item) => {
//     if (!item.children) return item;

//     // If depth < maxDepth, continue normally
//     if (depth < maxDepth) {
//       return {
//         ...item,
//         children: megamenuFormat(item.children, depth + 1, maxDepth),
//       };
//     }

//     // If depth === maxDepth, FLATTEN all deeper levels
//     if (depth === maxDepth) {
//       const flattenChildren = (nodes) => {
//         let result = [];
//         nodes.forEach((n) => {
//           result.push({ name: n.name });
//           if (n.children) {
//             result = result.concat(flattenChildren(n.children));
//           }
//         });
//         return result;
//       };

//       return {
//         ...item,
//         children: flattenChildren(item.children),
//       };
//     }

//     return item;
//   });
// };


// export function formatCategories(categories) {
//   return categories.map(top => ({
//     ...top,
//     child: (top.child || []).map(second => {
//       const flatChildren = []

//       function collectAll(node) {
//         // push current node as 3rd-level sibling
//         flatChildren.push({
//           ...node,
//           child: [] // stop nesting here
//         })

//         // collect ALL deeper levels
//         if (node.child && node.child.length) {
//           node.child.forEach(collectAll)
//         }
//       }

//       // start from original 3rd-level nodes
//       (second.child || []).forEach(collectAll)

//       return {
//         ...second,
//         child: flatChildren
//       }
//     })
//   }))
// }


// // export function formatCategories(categories) {
// //   return categories.map(top => ({
// //     ...top,
// //     child: (top.child || []).map(second => {
// //       const flattened = []

// //       function collect(node, depth) {
// //         if (depth >= 3) {
// //           flattened.push({ ...node, child: [] })
// //         } else {
// //           (node.child || []).forEach(c => collect(c, depth + 1))
// //         }
// //       }

// //       // collect all 3rd+ levels
// //       (second.child || []).forEach(c => collect(c, 3))

// //       return {
// //         ...second,
// //         child: flattened
// //       }
// //     })
// //   }))
// // }
