
function adicionarAoCarrinho(produtoId) {
    
    const carrinhoItems = JSON.parse(localStorage.getItem("carrinho")) || [];

    
    const produtoExistente = carrinhoItems.find(item => item.id === produtoId);

    if (produtoExistente) {
       
        produtoExistente.quantidade += 1;
    } else {
       
        carrinhoItems.push({ id: produtoId, quantidade: 1 });
    }

    
    localStorage.setItem("carrinho", JSON.stringify(carrinhoItems));

    
    window.location.href = "carrinho.html";
}


function carregarItensDoCarrinho() {
    const carrinhoItems = JSON.parse(localStorage.getItem("carrinho")) || [];
    const carrinhoContainer = document.getElementById("carrinho-items");

    carrinhoContainer.innerHTML = "";

    carrinhoItems.forEach(item => {
        const produto = obterProdutoPorId(item.id);

        if (produto) {
            const itemHTML = `
                <div class="item-carrinho">
                    <img src="${produto.imagem}" alt="${produto.nome}" width="100px">
                    <h3>${produto.nome}</h3>
                    <p>Quantidade: ${item.quantidade}</p>
                    <p class="preco">R$ ${produto.preco * item.quantidade}</p>
                    <button class="remover-do-carrinho" onclick="removerDoCarrinho('${item.id}')">Remover do carrinho</button>
                </div>
            `;

            carrinhoContainer.innerHTML += itemHTML;
        }
    });
}


function obterProdutoPorId(produtoId) {
    
    const produtos = {
        produto1: { nome: "Laçinho com boneca", imagem: "imagens/produto1.png", preco: 49.99 },
        produto2: { nome: "Laço com parzinho", imagem: "imagens/produto2.png", preco: 74.99 },
        produto3: { nome: "Tiara vermelha", imagem: "imagens/produto3.png", preco: 29.99 },
        produto4: { nome: "Laço com parzinho vermelho e dourado", imagem: "imagens/produto4.png", preco: 54.99 },
        produto5: { nome: "Faixa RN", imagem: "imagens/produto5.png", preco: 14.99 },
    };

    return produtos[produtoId];
}


function removerDoCarrinho(produtoId) {
    const carrinhoItems = JSON.parse(localStorage.getItem("carrinho")) || [];

    
    const novoCarrinho = carrinhoItems.filter(item => item.id !== produtoId);

    
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));

    
    carregarItensDoCarrinho();
}


document.addEventListener("DOMContentLoaded", carregarItensDoCarrinho);
