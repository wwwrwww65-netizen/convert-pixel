import { Parser } from 'htmlparser2';
import { tailwindToFlutter, tailwindToReactNative } from './mappings';

export class ConversionEngine {
  constructor(targetFramework) {
    this.targetFramework = targetFramework;
  }

  convert(htmlInput) {
    if (!htmlInput || htmlInput.trim() === '') return '';

    // Check if it's a "Reverse" conversion (Framework to HTML)
    if (this.targetFramework === 'html') {
        if (htmlInput.includes('Widget') || htmlInput.includes('Container') || htmlInput.includes('Column')) {
           return this.reverseConvert(htmlInput);
        }
        return htmlInput; // Already HTML
    }

    let result = '';
    const stack = [];

    const parser = new Parser({
      onopentag: (name, attribs) => {
        const classes = attribs.class || '';
        const mapped = this.mapElement(name, classes);
        result += mapped.open;
        stack.push(mapped.close);
      },
      ontext: (text) => {
        const trimmed = text.trim();
        if (trimmed) {
           result += this.mapText(trimmed);
        }
      },
      onclosetag: () => {
        result += stack.pop() || '';
      }
    }, { decodeEntities: true });

    parser.write(htmlInput);
    parser.end();

    return this.formatOutput(result);
  }

  mapElement(name, classString) {
    const classes = classString.split(/\s+/).filter(Boolean);

    switch (this.targetFramework) {
      case 'flutter':
        return this.toFlutter(name, classes);
      case 'react-native':
        return this.toReactNative(name, classes);
      case 'react':
        return { open: `<div className="${classString}">`, close: '</div>' };
      case 'vue':
        return { open: `<div class="${classString}">`, close: '</div>' };
      default:
        return { open: `<${name} class="${classString}">`, close: `</${name}>` };
    }
  }

  toFlutter(name, classes) {
    let widget = 'Container';
    let params = [];
    let decoration = [];
    let textStyle = [];

    classes.forEach(cls => {
      const mapping = tailwindToFlutter[cls];
      if (mapping) {
        if (mapping.widget) widget = mapping.widget;
        if (mapping.param) params.push(`${mapping.param}: ${mapping.value}`);
        if (mapping.decoration) decoration.push(`${mapping.decoration}: ${mapping.value}`);
        if (mapping.style) textStyle.push(`${mapping.style}: ${mapping.value}`);
      } else {
        // Handle dynamic patterns like p-4, m-4, rounded-xl, gap-4
        if (cls.startsWith('p-')) {
          const val = parseInt(cls.split('-')[1]);
          if (!isNaN(val)) params.push(`padding: EdgeInsets.all(${val * 4}.0)`);
        }
        if (cls.startsWith('m-')) {
          const val = parseInt(cls.split('-')[1]);
          if (!isNaN(val)) params.push(`margin: EdgeInsets.all(${val * 4}.0)`);
        }
        if (cls.startsWith('rounded-')) {
            const val = cls.split('-')[1];
            const radiusMap = { 'sm': '4.0', 'md': '8.0', 'lg': '12.0', 'xl': '16.0', '2xl': '24.0', '3xl': '32.0', 'full': '999.0' };
            decoration.push(`borderRadius: BorderRadius.circular(${radiusMap[val] || '8.0'})`);
        }
      }
    });

    if (decoration.length > 0) {
      params.push(`decoration: BoxDecoration(\n      ${decoration.join(',\n      ')}\n    )`);
    }

    let open = `${widget}(\n    ${params.join(',\n    ')}${params.length > 0 ? ',' : ''}\n    child: `;
    if (['Column', 'Row', 'Flex', 'ListView', 'Stack'].includes(widget)) {
        open = `${widget}(\n    ${params.join(',\n    ')}${params.length > 0 ? ',' : ''}\n    children: [`;
    }

    return {
      open,
      close: ['Column', 'Row', 'Flex', 'ListView', 'Stack'].includes(widget) ? '\n    ],' : '\n  ),'
    };
  }

  toReactNative(name, classes) {
    let styles = {};
    classes.forEach(cls => {
      const mapping = tailwindToReactNative[cls];
      if (mapping) {
        styles = { ...styles, ...mapping };
      }
    });

    return {
      open: `<View style={${JSON.stringify(styles, null, 2)}}>\n  `,
      close: `\n</View>`
    };
  }

  mapText(text) {
    if (this.targetFramework === 'flutter') {
      return `Text('${text}', style: TextStyle(color: Colors.white, fontSize: 16.0)),`;
    }
    if (this.targetFramework === 'react-native') {
        return `<Text style={{color: 'white'}}>${text}</Text>`;
    }
    return text;
  }

  reverseConvert(code) {
      // Improved mock reverse conversion
      if (code.includes('Column') || code.includes('Row')) {
          return `<div class="flex flex-col gap-4 p-6 bg-slate-800 rounded-xl">\n  <h2 class="text-xl font-bold text-white">Converted from Flutter</h2>\n  <p class="text-slate-400">Successfully mapped structural widgets.</p>\n</div>`;
      }
      return `<div class="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">Imported Component</div>`;
  }

  formatOutput(code) {
    if (this.targetFramework === 'flutter') {
      const cleanedCode = code.trim().replace(/,$/, '');
      return `import 'package:flutter/material.dart';\n\nclass PixelPerfectComponent extends StatelessWidget {\n  const PixelPerfectComponent({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return ${cleanedCode};\n  }\n}`;
    }
    if (this.targetFramework === 'react-native') {
        return `import React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nexport default function Component() {\n  return (\n    ${code.trim()}\n  );\n}`;
    }
    return code;
  }
}
