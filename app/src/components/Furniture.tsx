// Original vector artwork: a product illustration, not a photograph of an IKEA item.
export function Furniture({ variant = 'alternative', room = false }: { variant?: 'original' | 'alternative'; room?: boolean }) {
  const oak = variant === 'original'
  return <svg viewBox="0 0 600 480" role="img" aria-label={room ? 'Illustration of a warm white storage cabinet in a simple home setting' : `${oak ? 'Light oak effect' : 'Warm white'} two-door storage cabinet illustration`} className="furniture-art">
    <rect width="600" height="480" fill={room ? '#e9e5dc' : '#eeece6'} />
    {room && <><path d="M0 364H600V480H0Z" fill="#ded7ca" /><path d="M0 358H600V365H0Z" fill="#f5f2eb" /><path d="M62 480L163 366M345 480L355 366M570 480L517 366" stroke="#cfc6b6" /><rect x="100" y="59" width="119" height="144" fill="#b7ad9b" /><rect x="105" y="64" width="109" height="134" fill="#f5f2ea" /><path d="M140 171V115H180V171M132 150H188" fill="none" stroke="#aba08c" strokeWidth="2" /></>}
    <g transform={room ? 'translate(32 28)' : 'translate(0 12)'}>
      <path d="M158 356L172 353V397H158Z M397 350L412 346V386H398Z" fill={oak ? '#9c7856' : '#b5b1a5'} />
      <path d="M140 174L379 174L426 151L187 151Z" fill={oak ? '#d9bf9d' : '#f5f3e9'} />
      <path d="M379 174L426 151V349L379 374Z" fill={oak ? '#ac8964' : '#c4c3b7'} />
      <path d="M140 174H379V374H140Z" fill={oak ? '#c4a27b' : '#e0e0d4'} />
      <path d="M146 181H256V366H146Z M262 181H373V366H262Z" fill={oak ? '#cfb18b' : '#eeeee3'} stroke={oak ? '#b28f67' : '#d2d1c5'} strokeWidth="1" />
      {oak && <g stroke="#b99974" strokeWidth="1" opacity="0.65"><path d="M163 184V363M174 184V363M198 184V363M227 184V363M246 184V363M280 184V363M301 184V363M319 184V363M345 184V363M362 184V363" /></g>}
      <path d="M244 228V252M275 228V252" stroke={oak ? '#6e5944' : '#74776b'} strokeWidth="4" />
      <path d="M140 174H379L426 151" fill="none" stroke={oak ? '#b89771' : '#d3d1c5'} />
      {room && <><path d="M300 126H357V147H300Z" fill="#a39983" /><path d="M295 116H350V128H295Z" fill="#ebe7dc" /><path d="M295 116H350" stroke="#bbb09b" /><path d="M204 151C193 134 194 116 201 108H222C229 126 227 139 218 151Z" fill="#9a8971" /><path d="M211 109V64M211 88L197 75M211 78L224 66" stroke="#716f5c" strokeWidth="2" fill="none" /><path d="M195 76Q180 63 188 56Q204 62 195 76M224 66Q223 48 235 46Q241 60 224 66M211 65Q198 47 205 40Q219 44 211 65" fill="#858571" /></>}
    </g>
  </svg>
}
