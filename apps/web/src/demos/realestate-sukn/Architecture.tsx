import { useId } from "react";
import type { Property } from "./content";

/** Original architectural studies. These are deliberately illustrations, not listing photos. */
export function Architecture({
  property,
  view = 0,
  label,
  className,
}: {
  property: Pick<Property, "type" | "tone">;
  view?: number;
  label: string;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const palette =
    property.tone === "sage"
      ? { sky: "#C9D2C8", wall: "#DEE1D3", side: "#9EA992", accent: "#77856E" }
      : property.tone === "clay"
        ? {
            sky: "#D9CBBE",
            wall: "#C99F80",
            side: "#9C7259",
            accent: "#986B50",
          }
        : {
            sky: "#DADCCE",
            wall: "#E6D8BF",
            side: "#C0AC8E",
            accent: "#A18B69",
          };
  return (
    <svg
      viewBox="0 0 900 640"
      role="img"
      aria-labelledby={`${id}-title`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={`${id}-title`}>{label}</title>
      <defs>
        <linearGradient id={`${id}-sky`} x2="0" y2="1">
          <stop stopColor={palette.sky} />
          <stop offset="1" stopColor="#F0ECDF" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x2="1" y2="1">
          <stop stopColor="#193E37" />
          <stop offset="1" stopColor="#527064" />
        </linearGradient>
        <pattern
          id={`${id}-brick`}
          width="70"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 0H70M0 24H70M35 0V24"
            fill="none"
            stroke={palette.side}
            strokeWidth="1"
            opacity=".45"
          />
        </pattern>
        <pattern
          id={`${id}-grid`}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path d="M24 0H0V24" fill="none" stroke="#CED4C5" strokeWidth=".7" />
        </pattern>
      </defs>
      {view === 2 ? (
        <>
          <path fill="#EEEDE2" d="M0 0h900v640H0z" />
          <path fill={`url(#${id}-grid)`} d="M0 0h900v640H0z" />
          <path
            fill="#F9F7EE"
            stroke="#284A3B"
            strokeWidth="10"
            d="M190 110H700V520H190Z"
          />
          <path fill="#C6D0BA" d="M450 119H691V290H450Z" />
          <path fill="#DAD5BF" d="M199 373H391V511H199Z" />
          <path
            fill="none"
            stroke="#284A3B"
            strokeWidth="7"
            d="M440 115V210M440 290V517M193 365H322M392 365H439M445 300H610M671 300H695M560 305V514"
          />
          <path
            fill="none"
            stroke="#8F9D89"
            strokeWidth="2"
            d="M440 210A80 80 0 0 1 520 290H440M322 365A70 70 0 0 0 392 435V365M610 300A61 61 0 0 0 671 361V300"
          />
          <path
            fill="#D1D4C4"
            stroke="#81917C"
            strokeWidth="2"
            d="M223 147h146v137H223zM221 405h126v76H221z"
          />
          <path
            fill="#F6F2E7"
            stroke="#81917C"
            strokeWidth="2"
            d="M233 157h57v32H233zM299 157h57v32H299zM233 412h46v26H233zM291 412h46v26H291z"
          />
          <rect x="480" y="160" width="66" height="84" rx="33" fill="#899C7F" />
          <circle cx="605" cy="192" r="36" fill="#92A386" />
          <circle cx="647" cy="237" r="26" fill="#748D70" />
          <rect
            x="473"
            y="333"
            width="60"
            height="145"
            rx="10"
            fill="#D5C7AB"
            stroke="#81917C"
            strokeWidth="2"
          />
          <rect x="489" y="349" width="27" height="112" rx="4" fill="#F5F0E3" />
          <path
            fill="#D3D9CF"
            stroke="#81917C"
            strokeWidth="2"
            d="M585 337h87v38H585zM586 395h44v90H586z"
          />
          <circle
            cx="648"
            cy="436"
            r="18"
            fill="#E8EADD"
            stroke="#81917C"
            strokeWidth="2"
          />
          <path
            fill="none"
            stroke="#758972"
            strokeWidth="2"
            d="M193 74H700M193 64v20M700 64v20M744 111V520M734 111h20M734 520h20"
          />
          <path
            stroke="#EEEDE2"
            strokeWidth="12"
            d="M263 110h76M571 110h65M190 228v70M290 520h50M700 400v50"
          />
          <path
            fill="none"
            stroke="#6E8572"
            strokeWidth="2"
            d="M798 480v-70l-13 19m13-19 13 19"
          />
          <circle
            cx="797"
            cy="460"
            r="29"
            fill="none"
            stroke="#6E8572"
            strokeWidth="1"
          />
          <path fill="none" stroke="#C6CBBB" strokeWidth="1" d="M140 570H750" />
        </>
      ) : view === 1 ? (
        <>
          <path fill="#E5DDCB" d="M0 0h900v640H0z" />
          <path fill="#EFEADB" d="M0 0H900L770 95H110Z" />
          <path fill="#C7B390" d="M0 520H900V640H0Z" />
          <path fill="#D8CEB8" d="M770 95H900V520H770Z" />
          <path fill="#F4EDD9" d="M110 95h660v425H110z" />
          <path fill="#A8B9A0" d="M430 153h286v299H430z" />
          <path fill="#476E58" d="M440 306c54-64 129-90 266-95v232H440z" />
          <path
            fill="#314F3A"
            d="M613 222c-45 74-59 145-42 220h46c17-71 6-147-4-220z"
          />
          <path
            fill="#C7B490"
            d="M412 140h19v323h-19zM710 140h18v323h-18zM423 140h291v14H423zM562 149h10v306h-10z"
          />
          <path fill="#F7F0DC" opacity=".6" d="m568 453 146 0 170 187H287Z" />
          <path fill="#D4C7AB" d="M0 547 900 532v39L0 619Z" />
          <path fill="#BCB795" d="M216 443h356l94 154H145Z" />
          <rect
            x="115"
            y="346"
            width="286"
            height="139"
            rx="30"
            fill={palette.accent}
          />
          <rect
            x="98"
            y="405"
            width="330"
            height="92"
            rx="21"
            fill={palette.side}
          />
          <rect
            x="117"
            y="373"
            width="119"
            height="77"
            rx="16"
            fill={palette.wall}
          />
          <rect
            x="252"
            y="373"
            width="123"
            height="77"
            rx="16"
            fill={palette.wall}
          />
          <path stroke="#745D44" strokeWidth="12" d="M130 489v34M392 489v34" />
          <ellipse cx="475" cy="507" rx="90" ry="30" fill="#887556" />
          <path stroke="#796648" strokeWidth="10" d="M428 517v48M523 517v35" />
          <ellipse cx="475" cy="502" rx="90" ry="26" fill="#B09A72" />
          <path fill="#EAE0C8" d="M464 452h23l-5 47h-14z" />
          <path
            stroke="#4B6A49"
            strokeWidth="3"
            d="M475 455v-45m0 20-15-13m15 3 12-19"
          />
          <path stroke="#685D4B" strokeWidth="2" d="M322 0v160" />
          <ellipse cx="322" cy="181" rx="61" ry="35" fill="#BEA983" />
          <path fill="#E3D3AE" d="M260 181h124c-8-23-110-23-124 0z" />
          <path fill="#CEC4AB" d="M762 397h77l-13 119h-51z" />
          <path
            fill="#557554"
            d="M799 405c-75-30-102-101-61-109 25-3 45 52 61 109m0 0c-30-101 14-157 37-120 9 26-19 81-37 120m0 0c54-88 93-63 69-32-19 16-40 29-69 32"
          />
          <rect x="173" y="173" width="119" height="109" fill="#D3C4A5" />
          <rect x="184" y="184" width="97" height="87" fill="#E9E2CE" />
          <circle cx="233" cy="220" r="26" fill="#B99B6C" />
        </>
      ) : (
        <>
          <path fill={`url(#${id}-sky)`} d="M0 0h900v640H0z" />
          <circle cx="722" cy="117" r="58" fill="#F4EBD3" opacity=".8" />
          <path
            fill="#B7C0A9"
            d="M0 329c156-40 283-59 473 4 169-44 279-24 427 9v166H0Z"
          />
          <path fill="#ADB798" d="M0 448h900v192H0z" />
          <path
            fill="#849570"
            d="M106 473 739 469l161 103-588 58Z"
            opacity=".55"
          />
          {property.type === "apartment" ? (
            <>
              <path fill={palette.side} d="M205 156h440v336H205Z" />
              <path fill={palette.wall} d="M156 140h440v328H156Z" />
              <path fill="#F1E9D7" d="M148 127h459v29H148z" />
              {[0, 1, 2].map((row) => (
                <g key={row} transform={`translate(0 ${row * 98})`}>
                  {[0, 1, 2].map((col) => (
                    <g key={col} transform={`translate(${col * 137} 0)`}>
                      <path
                        fill={`url(#${id}-glass)`}
                        d="M177 177h111v71H177z"
                      />
                      <path stroke="#819482" strokeWidth="3" d="M233 177v71" />
                    </g>
                  ))}
                  <path fill={palette.side} d="M143 247h467v13H143z" />
                  <path fill="#F0E5CE" d="M144 256h466v13H144z" />
                  <path
                    stroke="#819482"
                    strokeWidth="3"
                    d="M152 234h450m-431 0v15m61-15v15m61-15v15m61-15v15m61-15v15m61-15v15m61-15v15"
                  />
                </g>
              ))}
              <path fill={palette.accent} d="M622 208h58v284h-58z" />
              <path fill="#233F31" d="M306 385h109v80H306z" />
            </>
          ) : property.type === "townhouse" ? (
            <>
              <path fill={palette.side} d="M203 169H662V497H203Z" />
              <path fill={palette.wall} d="M157 150H616V478H157Z" />
              <path fill={`url(#${id}-brick)`} d="M157 150H616V478H157Z" />
              <path
                fill="#E6D4B3"
                d="M145 139h483v18H145zM145 320h483v17H145z"
              />
              {[0, 1, 2].map((col) => (
                <g key={col} transform={`translate(${col * 137} 0)`}>
                  <path
                    fill={`url(#${id}-glass)`}
                    d="M184 293V236a43 43 0 0 1 86 0v57Z"
                  />
                  <path
                    stroke="#B3BAA0"
                    strokeWidth="3"
                    d="M228 196v97M186 247h82"
                  />
                  <path fill="#284735" d="M184 462v-76a43 43 0 0 1 86 0v76Z" />
                  <path fill="#BB9F78" d="M229 346h4v114h-4z" />
                </g>
              ))}
              <path fill="#A38E70" d="M144 477h485v15H144z" />
            </>
          ) : (
            <>
              <path fill={palette.side} d="M454 167 699 189v249H454Z" />
              <path fill={palette.wall} d="M401 154h255v267H401Z" />
              <path fill="#F0E6CF" d="M393 141h274v25H393z" />
              <path fill={palette.side} d="M162 297h544v190H162Z" />
              <path fill={palette.wall} d="M125 276h525v195H125Z" />
              <path fill="#F2E8D1" d="M111 264h550v28H111z" />
              <path
                fill={`url(#${id}-glass)`}
                d="M159 320h215v151H159zM443 197h158v66H443z"
              />
              <path
                stroke="#B2B79F"
                strokeWidth="4"
                d="M265 320v149M494 197v65M546 197v65"
              />
              <path fill={palette.accent} d="M414 317h177v154H414Z" />
              {Array.from({ length: 14 }, (_, i) => (
                <path
                  key={i}
                  stroke="#C1AD8C"
                  strokeWidth="3"
                  d={`M${420 + i * 12} 318v151`}
                />
              ))}
              <path fill={palette.side} d="M106 476h555v18H106Z" />
              <path fill="#DFD4BB" d="M85 494h598v15H85Z" />
            </>
          )}
          <path fill="#E3DAC2" d="M0 521h900v119H0z" />
          <path fill="#90AAA0" d="m94 552 461 0 168 88H0Z" />
          <path fill="#769F96" d="m90 562 458 0 144 78H0Z" />
          <path
            fill="none"
            stroke="#D5E2CE"
            strokeWidth="2"
            opacity=".7"
            d="M66 585h509M20 615h611M227 564 148 640M381 564l21 76"
          />
          <path fill="#B0A488" d="m681 516 84 0 68 124h-77Z" />
          {[
            { x: 75, y: 323, s: 1 },
            { x: 764, y: 274, s: 1.23 },
            { x: 824, y: 345, s: 0.83 },
          ].map((tree, i) => (
            <g
              key={i}
              transform={`translate(${tree.x} ${tree.y}) scale(${tree.s})`}
            >
              <path stroke="#716C4B" strokeWidth="11" d="M0 19v187" />
              <path
                fill="#4F6D4D"
                d="M-5-60c-27 19-35 80-41 111-15 58 23 87 46 56 37 29 63-2 45-62C30 12 18-41-5-60Z"
              />
              <path
                fill="#66815A"
                d="M-5-60c-22 60-26 145 5 167 10-69 10-113-5-167Z"
              />
            </g>
          ))}
          <path fill="#70835C" d="M588 506c45-24 112-11 136 13l-127 2Z" />
        </>
      )}
    </svg>
  );
}
