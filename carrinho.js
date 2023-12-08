// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(produtoId) {
    console.log('Tentativa de adicionar ao carrinho:', produtoId);

    // Recupera os itens do carrinho armazenados no localStorage
    const carrinhoItems = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Verifica se o produto já está no carrinho
    const produtoExistente = carrinhoItems.find(item => item.id === produtoId);

    if (produtoExistente) {
        // Se o produto já estiver no carrinho, aumenta a quantidade
        produtoExistente.quantidade += 1;
    } else {
        // Se o produto não estiver no carrinho, adiciona um novo item
        carrinhoItems.push({ id: produtoId, quantidade: 1 });
    }

    // Atualiza o localStorage com os itens do carrinho
    localStorage.setItem("carrinho", JSON.stringify(carrinhoItems));

    // Atualiza a exibição dos itens no carrinho
    atualizarItensNoCarrinho();
}

// Função para atualizar a exibição dos itens no carrinho
function atualizarItensNoCarrinho() {
    const carrinhoItems = JSON.parse(localStorage.getItem("carrinho")) || [];
    const carrinhoContainer = document.getElementById("carrinho-items");

    carrinhoContainer.innerHTML = ""; // Limpa o conteúdo atual

    if (carrinhoItems.length > 0) {
        carrinhoItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "item-carrinho";
            itemDiv.innerHTML = `
                <img src="imagens/produto${item.id}.png" alt="Produto ${item.id}">
                <h3>Produto ${item.id}</h3>
                <p>Quantidade: ${item.quantidade}</p>
                <p class="preco">Preço: R$ 29,99</p>
                <button class="remover-do-carrinho" onclick="removerDoCarrinho('${item.id}')">Remover do Carrinho</button>
            `;
            carrinhoContainer.appendChild(itemDiv);
        });
    } else {
        carrinhoContainer.innerHTML = "<p>Nenhum item no carrinho.</p>";
    }
}

// Função para remover um item do carrinho
function removerDoCarrinho(produtoId) {
    const carrinhoItems = JSON.parse(localStorage.getItem("carrinho")) || [];
    const novoCarrinho = carrinhoItems.filter(item => item.id !== produtoId);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));

    // Atualiza a exibição dos itens no carrinho
    atualizarItensNoCarrinho();
}

// Chama a função de atualizar ao carregar a página
document.addEventListener("DOMContentLoaded", atualizarItensNoCarrinho);

