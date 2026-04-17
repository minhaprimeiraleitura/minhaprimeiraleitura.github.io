(function() {
    // 1. Captura os parâmetros da URL atual apenas uma vez
    const currentQueryParams = window.location.search;
    if (!currentQueryParams) return;

    // Remove o '?' inicial para facilitar a concatenação
    const cleanParams = currentQueryParams.startsWith('?') ? currentQueryParams.substring(1) : currentQueryParams;

    // 2. Função que aplica os parâmetros a um botão
    const updateButton = (button) => {
        // Verifica se já adicionamos os parâmetros para não duplicar (evita loops)
        if (button.dataset.paramsAdded === "true") return;

        let href = button.getAttribute('href');
        if (href) {
            const connector = href.includes('?') ? '&' : '?';
            button.setAttribute('href', href + connector + cleanParams);
            
            // Marca o botão como "atualizado"
            button.dataset.paramsAdded = "true";
        }
    };

    // 3. Função que procura botões e atualiza
    const applyToAll = () => {
        // Seleciona por ID (como solicitado) ou Classe (recomendado)
        const targets = document.querySelectorAll('#add-prd, .add-prd');
        targets.forEach(updateButton);
    };

    // 4. Inicia o Observador: ele vigia se novos elementos entram no HTML
    const observer = new MutationObserver((mutations) => {
        applyToAll();
    });

    // Configura o observador para olhar todo o "corpo" do site
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Executa uma vez no início (para os botões que já estão lá)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyToAll);
    } else {
        applyToAll();
    }
})();