const KEY = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowDown',
  'ArrowUp',
  'Alt',
  'Control',
  'Meta',
  'Shift',
  'CapsLock',
  'Tab',
  '²',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'ScrollLock',
  'Pause',
  'Insert',
  'Home',
  'End',
  'PageUp',
  'PageDown',
  'Delete',
  ' ',
  'AltGraph',
  'ContextMenu',
]

const MAP = new Map()
MAP.set('ê', 'e')
MAP.set('é', 'e')
MAP.set('è', 'e')

MAP.set('û', 'u')
MAP.set('ù', 'u')

MAP.set('ô', 'o')

MAP.set('â', 'a')
MAP.set('à', 'a')

MAP.set('î', 'i')

export { KEY, MAP }
