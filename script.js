// Dados iniciais:
let currentQuestion = 0; 

showQuestion();

// Funções:
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];
        
        document.querySelector('.scoreArea').style.display = 'none'; // esconde o scoreArea
        document.querySelector('.questionArea').style.display = 'block'; // exibe a pergunta

        document.querySelector('.question').innerHTML = q.question; // insere a pergunta
        document.querySelector('.options').innerHTML = ''; // limpar as alternativas

        let optionsHtml = ''; 
        for(let i in q.options) { // para alterar o DOM só uma vez e ter menos processamento e consumo de memória
            optionsHtml += `<div>${q.options[i]}</div>`; // string dentro de outra string
        }
        document.querySelector('.options').innerHTML = optionsHtml; // Processo + rápido pq insiro o conteúdo apenas uma vez; 1 manipulação no DOM

    } else {
        // Acabaram as questões
    }
}