"use client";

import { useId } from "react";
import type { RetailProduct } from "./types";

/** Original product studies, shared by cards and their detail dialog. */
export function ProductVisual({
  product,
  className = "",
}: {
  product: RetailProduct;
  className?: string;
}) {
  const id = `product-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const fill = (name: string) => `url(#${id}-${name})`;
  const body = fill("body");
  const metal = fill("metal");
  const glass = fill("glass");
  const light = fill("light");

  const illustration = (() => {
    switch (product.visual) {
      case "fridge":
        return (
          <g>
            <ellipse cx="207" cy="309" rx="89" ry="10" fill={fill("shadow")} />
            <path d="m271 40 18 10v245l-18 9Z" fill={product.color} />
            <path d="m271 40 18 10v245l-18 9Z" fill="#173026" opacity=".19" />
            <rect
              x="122"
              y="40"
              width="151"
              height="264"
              rx="11"
              fill={body}
              stroke="#8B9992"
              strokeWidth="1.1"
            />
            <path
              d="M128 190h140M204 47v136"
              stroke="#64756C"
              strokeOpacity=".5"
            />
            <path
              d="M130 48h134M130 197h134"
              stroke="white"
              strokeOpacity=".7"
            />
            <rect x="135" y="72" width="39" height="58" rx="5" fill={glass} />
            <path
              d="M144 83h20M144 88h13"
              stroke="#9FCAB6"
              strokeWidth="1.5"
              opacity=".85"
            />
            <circle cx="155" cy="116" r="2" fill="#BADBC9" />
            <rect x="188" y="97" width="5" height="67" rx="2.5" fill={metal} />
            <rect x="215" y="97" width="5" height="67" rx="2.5" fill={metal} />
            <rect
              x="143"
              y="204"
              width="108"
              height="5"
              rx="2.5"
              fill={metal}
            />
            <path d="M131 48v245" stroke="white" strokeOpacity=".45" />
            <path d="M143 283h109" stroke="#53685D" strokeOpacity=".18" />
            <rect x="140" y="302" width="20" height="5" rx="2" fill="#31413A" />
            <rect x="240" y="302" width="20" height="5" rx="2" fill="#31413A" />
          </g>
        );
      case "washer":
        return (
          <g>
            <ellipse cx="202" cy="301" rx="108" ry="13" fill={fill("shadow")} />
            <path d="m289 65 16 16v208l-16 8Z" fill="#87978E" />
            <rect
              x="99"
              y="65"
              width="192"
              height="232"
              rx="12"
              fill={body}
              stroke="#A8B2AC"
            />
            <path
              d="M104 123h182M110 284h170"
              stroke="#86968D"
              strokeOpacity=".5"
            />
            <rect
              x="113"
              y="84"
              width="53"
              height="23"
              rx="4"
              fill="#EFF3EF"
              fillOpacity=".8"
              stroke="#B6C1B9"
            />
            <path d="M121 90h34" stroke="white" strokeWidth="2" />
            <circle cx="203" cy="95" r="17" fill={metal} stroke="#8A9992" />
            <circle cx="203" cy="95" r="12" fill="#E3E8E3" />
            <path
              d="M203 85v6"
              stroke="#56675E"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect x="240" y="81" width="35" height="29" rx="4" fill={glass} />
            <path
              d="M247 91h6m5 0h8m-19 6h12"
              stroke="#B5DACA"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="195"
              cy="205"
              r="67"
              fill={metal}
              stroke="#9CA9A1"
              strokeWidth="1.5"
            />
            <circle
              cx="195"
              cy="205"
              r="56"
              fill={glass}
              stroke="#53635C"
              strokeWidth="3"
            />
            <circle cx="195" cy="205" r="42" fill="#3B4C4A" />
            <path
              d="M153 209c18-30 35 18 54 0s22-11 28-1v15c-17 33-60 34-80 2Z"
              fill={product.color}
              opacity=".78"
            />
            <path
              d="M159 217c13-12 29 17 47-1 9-9 21-7 28-3"
              stroke="#DFE8E1"
              strokeWidth="5"
              strokeOpacity=".6"
              fill="none"
            />
            <path
              d="M155 187a45 45 0 0 1 51-25"
              stroke="white"
              strokeWidth="4"
              strokeOpacity=".5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M239 192v26"
              stroke="#E2E9E3"
              strokeWidth="5"
              strokeLinecap="round"
              opacity=".8"
            />
            <circle cx="269" cy="273" r="5" fill="#C5CEC6" stroke="#94A499" />
          </g>
        );
      case "oven":
        return (
          <g>
            <ellipse cx="205" cy="296" rx="109" ry="13" fill={fill("shadow")} />
            <path d="m293 60 13 11v215l-13 7Z" fill="#68776F" />
            <rect
              x="95"
              y="60"
              width="201"
              height="232"
              rx="8"
              fill={body}
              stroke="#829087"
            />
            <path d="M99 119h192" stroke="#65746D" strokeOpacity=".6" />
            <circle cx="136" cy="91" r="15" fill={metal} stroke="#84938C" />
            <circle cx="254" cy="91" r="15" fill={metal} stroke="#84938C" />
            <path
              d="M136 80v6m118-6v6"
              stroke="#526158"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect x="174" y="77" width="43" height="29" rx="3" fill={glass} />
            <path
              d="M183 89h9m6 0h9m-24 6h24"
              stroke="#BCD5C7"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <rect
              x="106"
              y="132"
              width="179"
              height="148"
              rx="5"
              fill={glass}
            />
            <rect
              x="121"
              y="159"
              width="149"
              height="103"
              rx="5"
              fill="#24332F"
              stroke="#41514A"
            />
            <path
              d="M129 182h132m-132 35h132m-132 25h132"
              stroke="#718078"
              strokeWidth="2"
              opacity=".8"
            />
            <path
              d="m133 242 25-60m17 60 20-60m19 60 20-60m17 60 9-35"
              stroke="#56645D"
              opacity=".7"
            />
            <circle
              cx="195"
              cy="202"
              r="20"
              fill="none"
              stroke="#81918A"
              opacity=".6"
            />
            <path
              d="M195 182c15 13 15 26 0 40-15-13-15-27 0-40Zm-20 20c14-15 28-15 40 0-14 15-27 15-40 0Z"
              fill="#718178"
              opacity=".5"
            />
            <path
              d="M117 145h157"
              stroke="#26332D"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M117 143h157"
              stroke={metal}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path d="m126 161 29 1-30 95" fill="white" opacity=".06" />
          </g>
        );
      case "coffee":
        return (
          <g>
            <ellipse cx="202" cy="303" rx="105" ry="13" fill={fill("shadow")} />
            <path
              d="M124 79q0-17 17-17h111q23 0 27 20l9 201H115Z"
              fill={body}
              stroke="#A69681"
            />
            <path
              d="M134 78h122"
              stroke="white"
              strokeWidth="3"
              opacity=".65"
            />
            <rect x="132" y="83" width="130" height="55" rx="10" fill={metal} />
            <circle
              cx="197"
              cy="109"
              r="16"
              fill="#F2F0E6"
              stroke="#728177"
              strokeWidth="3"
            />
            <path
              d="M197 109l8-7"
              stroke="#45594D"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="151" cy="109" r="5" fill="#607568" />
            <circle cx="243" cy="109" r="5" fill="#607568" />
            <path d="M145 144h103v105H145Z" fill={glass} />
            <rect x="174" y="145" width="46" height="18" rx="5" fill={metal} />
            <path
              d="M189 161v10m18-10v10"
              stroke="#68786F"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M218 153h52"
              stroke="#263A30"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M257 161v39q0 13-13 13"
              fill="none"
              stroke={metal}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M231 207h7q14 0 14 12t-19 12"
              fill="none"
              stroke="#F2EEE2"
              strokeWidth="7"
            />
            <path
              d="M171 201h63l-5 37q-2 9-26 9t-27-9Z"
              fill="#F3F0E6"
              stroke="#D0CBBE"
            />
            <ellipse cx="202" cy="202" rx="31" ry="5" fill="#D8CFBD" />
            <ellipse cx="202" cy="202" rx="25" ry="3" fill="#654934" />
            <path
              d="M188 178v19m20-19v19"
              stroke="#917050"
              strokeWidth="1.4"
              opacity=".8"
            />
            <rect
              x="112"
              y="249"
              width="178"
              height="41"
              rx="10"
              fill={body}
              stroke="#A69681"
            />
            <rect
              x="123"
              y="256"
              width="155"
              height="21"
              rx="6"
              fill="#849189"
            />
            {Array.from({ length: 12 }, (_, i) => (
              <path
                key={i}
                d={`M${132 + i * 12} 260v13`}
                stroke="#DCE0D6"
                strokeWidth="3"
              />
            ))}
          </g>
        );
      case "vacuum":
        return (
          <g>
            <ellipse cx="194" cy="307" rx="93" ry="11" fill={fill("shadow")} />
            <g transform="rotate(13 201 174)">
              <path
                d="M218 114V60q0-13 12-13h13q11 0 11 11v43"
                fill="none"
                stroke="#374B41"
                strokeWidth="12"
              />
              <path
                d="M219 84V60q0-11 11-11h9"
                fill="none"
                stroke={product.color}
                strokeWidth="7"
              />
              <rect
                x="179"
                y="88"
                width="71"
                height="54"
                rx="24"
                fill={body}
                stroke="#7E8D80"
              />
              <ellipse
                cx="185"
                cy="115"
                rx="20"
                ry="26"
                fill={metal}
                stroke="#7A8A7E"
              />
              <ellipse cx="185" cy="115" rx="13" ry="18" fill={glass} />
              <path
                d="M179 103v24m6-27v30m6-25v22"
                stroke="#738D7C"
                strokeWidth="2"
              />
              <rect
                x="198"
                y="138"
                width="38"
                height="54"
                rx="10"
                fill="#C2CDC3"
                fillOpacity=".6"
                stroke="#8A9C8B"
              />
              <path
                d="M205 146v34m23-34v34"
                stroke="white"
                strokeOpacity=".5"
                strokeWidth="2"
              />
              <path d="M207 151h20v30h-20Z" fill={product.color} opacity=".5" />
              <rect
                x="202"
                y="183"
                width="30"
                height="14"
                rx="5"
                fill="#485E50"
              />
              <path d="M217 197v83" stroke="#768A7D" strokeWidth="12" />
              <path d="M214 197v80" stroke="#D5DDD7" strokeWidth="4" />
              <path
                d="M217 276v12"
                stroke="#314B3B"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <rect
                x="151"
                y="283"
                width="135"
                height="25"
                rx="9"
                fill={body}
                stroke="#7C907F"
              />
              <path
                d="M162 302h113"
                stroke="#2E4537"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path d="M165 290h99" stroke="#E1E7E0" strokeWidth="2" />
              <circle cx="239" cy="115" r="4" fill="#5A7662" />
            </g>
          </g>
        );
      case "ac":
        return (
          <g>
            <ellipse
              cx="198"
              cy="259"
              rx="149"
              ry="14"
              fill={fill("shadow")}
              opacity=".7"
            />
            <path
              d="m53 119 11-12h264q18 0 22 17v78l-12 11H63q-13 0-13-13Z"
              fill="#B2BBAE"
            />
            <rect
              x="48"
              y="117"
              width="294"
              height="98"
              rx="20"
              fill={body}
              stroke="#ABB4AA"
            />
            <path
              d="M69 126h252"
              stroke="white"
              strokeWidth="3"
              strokeOpacity=".7"
              strokeLinecap="round"
            />
            <path d="M52 179q143 12 286 0" stroke="#B0BBAF" fill="none" />
            <path d="M72 185h245l-10 19H81Z" fill={glass} />
            <path
              d="M78 190h234m-231 5h229m-226 5h222"
              stroke="#8E9D90"
              strokeWidth="2"
            />
            <path
              d="M279 153h13m-10 5h10"
              stroke="#718B78"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="310" cy="156" r="2" fill="#739A7A" />
            <path
              d="M112 225v11m41-11v21m42-21v27m42-27v21m41-21v11"
              stroke="#7D9984"
              strokeWidth="2"
              strokeOpacity=".25"
              strokeLinecap="round"
            />
            <g transform="rotate(12 310 263)">
              <rect
                x="296"
                y="227"
                width="29"
                height="72"
                rx="7"
                fill="#F1F3EB"
                stroke="#BAC5B9"
              />
              <rect
                x="302"
                y="235"
                width="17"
                height="15"
                rx="2"
                fill="#C3D1C0"
              />
              <circle cx="310" cy="261" r="4" fill="#8AA18C" />
              <path
                d="M304 273h12m-12 7h12"
                stroke="#AAB6A7"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          </g>
        );
      case "phone":
        return (
          <g>
            <ellipse cx="207" cy="306" rx="113" ry="15" fill={fill("shadow")} />
            <g transform="rotate(-11 157 171)">
              <rect
                x="89"
                y="49"
                width="135"
                height="244"
                rx="25"
                fill={metal}
                stroke="#87979E"
              />
              <rect
                x="93"
                y="52"
                width="127"
                height="237"
                rx="22"
                fill={body}
              />
              <path d="M99 74v193" stroke="white" opacity=".35" />
              <rect
                x="105"
                y="64"
                width="65"
                height="79"
                rx="18"
                fill={product.color}
                stroke="white"
                strokeOpacity=".5"
              />
              <circle cx="123" cy="84" r="12" fill={metal} />
              <circle cx="123" cy="84" r="9" fill={glass} />
              <circle cx="123" cy="84" r="4" fill="#3D5764" />
              <circle cx="120" cy="81" r="2" fill="#93B2C4" opacity=".7" />
              <circle cx="123" cy="122" r="12" fill={metal} />
              <circle cx="123" cy="122" r="9" fill={glass} />
              <circle cx="123" cy="122" r="4" fill="#324F65" />
              <circle cx="120" cy="119" r="2" fill="#B0C7D5" opacity=".6" />
              <circle cx="151" cy="102" r="12" fill={metal} />
              <circle cx="151" cy="102" r="9" fill={glass} />
              <circle cx="151" cy="102" r="4" fill="#486275" />
              <circle cx="151" cy="78" r="4" fill="#F3EAD3" />
              <path
                d="M90 112v31"
                stroke="#526571"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
            <g transform="rotate(11 248 176)">
              <rect
                x="181"
                y="54"
                width="132"
                height="246"
                rx="25"
                fill={metal}
                stroke="#9EADB6"
              />
              <rect
                x="185"
                y="58"
                width="124"
                height="238"
                rx="23"
                fill="#111923"
              />
              <g clipPath={fill("screen-clip")}>
                <rect
                  x="190"
                  y="63"
                  width="114"
                  height="228"
                  fill={fill("screen")}
                />
                <ellipse
                  cx="232"
                  cy="182"
                  rx="96"
                  ry="101"
                  fill="#C9C2FC"
                  opacity=".55"
                />
                <ellipse
                  cx="272"
                  cy="210"
                  rx="88"
                  ry="81"
                  fill="#D9E8E8"
                  opacity=".72"
                />
                <path
                  d="M171 201c71-77 122-33 159 13v89H171Z"
                  fill="#33346D"
                  opacity=".85"
                />
                <path
                  d="M176 224c45-54 107-67 148-15"
                  stroke="#DDD9FF"
                  strokeWidth="2"
                  strokeOpacity=".4"
                  fill="none"
                />
              </g>
              <rect
                x="229"
                y="70"
                width="37"
                height="8"
                rx="4"
                fill="#111923"
              />
              <path
                d="M232 283h30"
                stroke="white"
                strokeWidth="3"
                strokeOpacity=".7"
                strokeLinecap="round"
              />
              <path
                d="M314 121v27"
                stroke="#7A8A9A"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path d="M195 88v169" stroke="white" opacity=".08" />
            </g>
          </g>
        );
      case "buds":
        return (
          <g>
            <ellipse cx="201" cy="301" rx="101" ry="12" fill={fill("shadow")} />
            <rect
              x="115"
              y="182"
              width="171"
              height="111"
              rx="43"
              fill={body}
              stroke="#A6B7B8"
            />
            <path d="M117 208h167" stroke="#8FA8AB" strokeOpacity=".7" />
            <path
              d="M131 197q68-19 139 0"
              fill="none"
              stroke="white"
              strokeOpacity=".7"
              strokeWidth="3"
            />
            <rect
              x="184"
              y="274"
              width="32"
              height="4"
              rx="2"
              fill="#718C90"
              opacity=".6"
            />
            <circle cx="200" cy="234" r="2.5" fill="#587A6A" />
            <g transform="rotate(-22 149 119)">
              <path
                d="M143 108h22v49q0 13-11 13t-11-13Z"
                fill={body}
                stroke="#A8BABC"
              />
              <ellipse
                cx="147"
                cy="104"
                rx="26"
                ry="29"
                fill={body}
                stroke="#AEC0C3"
              />
              <ellipse cx="128" cy="103" rx="8" ry="16" fill="#81999E" />
              <ellipse cx="128" cy="103" rx="4" ry="11" fill={glass} />
              <path
                d="M158 127v26"
                stroke="white"
                strokeWidth="3"
                opacity=".65"
                strokeLinecap="round"
              />
            </g>
            <g transform="rotate(24 251 119)">
              <path
                d="M238 108h22v49q0 13-11 13t-11-13Z"
                fill={body}
                stroke="#A8BABC"
              />
              <ellipse
                cx="256"
                cy="104"
                rx="26"
                ry="29"
                fill={body}
                stroke="#AEC0C3"
              />
              <ellipse cx="275" cy="103" rx="8" ry="16" fill="#81999E" />
              <ellipse cx="275" cy="103" rx="4" ry="11" fill={glass} />
              <path
                d="M245 127v26"
                stroke="white"
                strokeWidth="3"
                opacity=".65"
                strokeLinecap="round"
              />
            </g>
          </g>
        );
      case "watch":
        return (
          <g>
            <ellipse cx="205" cy="315" rx="80" ry="10" fill={fill("shadow")} />
            <g transform="rotate(-9 201 170)">
              <rect
                x="166"
                y="26"
                width="76"
                height="292"
                rx="30"
                fill={body}
                stroke="#AC9F91"
              />
              <path
                d="M172 43v59m64-59v59m-64 143v53m64-53v53"
                stroke="white"
                strokeOpacity=".2"
              />
              {[258, 271, 284, 297].map((y) => (
                <rect
                  key={y}
                  x="199"
                  y={y}
                  width="11"
                  height="5"
                  rx="2.5"
                  fill="#9A8A78"
                  opacity=".6"
                />
              ))}
              <rect
                x="133"
                y="97"
                width="142"
                height="148"
                rx="40"
                fill={metal}
                stroke="#8E958F"
                strokeWidth="1.5"
              />
              <rect
                x="139"
                y="103"
                width="130"
                height="136"
                rx="35"
                fill={glass}
              />
              <rect
                x="273"
                y="137"
                width="9"
                height="22"
                rx="4"
                fill={metal}
                stroke="#8D968F"
              />
              <circle
                cx="204"
                cy="170"
                r="46"
                fill="#192528"
                stroke="#38494B"
              />
              {Array.from({ length: 12 }, (_, i) => (
                <path
                  key={i}
                  d="M204 130v6"
                  stroke={i % 3 === 0 ? "#EAE1D1" : "#829799"}
                  strokeWidth={i % 3 === 0 ? "3" : "2"}
                  strokeLinecap="round"
                  transform={`rotate(${i * 30} 204 170)`}
                />
              ))}
              <path
                d="m182 147 22 23 19-29"
                stroke="#F2EEE3"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="m204 170 9 25"
                stroke={product.color}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="204" cy="170" r="4" fill="#E2CFB4" />
              <path
                d="M164 126q-15 8-15 29"
                stroke="white"
                strokeOpacity=".35"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M177 221h54"
                stroke="#537376"
                strokeWidth="3"
                strokeLinecap="round"
                opacity=".45"
              />
            </g>
          </g>
        );
      case "charger":
        return (
          <g>
            <ellipse cx="210" cy="298" rx="114" ry="13" fill={fill("shadow")} />
            <path
              d="M166 206c-70-23-103 55-49 71 34 10 62-21 30-37-24-12-47 9-25 24"
              fill="none"
              stroke="#A9B8CE"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M166 204c-70-23-103 55-49 71"
              fill="none"
              stroke="#E4EAF2"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <g transform="rotate(10 228 177)">
              <path d="m263 102 29 20v133l-29 20Z" fill={product.color} />
              <path
                d="m263 102 29 20v133l-29 20Z"
                fill="#374560"
                opacity=".25"
              />
              <rect
                x="160"
                y="101"
                width="106"
                height="174"
                rx="24"
                fill={body}
                stroke="#8B9EB9"
              />
              <rect
                x="181"
                y="66"
                width="11"
                height="41"
                rx="5"
                fill={metal}
                stroke="#98A4AD"
              />
              <rect
                x="235"
                y="66"
                width="11"
                height="41"
                rx="5"
                fill={metal}
                stroke="#98A4AD"
              />
              <path
                d="M178 116q35-7 69 0"
                stroke="white"
                strokeWidth="3"
                strokeOpacity=".55"
                fill="none"
              />
              <rect
                x="190"
                y="220"
                width="44"
                height="17"
                rx="7"
                fill={glass}
              />
              <path
                d="M199 228h26"
                stroke="#71849F"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="m213 161-9 17h13l-8 15"
                stroke="#526B96"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path d="M171 134v100" stroke="white" strokeOpacity=".28" />
            </g>
            <g transform="rotate(-26 143 248)">
              <rect
                x="128"
                y="235"
                width="29"
                height="19"
                rx="5"
                fill={body}
                stroke="#8397B1"
              />
              <rect
                x="153"
                y="239"
                width="15"
                height="11"
                rx="3"
                fill={metal}
                stroke="#8998AA"
              />
            </g>
          </g>
        );
      case "case":
        return (
          <g>
            <ellipse cx="201" cy="304" rx="90" ry="12" fill={fill("shadow")} />
            <g transform="rotate(12 199 169)">
              <g mask={fill("case-cutout")}>
                <rect
                  x="121"
                  y="42"
                  width="153"
                  height="253"
                  rx="32"
                  fill={body}
                  stroke="#839A82"
                  strokeWidth="2"
                />
                <rect
                  x="128"
                  y="49"
                  width="139"
                  height="239"
                  rx="27"
                  fill={product.color}
                />
                <rect
                  x="133"
                  y="55"
                  width="129"
                  height="228"
                  rx="24"
                  fill={light}
                />
                <path
                  d="M129 71v190"
                  stroke="white"
                  strokeOpacity=".45"
                  strokeWidth="2"
                />
                <circle
                  cx="198"
                  cy="193"
                  r="38"
                  fill="none"
                  stroke="#F5F8EB"
                  strokeWidth="7"
                  strokeOpacity=".65"
                />
                <path
                  d="M185 245h26"
                  stroke="#F5F8EB"
                  strokeWidth="7"
                  strokeOpacity=".65"
                  strokeLinecap="round"
                />
              </g>
              <rect
                x="138"
                y="60"
                width="59"
                height="69"
                rx="15"
                fill="none"
                stroke="#7F987D"
                strokeWidth="5"
              />
              <rect
                x="140"
                y="62"
                width="55"
                height="65"
                rx="13"
                fill="none"
                stroke="#DCE7D6"
                strokeWidth="1.5"
              />
              <path
                d="M121 120v29m153-27v32"
                stroke="#839980"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M184 290h29"
                stroke="#71886D"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          </g>
        );
    }
  })();

  return (
    <svg
      viewBox="0 0 400 340"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`block h-full w-full ${className}`}
    >
      <defs>
        <linearGradient
          id={`${id}-body`}
          x1=".08"
          y1="0"
          x2=".95"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset=".2" stopColor={product.color} />
          <stop offset=".57" stopColor={product.color} />
          <stop offset=".78" stopColor="#FFFFFF" stopOpacity=".7" />
          <stop offset="1" stopColor={product.color} />
        </linearGradient>
        <linearGradient
          id={`${id}-metal`}
          x1="0"
          y1="0"
          x2="1"
          y2=".8"
          gradientUnits="objectBoundingBox"
        >
          <stop stopColor="#DDE4E5" />
          <stop offset=".18" stopColor="#FFFFFF" />
          <stop offset=".46" stopColor="#A6B3B5" />
          <stop offset=".7" stopColor="#E7EBE8" />
          <stop offset="1" stopColor="#829397" />
        </linearGradient>
        <linearGradient
          id={`${id}-glass`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop stopColor="#4B5E64" />
          <stop offset=".32" stopColor="#1D2B32" />
          <stop offset="1" stopColor="#0C151B" />
        </linearGradient>
        <linearGradient
          id={`${id}-light`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop stopColor="white" stopOpacity=".1" />
          <stop offset=".5" stopColor="white" stopOpacity=".32" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`${id}-screen`}
          x1="190"
          y1="63"
          x2="302"
          y2="290"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#233B5D" />
          <stop offset=".55" stopColor={product.color} />
          <stop offset="1" stopColor="#7265B4" />
        </linearGradient>
        <radialGradient id={`${id}-shadow`}>
          <stop stopColor="#1C2A31" stopOpacity=".2" />
          <stop offset=".58" stopColor="#1C2A31" stopOpacity=".07" />
          <stop offset="1" stopColor="#1C2A31" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-screen-clip`}>
          <rect x="190" y="63" width="114" height="228" rx="19" />
        </clipPath>
        <mask id={`${id}-case-cutout`}>
          <rect width="400" height="340" fill="white" />
          <rect x="138" y="60" width="59" height="69" rx="15" fill="black" />
        </mask>
      </defs>
      {illustration}
    </svg>
  );
}
