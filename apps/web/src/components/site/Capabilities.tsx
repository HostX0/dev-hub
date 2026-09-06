import { MotionControls } from "@/components/ui/MotionControls";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { getDict, type Locale } from "@/i18n";
import {
  AiChatDemo,
  AutomationFlowDemo,
  CodeDemo,
  MetricsDemo,
  IntegrationsDemo,
} from "./CapabilityDemos";

/** Bento grid of interactive demos: AI agent chat, automation flow, code quality, data metrics, integrations. */
export function Capabilities({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const c = t.capabilities;
  return (
    <section id="capabilities" className="relative section-pad">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-sm mask-radial opacity-40" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />
      </div>
      <div className="container-x">
        <SectionHeading
          eyebrow={`03 / ${c.eyebrow}`}
          title={
            <>
              {c.title}
              <span className="text-gradient-brand">{c.titleAccent}</span>
            </>
          }
          description={c.description}
        />
        <MotionControls>
          <Stagger className="grid gap-4 md:grid-cols-6" stagger={0.08}>
            <StaggerItem className="md:col-span-3 lg:col-span-3">
              <Card title={c.ai.title} text={c.ai.text}>
                <AiChatDemo />
              </Card>
            </StaggerItem>
            <StaggerItem className="md:col-span-3 lg:col-span-3">
              <Card title={c.automation.title} text={c.automation.text}>
                <AutomationFlowDemo />
              </Card>
            </StaggerItem>
            <StaggerItem className="md:col-span-3 lg:col-span-2">
              <Card title={c.code.title} text={c.code.text}>
                <CodeDemo />
              </Card>
            </StaggerItem>
            <StaggerItem className="md:col-span-3 lg:col-span-2">
              <Card title={c.data.title} text={c.data.text}>
                <MetricsDemo />
              </Card>
            </StaggerItem>
            <StaggerItem className="md:col-span-6 lg:col-span-2">
              <Card title={c.integrations.title} text={c.integrations.text}>
                <IntegrationsDemo />
              </Card>
            </StaggerItem>
          </Stagger>
        </MotionControls>
      </div>
    </section>
  );
}

function Card({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden">
      <div className="relative min-h-[240px] flex-1 overflow-hidden border-b border-line bg-surface/60 p-5">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-20" />
        {children}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-2 text-sm leading-[1.8] text-muted">{text}</p>
      </div>
    </article>
  );
}
