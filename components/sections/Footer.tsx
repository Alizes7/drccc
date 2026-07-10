export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-charcoal py-14 text-ivory/70">
      <div className="container-editorial">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-xl text-ivory">DRC Advogados</p>
            <p className="mt-2 max-w-md font-sans text-xs leading-relaxed text-ivory/50">
              Este site tem caráter exclusivamente informativo, em conformidade
              com o Código de Ética e Disciplina da OAB e o Provimento nº
              94/2000 do Conselho Federal da OAB, que disciplina a publicidade
              na advocacia. Não constitui, em nenhuma hipótese, promessa de
              resultado.
            </p>
          </div>
          <p className="font-mono text-xs text-ivory/40">
            © {year} DRC Advogados. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
