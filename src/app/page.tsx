import { FINE_PRINT, ORDER, ROUTE, STICKERS, TAPES } from "@/components/home/content";
import { FleurRow } from "@/components/home/FleurRow";
import { Hero } from "@/components/home/Hero";
import { HoustonLetter } from "@/components/home/HoustonLetter";
import { Masthead } from "@/components/home/Masthead";
import { RiverRoute } from "@/components/home/RiverRoute";
import { OrderSection } from "@/components/order/OrderSection";
import { ZineFooter } from "@/components/zine/Footer";
import { NoteBoard } from "@/components/zine/NoteBoard";
import { Section } from "@/components/zine/Section";
import { Tape } from "@/components/zine/Tape";
import { ZinePage } from "@/components/zine/ZinePage";
import { getMenu } from "@/lib/menu";

export default async function Home() {
  const menu = await getMenu();
  return (
    <ZinePage stickers={STICKERS}>
      <Masthead />
      <Hero />
      <Section title={ROUTE.title} kicker={ROUTE.kicker}>
        <RiverRoute steps={ROUTE.steps} tipLabel={ROUTE.tipLabel} />
      </Section>
      <Tape text={TAPES.order} tone="blue" reverse />
      <OrderSection menu={menu} copy={ORDER} />
      <HoustonLetter />
      <Tape text={TAPES.finePrint} tone="red" seconds={66} />
      <Section title={FINE_PRINT.title} kicker={FINE_PRINT.kicker} width={1180}>
        <NoteBoard notes={FINE_PRINT.notes} />
      </Section>
      <Tape text={TAPES.footer} tone="ink" reverse seconds={60} />
      <ZineFooter extra={<FleurRow />} />
    </ZinePage>
  );
}
