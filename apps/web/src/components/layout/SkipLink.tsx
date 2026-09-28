/** Figma: skiplink (152:2533). Primeiro elemento focável da página. */
export function SkipLink() {
  return (
    <a
      href="#conteudo"
      className="sr-only rounded-sm bg-primary px-4 py-2 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50"
    >
      Ir para o conteúdo
    </a>
  );
}
