import { LucideIconData, LucideIconNode } from 'lucide-angular/icons/types';
import { parse } from 'svgson';

const svgString = `
<svg>
  <line
    stroke="#bada55"
    stroke-width="2"
    stroke-linecap="round"
    x1="70"
    y1="80"
    x2="250"
    y2="150">
  </line>
</svg>`;

const MyIcon = {
  name: 'my-icon',
  data: [] as LucideIconData
};

parse(svgString).then((json) => {
  const convertToLucideIconData = (node: any): LucideIconData => {
    const traverse = (node: any): LucideIconNode => {
      return [
        node.name,
        node.attributes,
      ];
    };
    
    const children = node.children ? node.children.map(traverse) : [];
    return [traverse(node), ...children];
  };

  MyIcon.data = convertToLucideIconData(json);
});

export { MyIcon };
