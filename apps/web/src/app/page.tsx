import { CatalogList } from "@/components/indicators/CatalogList";
import { PageHeader } from "@/components/layout/PageHeader";
import { Message } from "@/components/ui/message";
import { api } from "@/lib/api";

export default async function CatalogoPage() {
  const [temas, indicadores] = await Promise.all([api.temas(), api.indicadores()]);
  const resumos = Object.fromEntries(
    await Promise.all(indicadores.map(async (i) => [i.id, await api.resumo(i.id)] as const)),
  );

  return (
    <>
      <PageHeader
        titulo="Indicadores"
        descricao="Consulte os indicadores acompanhados pelo CNIE, com a série histórica, a distribuição por UF e a ficha técnica de cada um."
      />
      <Message state="warning" title="Ambiente de desenvolvimento" className="mb-8">
        Os valores exibidos são fictícios e servem apenas para validar a interface. As fichas técnicas ainda são
        hipóteses a validar com a área técnica.
      </Message>
      <CatalogList temas={temas} indicadores={indicadores} resumos={resumos} />
    </>
  );
}
