"use client";
import { createContext, useContext, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useI18n } from "@/i18n/client";
const MotionPaused = createContext(false);
export const useMotionPaused = () => useContext(MotionPaused);
export function MotionControls({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false),
    reduced = useReducedMotion();
  const { locale } = useI18n();
  const stop = paused || !!reduced;
  const labels =
    locale === "ar"
      ? ["إيقاف الحركة", "تشغيل الحركة", "الحركة مخففة حسب تفضيلات جهازك"]
      : locale === "ckb"
        ? [
            "ڕاگرتنی جوڵە",
            "دەستپێکردنی جوڵە",
            "جوڵە بەپێی هەڵبژاردەی ئامێرەکەت کەمکراوەتەوە",
          ]
        : [
            "Pause animation",
            "Play animation",
            "Motion reduced to match your device preference",
          ];
  return (
    <MotionPaused.Provider value={stop}>
      <div
        className="motion-region"
        data-motion-paused={stop ? "true" : undefined}
      >
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            disabled={!!reduced}
            aria-pressed={stop}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-xs text-muted transition-colors hover:bg-brand/10 hover:text-fg disabled:cursor-default"
          >
            {stop ? (
              <Play className="size-3.5" />
            ) : (
              <Pause className="size-3.5" />
            )}
            {reduced ? labels[2] : labels[stop ? 1 : 0]}
          </button>
        </div>
        {children}
      </div>
    </MotionPaused.Provider>
  );
}
