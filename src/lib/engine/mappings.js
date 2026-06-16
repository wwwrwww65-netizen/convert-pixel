export const tailwindToFlutter = {
  // Layout
  'flex': { widget: 'Flex' },
  'flex-col': { param: 'direction', value: 'Axis.vertical' },
  'flex-row': { param: 'direction', value: 'Axis.horizontal' },
  'items-center': { param: 'crossAxisAlignment', value: 'CrossAxisAlignment.center' },
  'items-start': { param: 'crossAxisAlignment', value: 'CrossAxisAlignment.start' },
  'items-end': { param: 'crossAxisAlignment', value: 'CrossAxisAlignment.end' },
  'justify-center': { param: 'mainAxisAlignment', value: 'MainAxisAlignment.center' },
  'justify-between': { param: 'mainAxisAlignment', value: 'MainAxisAlignment.spaceBetween' },
  'justify-around': { param: 'mainAxisAlignment', value: 'MainAxisAlignment.spaceAround' },
  'justify-start': { param: 'mainAxisAlignment', value: 'MainAxisAlignment.start' },
  'justify-end': { param: 'mainAxisAlignment', value: 'MainAxisAlignment.end' },

  // Grid
  'grid': { widget: 'GridView.count' },

  // Spacing
  'p-': { param: 'padding', value: (val) => `EdgeInsets.all(${val * 4}.0)` },
  'px-': { param: 'padding', value: (val) => `EdgeInsets.symmetric(horizontal: ${val * 4}.0)` },
  'py-': { param: 'padding', value: (val) => `EdgeInsets.symmetric(vertical: ${val * 4}.0)` },
  'pt-': { param: 'padding', value: (val) => `EdgeInsets.only(top: ${val * 4}.0)` },
  'pb-': { param: 'padding', value: (val) => `EdgeInsets.only(bottom: ${val * 4}.0)` },
  'pl-': { param: 'padding', value: (val) => `EdgeInsets.only(left: ${val * 4}.0)` },
  'pr-': { param: 'padding', value: (val) => `EdgeInsets.only(right: ${val * 4}.0)` },

  'm-': { param: 'margin', value: (val) => `EdgeInsets.all(${val * 4}.0)` },
  'mx-': { param: 'margin', value: (val) => `EdgeInsets.symmetric(horizontal: ${val * 4}.0)` },
  'my-': { param: 'margin', value: (val) => `EdgeInsets.symmetric(vertical: ${val * 4}.0)` },

  // Sizing
  'w-full': { param: 'width', value: 'double.infinity' },
  'h-full': { param: 'height', value: 'double.infinity' },
  'w-screen': { param: 'width', value: 'MediaQuery.of(context).size.width' },
  'h-screen': { param: 'height', value: 'MediaQuery.of(context).size.height' },

  // Colors (Standard Tailwind Palette)
  'bg-blue-600': { decoration: 'color', value: 'Color(0xFF2563EB)' },
  'bg-blue-500': { decoration: 'color', value: 'Color(0xFF3B82F6)' },
  'bg-indigo-600': { decoration: 'color', value: 'Color(0xFF4F46E5)' },
  'bg-slate-800': { decoration: 'color', value: 'Color(0xFF1E293B)' },
  'bg-slate-900': { decoration: 'color', value: 'Color(0xFF0F172A)' },
  'bg-white': { decoration: 'color', value: 'Colors.white' },
  'bg-black': { decoration: 'color', value: 'Colors.black' },
  'bg-transparent': { decoration: 'color', value: 'Colors.transparent' },

  'text-white': { style: 'color', value: 'Colors.white' },
  'text-black': { style: 'color', value: 'Colors.black' },
  'text-blue-600': { style: 'color', value: 'Color(0xFF2563EB)' },
  'text-blue-100': { style: 'color', value: 'Color(0xFFDBEAFE)' },
  'text-gray-400': { style: 'color', value: 'Color(0xFF9CA3AF)' },
  'text-slate-400': { style: 'color', value: 'Color(0xFF94A3B8)' },

  // Typography
  'text-xs': { style: 'fontSize', value: '12.0' },
  'text-sm': { style: 'fontSize', value: '14.0' },
  'text-base': { style: 'fontSize', value: '16.0' },
  'text-lg': { style: 'fontSize', value: '18.0' },
  'text-xl': { style: 'fontSize', value: '20.0' },
  'text-2xl': { style: 'fontSize', value: '24.0' },
  'text-3xl': { style: 'fontSize', value: '30.0' },
  'text-4xl': { style: 'fontSize', value: '36.0' },
  'text-5xl': { style: 'fontSize', value: '48.0' },

  'font-thin': { style: 'fontWeight', value: 'FontWeight.w100' },
  'font-light': { style: 'fontWeight', value: 'FontWeight.w300' },
  'font-normal': { style: 'fontWeight', value: 'FontWeight.w400' },
  'font-medium': { style: 'fontWeight', value: 'FontWeight.w500' },
  'font-semibold': { style: 'fontWeight', value: 'FontWeight.w600' },
  'font-bold': { style: 'fontWeight', value: 'FontWeight.bold' },
  'font-black': { style: 'fontWeight', value: 'FontWeight.w900' },

  'tracking-tight': { style: 'letterSpacing', value: '-0.5' },
  'tracking-tighter': { style: 'letterSpacing', value: '-1.0' },
  'tracking-wide': { style: 'letterSpacing', value: '0.5' },
  'tracking-wider': { style: 'letterSpacing', value: '1.0' },
  'tracking-widest': { style: 'letterSpacing', value: '2.0' },

  // Borders
  'rounded-none': { decoration: 'borderRadius', value: 'BorderRadius.zero' },
  'rounded-sm': { decoration: 'borderRadius', value: 'BorderRadius.circular(2.0)' },
  'rounded': { decoration: 'borderRadius', value: 'BorderRadius.circular(4.0)' },
  'rounded-md': { decoration: 'borderRadius', value: 'BorderRadius.circular(6.0)' },
  'rounded-lg': { decoration: 'borderRadius', value: 'BorderRadius.circular(8.0)' },
  'rounded-xl': { decoration: 'borderRadius', value: 'BorderRadius.circular(12.0)' },
  'rounded-2xl': { decoration: 'borderRadius', value: 'BorderRadius.circular(16.0)' },
  'rounded-3xl': { decoration: 'borderRadius', value: 'BorderRadius.circular(24.0)' },
  'rounded-full': { decoration: 'borderRadius', value: 'BorderRadius.circular(999.0)' },

  // Shadow
  'shadow-sm': { decoration: 'boxShadow', value: '[BoxShadow(blurRadius: 2, color: Colors.black12)]' },
  'shadow': { decoration: 'boxShadow', value: '[BoxShadow(blurRadius: 4, color: Colors.black12)]' },
  'shadow-md': { decoration: 'boxShadow', value: '[BoxShadow(blurRadius: 6, color: Colors.black12)]' },
  'shadow-lg': { decoration: 'boxShadow', value: '[BoxShadow(blurRadius: 15, color: Colors.black12)]' },
  'shadow-xl': { decoration: 'boxShadow', value: '[BoxShadow(blurRadius: 25, color: Colors.black12)]' },
  'shadow-2xl': { decoration: 'boxShadow', value: '[BoxShadow(blurRadius: 50, color: Colors.black26)]' },
};

export const tailwindToReactNative = {
  // Flex
  'flex': { flex: 1 },
  'flex-col': { flexDirection: 'column' },
  'flex-row': { flexDirection: 'row' },
  'items-center': { alignItems: 'center' },
  'items-start': { alignItems: 'flex-start' },
  'items-end': { alignItems: 'flex-end' },
  'justify-center': { justifyContent: 'center' },
  'justify-between': { justifyContent: 'space-between' },

  // Spacing
  'p-': (val) => ({ padding: val * 4 }),
  'm-': (val) => ({ margin: val * 4 }),

  // Typography
  'text-xs': { fontSize: 12 },
  'text-sm': { fontSize: 14 },
  'text-base': { fontSize: 16 },
  'text-lg': { fontSize: 18 },
  'text-xl': { fontSize: 20 },
  'font-bold': { fontWeight: 'bold' },

  // Colors
  'bg-blue-600': { backgroundColor: '#2563EB' },
  'bg-white': { backgroundColor: '#ffffff' },
  'text-white': { color: '#ffffff' },
  'text-blue-600': { color: '#2563EB' },

  // Borders
  'rounded-lg': { borderRadius: 8 },
  'rounded-xl': { borderRadius: 12 },
  'rounded-2xl': { borderRadius: 16 },
  'rounded-full': { borderRadius: 999 },
};
