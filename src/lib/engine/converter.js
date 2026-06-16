import { Parser } from 'htmlparser2';
import { tailwindToFlutter, tailwindToReactNative } from './mappings';

export class ConversionEngine {
  constructor(targetFramework) {
    this.targetFramework = targetFramework;
  }

  convert(htmlInput) {
    if (!htmlInput) return '';

    // Check if it's a "Reverse" conversion (Framework to HTML)
    if (this.targetFramework === 'html') {
        return this.reverseConvert(htmlInput);
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
    const classes = classString.split(' ');

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
        // Handle dynamic patterns like p-4
        if (cls.startsWith('p-')) {
          const val = parseInt(cls.split('-')[1]);
          params.push(`padding: EdgeInsets.all(${val * 4})`);
        }
      }
    });

    if (decoration.length > 0) {
      params.push(`decoration: BoxDecoration(\n      ${decoration.join(',\n      ')}\n    )`);
    }

    let open = `${widget}(\n    ${params.join(',\n    ')}${params.length > 0 ? ',' : ''}\n    child: `;
    if (widget === 'Flex' || widget === 'Column' || widget === 'Row') {
        open = `${widget}(\n    ${params.join(',\n    ')}${params.length > 0 ? ',' : ''}\n    children: [`;
    }

    return {
      open,
      close: widget.includes('Row') || widget.includes('Column') || widget.includes('Flex') ? '\n    ],' : '\n  ),'
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
      return `Text('${text}', style: TextStyle(color: Colors.white)),`;
    }
    if (this.targetFramework === 'react-native') {
        return `<Text>${text}</Text>`;
    }
    return text;
  }

  reverseConvert(code) {
      // Basic simulation of reverse conversion
      if (code.includes('Widget build') || code.includes('StatelessWidget')) {
          return `<div class="flex flex-col items-center p-8 bg-blue-600 rounded-2xl shadow-2xl">\n  <h1 class="text-white text-2xl font-bold">Imported from Flutter</h1>\n</div>`;
      }
      return `<div class="p-4 bg-slate-100 rounded-lg">Converted Framework to HTML</div>`;
  }

  formatOutput(code) {
    if (this.targetFramework === 'flutter') {
      return `import 'package:flutter/material.dart';\n\nclass PixelPerfectView extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return ${code.trim().replace(/,$/, '')};\n  }\n}`;
    }
    return code;
  }
}
